#!/usr/bin/env python3
"""Gera um retrato dos deputados em exercício a partir dos Dados Abertos da Câmara.

Origem: https://dadosabertos.camara.leg.br/api/v2/deputados
Sem parâmetro de legislatura: o serviço retorna os parlamentares em exercício
na data da consulta. Suplentes licenciados ou deputados da próxima legislatura
não são adicionados ao inventário, salvo se a própria fonte os listar.
"""
import json
import os
import re
import time
import unicodedata
from datetime import datetime, timezone
from pathlib import Path

import requests

API = "https://dadosabertos.camara.leg.br/api/v2/deputados"
DESTINO = Path("_data/deputados_camara.json")
UFS = {"AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT",
       "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS",
       "RO", "RR", "SC", "SP", "SE", "TO"}


def normalizar_ordenacao(valor):
    texto = unicodedata.normalize("NFKD", valor)
    return "".join(c for c in texto if not unicodedata.combining(c)).casefold()


def requisitar_pagina(sessao, pagina):
    for tentativa in range(4):
        try:
            resposta = sessao.get(
                API,
                params={"itens": 100, "pagina": pagina, "ordem": "ASC", "ordenarPor": "nome"},
                headers={"Accept": "application/json"},
                timeout=45,
            )
            resposta.raise_for_status()
            dados = resposta.json()
            if not isinstance(dados.get("dados"), list):
                raise ValueError("API da Câmara não retornou uma lista de dados")
            return dados
        except (requests.RequestException, ValueError):
            if tentativa == 3:
                raise
            time.sleep(2 ** tentativa)


def gerar_inventario():
    sessao = requests.Session()
    sessao.headers.update({"User-Agent": "ArquivoParlamentar/1.0 (pesquisa pública)"})
    deputados = {}
    for pagina in range(1, 21):
        resposta = requisitar_pagina(sessao, pagina)
        registros = resposta["dados"]
        if not registros:
            break
        for item in registros:
            ident = item.get("id")
            nome = str(item.get("nome") or "").strip()
            uf = str(item.get("siglaUf") or "").strip()
            partido = str(item.get("siglaPartido") or "").strip()
            legislatura = item.get("idLegislatura")
            if not isinstance(ident, int) or not nome or not partido or uf not in UFS:
                raise ValueError(f"Registro parlamentar incompleto: {item}")
            if legislatura not in (None, 57):
                raise ValueError(f"Deputado fora da 57ª legislatura: {item}")
            if ident in deputados:
                antigo = deputados[ident]
                if antigo["nome"] != nome or antigo["partido"] != partido or antigo["uf"] != uf:
                    raise ValueError(f"Registro duplicado e divergente para id {ident}")
                continue
            deputados[ident] = {
                "id": ident, "nome": nome, "partido": partido, "uf": uf,
                "url": f"https://www.camara.leg.br/deputados/{ident}",
            }
        if len(registros) < 100:
            break
    else:
        raise ValueError("Paginação excedeu o limite de segurança")

    # Inventário é um retrato do plenário em exercício: não confundir
    # todas as pessoas que exerceram mandato desde 2023 com as cadeiras atuais.
    if len(deputados) != 513:
        raise ValueError(
            f"Esperados 513 deputados em exercício; fonte devolveu {len(deputados)}. "
            "Revisar retorno antes de publicar; nenhum dado foi sobrescrito."
        )
    ordenados = sorted(deputados.values(), key=lambda r: (normalizar_ordenacao(r["nome"]), r["id"]))
    total_por_uf = {}
    for pessoa in ordenados:
        total_por_uf[pessoa["uf"]] = total_por_uf.get(pessoa["uf"], 0) + 1
    if len(total_por_uf) != 27:
        raise ValueError(f"Ausência de UFs no inventário: {len(total_por_uf)}")

    momento = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    return {
        "atualizado_em_utc": momento,
        "fonte": API,
        "legislatura": 57,
        "total": len(ordenados),
        "observacao": "Retrato de deputados em exercício fornecido pela Câmara; partido e situação podem mudar após esta data.",
        "deputados": ordenados,
    }


def main():
    inventario = gerar_inventario()
    DESTINO.parent.mkdir(parents=True, exist_ok=True)
    DESTINO.write_text(json.dumps(inventario, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"{inventario['total']} deputados importados.")
    print(f"Data UTC: {inventario['atualizado_em_utc']}. Arquivo: {DESTINO}")


if __name__ == "__main__":
    main()
