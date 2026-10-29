#!/usr/bin/env python3
"""Extrai o conteúdo programático do edital (seção 15) para JSON e gera o checklist do PROGRESSO.md.

Uso:
  python3 scripts/edital_topicos.py            # gera topicos.json (não sobrescreve o PROGRESSO.md)
  python3 scripts/edital_topicos.py --progresso # também (re)gera o checklist no PROGRESSO.md

Saída: concursos/cgu-affc/edital/topicos.json
"""
import json
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
CONCURSO = RAIZ / "concursos" / "cgu-affc"
EDITAL = CONCURSO / "edital" / "edital-cgu-2026-12.md"
SAIDA = CONCURSO / "edital" / "topicos.json"
PROGRESSO = CONCURSO / "PROGRESSO.md"
CARGO = "CARGO 2"  # especialidade do Eduardo: TI – Ciência de Dados

# Nome no edital (prefixo) -> pasta em disciplinas/
SLUGS = {
    "ESTADO, DEMOCRACIA": "ciencia-politica-e-estado",
    "SOCIEDADE BRASILEIRA": "sociedade-brasileira",
    "ÉTICA PÚBLICA": "etica-publica",
    "ADMINISTRAÇÃO PÚBLICA": "administracao-publica-e-politicas",
    "FUNDAMENTOS DE GOVERNANÇA": "governanca-riscos-integridade",
    "FUNDAMENTOS DE TRANSPARÊNCIA": "transparencia-ouvidoria-participacao",
    "FUNDAMENTOS DE DIREITO PÚBLICO": "direito-publico-controle",
    "FUNDAMENTOS DE EVIDÊNCIAS": "evidencias-dados-ia",
    "FUNDAMENTOS DE AUDITORIA": "auditoria-governamental-cgu",
    "ESTATÍSTICA, PROGRAMAÇÃO": "estatistica-programacao-analise-dados",
    "ENGENHARIA, ARQUITETURA": "engenharia-arquitetura-governanca-dados",
    "APRENDIZADO DE MÁQUINA": "aprendizado-de-maquina-e-ia",
    "OPERAÇÃO, GOVERNANÇA E GESTÃO DE SOLUÇÕES": "operacao-mlops-dados-ia",
}
# Sigla de cada disciplina → prefixo do ID estável dos tópicos (ex.: ML.3.1).
# Não renomear: as questões e notas apontam para esses IDs.
SIGLA = {
    "ciencia-politica-e-estado": "CP",
    "sociedade-brasileira": "SB",
    "etica-publica": "ET",
    "administracao-publica-e-politicas": "AP",
    "governanca-riscos-integridade": "GR",
    "transparencia-ouvidoria-participacao": "TO",
    "direito-publico-controle": "DP",
    "evidencias-dados-ia": "EV",
    "auditoria-governamental-cgu": "AU",
    "estatistica-programacao-analise-dados": "EP",
    "engenharia-arquitetura-governanca-dados": "ED",
    "aprendizado-de-maquina-e-ia": "ML",
    "operacao-mlops-dados-ia": "OP",
}
GRUPOS = {
    "15.2.2": ("basicos", "P1", "Conhecimentos básicos"),
    "15.2.3": ("complementares", "P2", "Conhecimentos complementares"),
    "15.2.4": ("especificos", "P3", "Conhecimentos específicos"),
}
# "1 Título." ou "1.1 Texto" no início do texto ou após ". "
ITEM = re.compile(r"(?:^|(?<=\.\s))(\d+)(?:\.(\d+))?\s+(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ*_])")


def slug_de(nome):
    for prefixo, slug in SLUGS.items():
        if nome.upper().startswith(prefixo):
            return slug
    sys.exit(f"Disciplina sem slug: {nome}")


MINUSCULAS = {"e", "de", "da", "do", "das", "dos", "a", "o", "em", "para", "à"}
SIGLAS = {"CGU", "IA", "TI"}


def titulo(nome):
    palavras = []
    for i, p in enumerate(nome.split()):
        if p.strip(",") in SIGLAS:
            palavras.append(p)
        elif i and p.lower() in MINUSCULAS:
            palavras.append(p.lower())
        else:
            palavras.append(p.capitalize())
    return " ".join(palavras)


def limpar(texto):
    return re.sub(r"\*|_", "", texto).strip().rstrip(".").strip()


def parse_conteudo(texto, sigla):
    marcas = list(ITEM.finditer(texto))
    topicos = []
    for i, m in enumerate(marcas):
        fim = marcas[i + 1].start() if i + 1 < len(marcas) else len(texto)
        trecho = limpar(texto[m.end():fim])
        if m.group(2) is None:
            topicos.append({"id": f"{sigla}.{m.group(1)}", "num": m.group(1), "titulo": trecho, "subitens": []})
        elif topicos:
            num = f"{m.group(1)}.{m.group(2)}"
            topicos[-1]["subitens"].append({"id": f"{sigla}.{num}", "num": num, "texto": trecho})
    return topicos


def extrair():
    linhas = EDITAL.read_text(encoding="utf-8").splitlines()
    disciplinas, grupo, cargo_atual = [], None, None
    for linha in linhas:
        cab = re.match(r"#### (15\.2\.\d)", linha)
        if cab:
            grupo = GRUPOS.get(cab.group(1))
            continue
        if linha.startswith("## ANEXO"):
            break
        if not grupo:
            continue
        if re.match(r"\*\*CARGO \d", linha):
            cargo_atual = linha
            continue
        m = re.match(r"\*\*(.+?):?\*\*:?\s*(.+)", linha)
        if not m:
            continue
        if grupo[0] == "especificos" and (not cargo_atual or CARGO not in cargo_atual):
            continue
        nome = m.group(1).strip().rstrip(":")
        slug = slug_de(nome)
        disciplinas.append({
            "grupo": grupo[0], "prova": grupo[1], "grupo_nome": grupo[2],
            "disciplina": titulo(nome), "slug": slug, "sigla": SIGLA[slug],
            "topicos": parse_conteudo(m.group(2), SIGLA[slug]),
        })
    return disciplinas


BLOCO_INI = "<!-- checklist:inicio -->"
BLOCO_FIM = "<!-- checklist:fim -->"


def checklist(disciplinas):
    out = [BLOCO_INI, ""]
    grupo = None
    for d in disciplinas:
        if d["grupo"] != grupo:
            grupo = d["grupo"]
            out += [f"## {d['prova']} — {d['grupo_nome']}", ""]
        # só linka a pasta se ela já tem notas (link para pasta inexistente/vazia = página vazia no site)
        tem_notas = any((RAIZ / "disciplinas" / d["slug"]).glob("*.md"))
        pasta = (f"Pasta: [`disciplinas/{d['slug']}/`](../../disciplinas/{d['slug']}/)" if tem_notas
                 else f"Pasta: `disciplinas/{d['slug']}/` (ainda sem notas)")
        out += [f"### {d['disciplina']}",
                f"{pasta} · "
                f"Acervo: [`acervo/{d['slug']}.md`](acervo/{d['slug']}.md)", ""]
        for t in d["topicos"]:
            out.append(f"- ⬜ **{t['num']}** {t['titulo']}")
            for s in t["subitens"]:
                out.append(f"  - ⬜ {s['num']} {s['texto']}")
        out.append("")
    out.append(BLOCO_FIM)
    return "\n".join(out)


def main():
    disciplinas = extrair()
    SAIDA.write_text(json.dumps({"concurso": "cgu-affc", "cargo": "Cargo 2 – TI – Ciência de Dados",
                                 "prova": "2026-12-13", "disciplinas": disciplinas},
                                ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    n = sum(len(d["topicos"]) for d in disciplinas)
    print(f"{SAIDA.relative_to(RAIZ)}: {len(disciplinas)} disciplinas, {n} tópicos")
    if "--progresso" in sys.argv:
        texto = PROGRESSO.read_text(encoding="utf-8")
        bloco = checklist(disciplinas)
        if BLOCO_INI in texto:
            texto = re.sub(re.escape(BLOCO_INI) + ".*" + re.escape(BLOCO_FIM), lambda _: bloco, texto, flags=re.S)
        else:
            texto = texto.rstrip() + "\n\n" + bloco + "\n"
        PROGRESSO.write_text(texto, encoding="utf-8")
        print(f"{PROGRESSO.relative_to(RAIZ)}: checklist atualizado")


if __name__ == "__main__":
    main()
