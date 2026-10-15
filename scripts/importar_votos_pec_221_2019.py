#!/usr/bin/env python3
"""Importa os mapas nominais da PEC 221/2019 publicados pela Câmara.

Fonte primária: Câmara dos Deputados, sessão 106 de 27/05/2026.
1º turno: votação da Emenda Aglutinativa nº 1 (id 13752).
2º turno: votação da PEC 221/2019 (id 13754).

O script recusa publicar dados se não puder conferir as contagens oficiais.
Nunca atribui votos por partido, presença ou declaração.
"""
import json
import re
from datetime import datetime, timezone
from pathlib import Path

import requests
from bs4 import BeautifulSoup

BASE = "https://www.camara.leg.br/internet/votacao/mostraVotacao.asp"
PARAMS = {
    "codCasa": 1,
    "indTipoSessao": "E",
    "indTipoSessaoLegislativa": "O",
    "numLegislatura": 57,
    "numSessao": 106,
    "numSessaoLegislativa": 4,
    "tipo": "partido",
}
ROUNDS = [
    {"id": "primeiro", "nome": "1º turno — emenda aglutinativa nº 1",
     "ideVotacao": 13752, "esperado": {"Sim": 472, "Não": 22, "Obstrução": 1}},
    {"id": "segundo", "nome": "2º turno — texto da PEC 221/2019",
     "ideVotacao": 13754, "esperado": {"Sim": 461, "Não": 19}},
]
VOTOS = {"Sim", "Não", "Abstenção", "Obstrução"}
SIGLAS = {"Avante", "Cidadania", "MDB", "Missão", "Novo", "PCdoB", "PDT", "PL",
          "Podemos", "PP", "PRD", "PSB", "PSD", "PSDB", "PSOL", "PT", "PV",
          "Rede", "Republican", "Republicanos", "Solidaried", "Solidariedade",
          "União", "União Brasil"}

def limpar(valor):
    return re.sub(r"\s+", " ", valor.replace("\xa0", " ")).strip()

def extrair_mapa(html):
    soup = BeautifulSoup(html, "html.parser")
    registros = []
    partido = ""
    for tr in soup.find_all("tr"):
        celulas = tr.find_all("td", recursive=False)
        if not celulas:
            continue
        valores = [limpar(td.get_text(" ", strip=True)) for td in celulas]
        if len(valores) == 1 and valores[0] in SIGLAS:
            partido = valores[0]
        if len(valores) < 3:
            continue
        nome, uf, voto = valores[0], valores[-2], valores[-1]
        if not re.fullmatch(r"[A-Z]{2}", uf) or voto not in VOTOS or not nome:
            continue
        registros.append({"nome": nome, "uf": uf, "partido": partido, "voto": voto})
    # Evita tabela duplicada / identificadores ambíguos.
    chaves = [(v["nome"], v["uf"]) for v in registros]
    if len(chaves) != len(set(chaves)):
        raise ValueError("O mapa contém registros duplicados: revise o parser antes de publicar.")
    return sorted(registros, key=lambda r: (r["nome"].casefold(), r["uf"]))

def extrair_partidos_do_mapa_por_uf(html):
    """No mapa por UF, a segunda coluna identifica o partido de cada deputado."""
    soup = BeautifulSoup(html, "html.parser")
    partidos = {}
    for tr in soup.find_all("tr"):
        colunas = tr.find_all("td", recursive=False)
        if len(colunas) < 4:
            continue
        valores = [limpar(td.get_text(" ", strip=True)) for td in colunas]
        nome, sigla, voto = valores[0], valores[1], valores[-1]
        if nome and sigla and voto in VOTOS:
            sigla = {"Republican": "Republicanos", "Solidaried": "Solidariedade"}.get(sigla, sigla)
            if nome in partidos and partidos[nome] != sigla:
                raise ValueError(f"Partido conflitante para {nome}.")
            partidos[nome] = sigla
    return partidos

def main():
    cliente = requests.Session()
    cliente.headers.update({"User-Agent": "ArquivoParlamentar/1.0 (pesquisa pública; fonte Câmara dos Deputados)"})
    turnos = []
    for turno in ROUNDS:
        params = {**PARAMS, "ideVotacao": turno["ideVotacao"]}
        resposta = cliente.get(BASE, params=params, timeout=40)
        resposta.raise_for_status()
        resposta.encoding = resposta.apparent_encoding or resposta.encoding
        votos = extrair_mapa(resposta.text)
        resposta_uf = cliente.get(BASE, params={**params, "tipo": "uf"}, timeout=40)
        resposta_uf.raise_for_status()
        resposta_uf.encoding = resposta_uf.apparent_encoding or resposta_uf.encoding
        partidos = extrair_partidos_do_mapa_por_uf(resposta_uf.text)
        faltantes = [v["nome"] for v in votos if v["nome"] not in partidos]
        if faltantes:
            raise ValueError(f"Partido não identificado no mapa oficial para: {faltantes[:12]}")
        for voto in votos:
            voto["partido"] = partidos[voto["nome"]]
        contagem = {chave: sum(v["voto"] == chave for v in votos) for chave in VOTOS}
        for escolha, esperado in turno["esperado"].items():
            if contagem[escolha] != esperado:
                raise ValueError(
                    f'{turno["nome"]}: {escolha} esperado={esperado}, encontrado={contagem[escolha]};'
                    " nenhum arquivo foi alterado."
                )
        if len(votos) != sum(turno["esperado"].values()):
            raise ValueError(f'{turno["nome"]}: total incompatível: {len(votos)}')
        turnos.append({
            "id": turno["id"],
            "titulo": turno["nome"],
            "data": "2026-05-27",
            "url_fonte": resposta.url,
            "contagem": contagem,
            "votos": votos,
        })
        print(f'{turno["nome"]}: {len(votos)} registros nominais conferidos.')
    saida = Path("_data/votos_pec_221_2019.json")
    saida.parent.mkdir(parents=True, exist_ok=True)
    saida.write_text(json.dumps({
        "origem": "Mapas nominais oficiais da Câmara dos Deputados",
        "gerado_em_utc": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "turnos": turnos,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f'Arquivo gerado: {saida}')

if __name__ == "__main__":
    main()
