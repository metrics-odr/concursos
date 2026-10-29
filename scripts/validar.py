#!/usr/bin/env python3
"""Valida o banco de questões, as notas e os links internos. Sai com 1 se houver erro.

Verifica:
  - questoes/: frontmatter obrigatório, valores permitidos, ID único, nome do arquivo = id,
    tópicos existentes no edital, texto-base e PDF de origem existentes
  - disciplinas/: tópicos do frontmatter existem no edital
  - [[wikilinks]] em questoes/, disciplinas/, bancas/ e _indices/ apontam para arquivos que existem

Uso: python3 scripts/validar.py
"""
import re
import sys
from collections import defaultdict

from comum import (QUESTOES, RAIZ, TIPOS_ITEM, WIKILINK, arquivos_repo, como_lista, ler_md,
                   resolver_wikilink, topicos_edital)

OBRIGATORIOS = ["id", "tipo", "banca", "ano", "orgao", "cargo", "especialidade", "cargo_alvo",
                "topicos", "gabarito", "status", "fonte_pdf"]
STATUS = {"valida", "anulada", "alterada"}
CARGO_ALVO = {"sim", "analogo"}
PASTAS_LINKS = ["questoes", "disciplinas", "bancas", "_indices"]
CODIGO = re.compile(r"```.*?```|`[^`\n]*`", re.S)

erros = []


def erro(caminho, msg):
    erros.append(f"{caminho}: {msg}")


def validar_questao(rel, fm, topicos, ids_tb):
    for campo in OBRIGATORIOS:
        if campo not in fm:
            erro(rel, f"falta o campo `{campo}` no frontmatter (modelo em questoes/README.md)")
    if fm.get("cargo_alvo") not in CARGO_ALVO:
        erro(rel, f"cargo_alvo deve ser sim ou analogo (está {fm.get('cargo_alvo')!r})")
    if fm.get("status") not in STATUS:
        erro(rel, f"status deve ser valida, anulada ou alterada (está {fm.get('status')!r})")
    gab, tipo, status = fm.get("gabarito"), fm.get("tipo"), fm.get("status")
    if status == "anulada" and gab is not None:
        erro(rel, "questão anulada deve ter gabarito: null")
    elif status != "anulada":
        if tipo == "certo-errado" and gab not in ("C", "E"):
            erro(rel, f"gabarito de certo-errado deve ser C ou E (está {gab!r})")
        if tipo == "multipla-escolha" and gab not in list("ABCDE"):
            erro(rel, f"gabarito de múltipla escolha deve ser A–E (está {gab!r})")
    if not isinstance(fm.get("topicos", []), list):
        erro(rel, "topicos deve ser uma lista, ex.: [ML.3.1] (use [] se o assunto não está no edital)")
    for tid in como_lista(fm.get("topicos")):
        if tid not in topicos:
            erro(rel, f"tópico {tid!r} não existe em concursos/cgu-affc/edital/topicos.json")
    tb = fm.get("texto_base")
    if tb and tb not in ids_tb:
        erro(rel, f"texto_base {tb!r} não encontrado (crie o arquivo do texto-base com esse id)")
    pdf = fm.get("fonte_pdf")
    if pdf and not (RAIZ / pdf).exists():
        erro(rel, f"fonte_pdf {pdf!r} não existe")


def main():
    topicos = topicos_edital()
    arquivos = arquivos_repo()
    ids = defaultdict(list)
    itens, ids_tb = [], set()

    for p in sorted(QUESTOES.rglob("*.md")):
        rel = str(p.relative_to(RAIZ))
        if p.name == "README.md":
            continue
        try:
            fm, _ = ler_md(p)
        except ValueError as e:
            erro(rel, str(e))
            continue
        if not fm:
            erro(rel, "sem frontmatter (todo .md em questoes/ precisa de --- id/tipo ... ---)")
            continue
        tipo = fm.get("tipo")
        if "id" in fm:
            ids[fm["id"]].append(rel)
        if tipo == "texto-base":
            ids_tb.add(fm.get("id"))
        elif tipo in TIPOS_ITEM:
            itens.append((rel, fm))
            if fm.get("id") and p.stem != str(fm["id"]).lower():
                erro(rel, f"nome do arquivo deve ser o id em minúsculas: {str(fm['id']).lower()}.md")
        elif tipo != "prova":
            erro(rel, f"tipo {tipo!r} inválido (use certo-errado, multipla-escolha, discursiva, texto-base ou prova)")

    for rel, fm in itens:
        validar_questao(rel, fm, topicos, ids_tb)
    for i, caminhos in ids.items():
        if len(caminhos) > 1:
            erro(caminhos[0], f"id {i!r} duplicado também em: {', '.join(caminhos[1:])}")

    for p in sorted((RAIZ / "disciplinas").rglob("*.md")):
        rel = str(p.relative_to(RAIZ))
        try:
            fm, _ = ler_md(p)
        except ValueError as e:
            erro(rel, str(e))
            continue
        for tid in como_lista((fm or {}).get("topicos")):
            if tid not in topicos:
                erro(rel, f"tópico {tid!r} não existe em concursos/cgu-affc/edital/topicos.json")

    for pasta in PASTAS_LINKS:
        for p in sorted((RAIZ / pasta).rglob("*.md")) if (RAIZ / pasta).exists() else []:
            texto = CODIGO.sub("", p.read_text(encoding="utf-8"))  # exemplos em código não são links
            for m in WIKILINK.finditer(texto):
                if not resolver_wikilink(m.group(1), arquivos):
                    erro(str(p.relative_to(RAIZ)), f"link interno quebrado [[{m.group(1)}]]")

    if erros:
        print(f"❌ {len(erros)} problema(s):")
        for e in erros:
            print("  - " + e)
        sys.exit(1)
    print(f"✅ Validação ok: {len(itens)} questões, {len(ids_tb)} textos-base, {len(topicos)} tópicos do edital.")


if __name__ == "__main__":
    main()
