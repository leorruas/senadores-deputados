#!/usr/bin/env python3
"""Conferência eleitoral dos 81 senadores registrados em 14/10/2026.

Fonte das cadeiras, titularidade e suplências:
https://www12.senado.leg.br/manualdecomunicacao/como-citar-os-senadores

Fonte de senadores reeleitos em 04/10/2026:
https://www12.senado.leg.br/noticias/materias/2026/10/05/em-2027-senado-tera-40-senadores-novos-e-14-reeleitos

Fontes para as cadeiras de 2023–2031:
https://www12.senado.leg.br/noticias/noticias/materias/2022/10/02/veja-quem-sao-os-27-senadores-eleitos-neste-domingo

Fonte dos 54 eleitos para 2027–2035:
https://www12.senado.leg.br/noticias/materias/2026/10/04/conheca-os-54-senadores-eleitos-neste-domingo

Resultados de outros cargos:
https://www12.senado.leg.br/noticias/materias/2026/10/04/eleicao-para-governador-sera-decidida-em-segundo-turno-em-seis-estados-e-no-df
https://www12.senado.leg.br/noticias/materias/2026/10/04/eleicao-para-governador-e-definida-em-primeiro-turno-em-20-estados
https://www12.senado.leg.br/noticias/materias/2026/10/04/flavio-bolsonaro-e-lula-disputam-o-segundo-turno-das-eleicoes-para-presidente

Não classificar quem não se candidatou como derrotado em uma eleição;
aqui "sem novo mandato" significa apenas não eleito para uma das
duas vagas do Senado em 2026.
"""
from pathlib import Path
import re

DATA = "2026-10-14"
CONTROLE = Path("parlamentares/senadores/ACOMPANHAMENTO.md")
README = Path("README.md")
INDEX = Path("index.html")
PLANO = Path("PLANO-DE-FASES.md")

REELEITOS = set("""Alessandro Vieira
Carlos Portinho
Cid Gomes
Eduardo Braga
Eduardo Gomes
Humberto Costa
Jaques Wagner
Lucas Barreto
Marcelo Castro
Marcio Bittar
Plínio Valério
Rogério Carvalho
Styvenson Valentim
Veneziano Vital do Rêgo""".splitlines())

CADEIRAS_2031 = set("""Alan Rick
Renan Filho
Davi Alcolumbre
Omar Aziz
Otto Alencar
Camilo Santana
Damares Alves
Magno Malta
Wilder Morais
Ana Paula Lobato
Cleitinho
Tereza Cristina
Wellington Fagundes
Beto Faro
Efraim Filho
Teresa Leitão
Jussara Lima
Sergio Moro
Romário
Rogério Marinho
Jaime Bagattoli
Dr. Hiran
Hamilton Mourão
Jorge Seif
Laércio Oliveira
Astronauta Marcos Pontes
Professora Dorinha Seabra""".splitlines())

PRIMEIROS_SUPLENTES = set("""Ana Paula Lobato
Carlos Portinho
Dra. Eudócia
Fernando Dueire
Giordano
Ivete da Silveira
Jussara Lima
Leany Lemos
Renzo Braz
Roberta Acioly
Sargento Reginauro""".splitlines())

ELEITOS_GOVERNADORES = {
    "Cleitinho": "Minas Gerais",
    "Sergio Moro": "Paraná",
    "Marcos Rogério": "Rondônia",
}
SEGUNDO_TURNO_GOV = {
    "Alan Rick": "Acre",
    "Omar Aziz": "Amazonas",
    "Professora Dorinha Seabra": "Tocantins",
}
CANDIDATOS_GOVERNADOR = {
    "Efraim Filho": "Paraíba",
    "Renan Filho": "Alagoas",
    "Wellington Fagundes": "Mato Grosso",
    "Wilder Morais": "Goiás",
}

URL_CADEIRAS = "https://www12.senado.leg.br/manualdecomunicacao/como-citar-os-senadores"
URL_REELEITOS = "https://www12.senado.leg.br/noticias/materias/2026/10/05/em-2027-senado-tera-40-senadores-novos-e-14-reeleitos"
URL_ELEITOS = "https://www12.senado.leg.br/noticias/materias/2026/10/04/conheca-os-54-senadores-eleitos-neste-domingo"
URL_GOV = "https://www12.senado.leg.br/noticias/materias/2026/10/04/eleicao-para-governador-e-definida-em-primeiro-turno-em-20-estados"
URL_GOV_TURNO = "https://www12.senado.leg.br/noticias/materias/2026/10/04/eleicao-para-governador-sera-decidida-em-segundo-turno-em-seis-estados-e-no-df"
URL_PRES = "https://www12.senado.leg.br/noticias/materias/2026/10/04/flavio-bolsonaro-e-lula-disputam-o-segundo-turno-das-eleicoes-para-presidente"

MARCADOR_INICIO = "<!-- inicio:verificacao-eleitoral-2026 -->"
MARCADOR_FIM = "<!-- fim:verificacao-eleitoral-2026 -->"


def dados(nome):
    if nome in REELEITOS:
        cat = "Reeleito em 2026"
        situacao = "Reeleito para o Senado em 2026 (mandato 2027–2035)"
        periodo = "2019 a 2027; reeleito para 2027 a 2035"
    elif nome in CADEIRAS_2031:
        cat = "Mandato até 2031"
        situacao = "Cadeira senatorial 2023–2031; não disputada ao Senado em 2026"
        periodo = "2023 a 2031"
    else:
        cat = "Sem novo mandato no Senado em 2026"
        situacao = "Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026"
        periodo = "2019 a 2027"

    suplente = nome in PRIMEIROS_SUPLENTES
    if suplente:
        if nome in REELEITOS:
            periodo = "Cadeira 2019 a 2027 (1º suplente); eleito para 2027 a 2035"
        else:
            periodo = f"Cadeira {periodo} (1º suplente)"
    if nome in ELEITOS_GOVERNADORES:
        estado = ELEITOS_GOVERNADORES[nome]
        situacao = f"Eleito governador de {estado} em 2026; cadeira senatorial até {'2031' if nome in CADEIRAS_2031 else '2027'}"
    elif nome in SEGUNDO_TURNO_GOV:
        situacao = f"Disputa 2º turno para governador do {SEGUNDO_TURNO_GOV[nome]} em 25/10/2026; cadeira senatorial até 2031"
    elif nome in CANDIDATOS_GOVERNADOR:
        situacao = f"Concorreu ao governo de {CANDIDATOS_GOVERNADOR[nome]} em 2026; cadeira senatorial até 2031"
    elif nome == "Flávio Bolsonaro":
        situacao = "Disputa o 2º turno presidencial em 25/10/2026; cadeira senatorial até 2027"
    return {
        "nome": nome, "categoria_eleitoral": cat, "situacao": situacao,
        "mandato": periodo, "suplente": suplente,
        "role": "1º suplente" if suplente else "titular",
    }


def valor_yaml(texto):
    if '"' in texto or "\n" in texto:
        raise ValueError("Texto YAML inesperado")
    return f'"{texto}"'


def ajustar_frontmatter(texto, registro):
    partes = re.match(r"\A---\n([\s\S]*?)\n---\n", texto)
    if not partes:
        raise ValueError(f"Falta front matter: {registro['nome']}")
    front = partes.group(1)
    for chave in ("mandato", "situacao", "categoria_eleitoral"):
        padrao = re.compile(r"(?m)^" + re.escape(chave) + r":.*$")
        if len(padrao.findall(front)) != 1:
            raise ValueError(f"Metadado {chave} não é único: {registro['nome']}")
        front = padrao.sub(lambda _: f"{chave}: {valor_yaml(registro[chave])}", front, count=1)
    data = re.compile(r"(?m)^atualizado:.*$")
    if len(data.findall(front)) != 1:
        raise ValueError(f"Metadado atualizado ausente: {registro['nome']}")
    front = data.sub(f"atualizado: {DATA}", front, count=1)
    resto = texto[partes.end():]
    resto = re.sub(
        r"\n?" + re.escape(MARCADOR_INICIO) + r"[\s\S]*?" +
        re.escape(MARCADOR_FIM) + r"\n?", "\n", resto,
        count=1,
    )
    fontes = [
        f"[Senado: cadeira e suplência]({URL_CADEIRAS})",
        f"[Senado: 54 eleitos em 2026]({URL_ELEITOS})",
    ]
    if registro["nome"] in REELEITOS:
        fontes.append(f"[Senado: 14 reeleitos]({URL_REELEITOS})")
    if registro["nome"] in ELEITOS_GOVERNADORES:
        fontes.append(f"[Senado: governadores eleitos]({URL_GOV})")
    if registro["nome"] in SEGUNDO_TURNO_GOV:
        fontes.append(f"[Senado: 2º turno nos estados]({URL_GOV_TURNO})")
    if registro["nome"] in CANDIDATOS_GOVERNADOR:
        fontes.append("[Senado: candidatura aos governos estaduais](https://www12.senado.leg.br/noticias/materias/2026/08/18/dois-senadores-concorrem-a-presidencia-dez-tentam-governos-estaduais)")
    if registro["nome"] == "Flávio Bolsonaro":
        fontes.append(f"[Senado: 2º turno presidencial]({URL_PRES})")

    texto_conferencia = (
        f"\n\n{MARCADOR_INICIO}\n"
        "## Situação eleitoral — conferência de 14/10/2026\n\n"
        f"**Situação:** {registro['situacao']}.\n\n"
        f"**Período da cadeira:** {registro['mandato']}. "
        f"**Condição no registro do Senado:** {registro['role']}.\n\n"
        f"**Fontes oficiais:** {' · '.join(fontes)}.\n\n"
        "**Critério:** 'sem novo mandato' não significa necessariamente "
        "que tenha concorrido à reeleição; para suplentes, o período indicado "
        "é o da cadeira, não um mandato individual obtido por eleição direta.\n"
        f"{MARCADOR_FIM}\n"
    )
    # Substitui apenas afirmações desatualizadas sobre pendências eleitorais.
    # Outras pendências legislativas e de votação permanecem registradas.
    substituir_frases = {
        "A situação eleitoral de 2026 será apurada separadamente; esta ficha ainda não a classifica.":
            "A situação eleitoral de 2026 está verificada na seção acima.",
        "Sua situação eleitoral em 2026 permanece pendente de conferência nesta ficha.":
            "A situação eleitoral de 2026 está verificada na seção acima.",
        "Dados do mandato e resultado eleitoral requerem revisão complementar.":
            "O período da cadeira e a situação eleitoral constam da seção acima; a pesquisa legislativa segue em complementação.",
    }
    for antigo, novo in substituir_frases.items():
        resto = resto.replace(antigo, novo)
    cabecalho = re.search(r"(?m)^# [^\n]+", resto)
    if not cabecalho:
        raise ValueError(f"Falta título Markdown de perfil: {registro['nome']}")
    resto = resto[:cabecalho.end()] + texto_conferencia + resto[cabecalho.end():]
    return "---\n" + front + "\n---\n" + resto


def main():
    controle = CONTROLE.read_text(encoding="utf-8")
    padrao = re.compile(
        r"- \[x\] \[([^\]]+)\]\(https://github\.com/leorruas/senadores-deputados/"
        r"blob/main/(parlamentares/senadores/[^)]+\.md)\)"
    )
    perfis = dict(padrao.findall(controle))
    if len(perfis) != 81:
        raise ValueError(f"São necessários 81 perfis; encontrados {len(perfis)}")
    if len(REELEITOS) != 14 or len(CADEIRAS_2031) != 27:
        raise ValueError("Listas oficiais não têm as contagens esperadas")
    if REELEITOS & CADEIRAS_2031:
        raise ValueError("Cadeira 2031 classificada como reeleita em 2026")
    if not (REELEITOS | CADEIRAS_2031 | PRIMEIROS_SUPLENTES |
            set(ELEITOS_GOVERNADORES) | set(SEGUNDO_TURNO_GOV) |
            set(CANDIDATOS_GOVERNADOR)) <= set(perfis):
        raise ValueError("Nome não consta no inventário do projeto")

    # Prepara e valida tudo ANTES de modificar os arquivos.
    alteracoes = {}
    por_caminho = {}
    for nome, caminho in perfis.items():
        registro = dados(nome)
        por_caminho[caminho] = registro
        alteracoes[Path(caminho)] = ajustar_frontmatter(
            Path(caminho).read_text(encoding="utf-8"), registro
        )

    index = INDEX.read_text(encoding="utf-8")
    index = index.replace(
        '<option value="Não reeleito em 2026">Não reeleitos em 2026</option>',
        '<option value="Sem novo mandato no Senado em 2026">Sem novo mandato no Senado após 2027</option>'
    )
    if 'value="Sem novo mandato no Senado em 2026"' not in index:
        raise ValueError("Filtro eleitoral do índice não pôde ser atualizado")
    alteracoes[INDEX] = index

    readme = README.read_text(encoding="utf-8")
    linhas = readme.splitlines(keepends=True)
    total_linhas = 0
    for i, linha in enumerate(linhas):
        marca = re.match(
            r"^(\| \[[^\]]+\]\((parlamentares/senadores/[^)]+\.md)\)"
            r" \| [^|]+ \| )([^|]+)( \| )([^|]+)( \|)$",
            linha.rstrip("\r\n")
        )
        if not marca:
            continue
        registro = por_caminho.get(marca.group(2))
        if not registro:
            raise ValueError(f"Caminho desconhecido na tabela README: {marca.group(2)}")
        total_linhas += 1
        linhas[i] = (marca.group(1) + registro["mandato"] + marca.group(4) +
                     registro["situacao"] + marca.group(6) + "\n")
    if total_linhas != 81:
        raise ValueError(f"README contém {total_linhas} linhas de perfis; esperadas 81")
    readme = "".join(linhas)
    cabecalho = "## Controle das 81 fichas do Senado"
    if cabecalho not in readme:
        raise ValueError("Cabeçalho de controle não encontrado no README")
    status_readme = (
        "## Situação eleitoral dos senadores — 14/10/2026\n\n"
        "**81/81 fichas verificadas quanto ao período da cadeira e ao resultado "
        "para o Senado em 2026:** 14 reeleitos, 27 cadeiras com mandato "
        "2023–2031 (não disputadas em 2026) e 40 cadeiras 2019–2027 "
        "sem novo mandato eleito para a pessoa que as ocupa no inventário. "
        "Esta última categoria **não implica que todos tenham concorrido**. "
        "A condição de titular ou suplente está nas fichas individuais. "
        "Há notas específicas para candidaturas a governador e à Presidência. "
        "Fontes: [cadastro do Senado](" + URL_CADEIRAS + "), "
        "[reeleitos em 2026](" + URL_REELEITOS + ") e "
        "[eleitos por estado](" + URL_ELEITOS + ").\n\n"
    )
    if "## Situação eleitoral dos senadores — 14/10/2026" not in readme:
        readme = readme.replace(cabecalho, status_readme + cabecalho)
    alteracoes[README] = readme

    controle = controle.replace("permalink: /senado/", "permalink: /senado/acompanhamento/")
    nota = (
        "## Conferência da situação eleitoral — 14/10/2026\n\n"
        "**81 de 81 perfis conferidos quanto à eleição de 2026**: "
        "**14 reeleitos**, **27 cadeiras 2023–2031 não disputadas em 2026**, "
        "**40 cadeiras 2019–2027 sem novo mandato eleito para seus ocupantes**. "
        "Essa divisão descreve o destino das cadeiras; não significa que "
        "todos os ocupantes das 40 cadeiras tenham concorrido. "
        "As fichas distinguem titulares e suplentes, incluindo candidaturas a outros cargos.\n\n"
        f"**Fontes:** [cadastro de mandatos e suplentes]({URL_CADEIRAS}) · "
        f"[54 senadores eleitos]({URL_ELEITOS}) · "
        f"[14 reeleitos]({URL_REELEITOS}).\n\n"
    )
    if "## Conferência da situação eleitoral — 14/10/2026" not in controle:
        controle = controle.replace("## Fichas por estado", nota + "## Fichas por estado")
    if "permalink: /senado/acompanhamento/" not in controle:
        raise ValueError("Não foi possível corrigir o permalink do acompanhamento")
    alteracoes[CONTROLE] = controle

    plano = PLANO.read_text(encoding="utf-8")
    secao = (
        "## Situação eleitoral de 2026 — conferida\n\n"
        "Conferência do inventário de 81 fichas em 14/10/2026: "
        "**14 reeleições, 27 cadeiras com mandato até 2031 e "
        "40 cadeiras que terminam em 2027 sem novo mandato no Senado "
        "eleito para a pessoa listada**. Foram corrigidos os períodos "
        "de exercício e identificados suplentes, usando o cadastro "
        "do Senado; em especial, **Romário ocupa cadeira 2023–2031**. "
        "A pesquisa legislativa de várias fichas continua pendente. "
        "Fontes: [quadro oficial de mandatos](" + URL_CADEIRAS +
        "), [reeleitos](" + URL_REELEITOS + "), [eleitos](" + URL_ELEITOS + ").\n\n"
    )
    if "## Situação eleitoral de 2026 — conferida" not in plano:
        plano = plano.replace("## Fase 2: assuntos", secao + "## Fase 2: assuntos")
    alteracoes[PLANO] = plano

    for caminho, conteudo in alteracoes.items():
        caminho.write_text(conteudo, encoding="utf-8")
    print(f"CONFERIDOS: {len(perfis)} senadores; "
          f"reeleitos={len(REELEITOS)}, 2031={len(CADEIRAS_2031)}, "
          f"sem_novo_mandato={len(perfis)-len(REELEITOS)-len(CADEIRAS_2031)}")
    print(f"Arquivos atualizados: {len(alteracoes)}")


if __name__ == "__main__":
    main()
