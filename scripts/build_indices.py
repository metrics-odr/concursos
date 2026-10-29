#!/usr/bin/env python3
"""Gera os índices em _indices/ a partir do banco de questões, das notas e do acervo.

Saídas (versionadas; nunca editar à mão):
  _indices/questoes.json   → todas as questões, com frontmatter e caminho
  _indices/provas.json     → provas do banco (metadados de cada prova.md)
  _indices/por_topico.json → ID do tópico do edital → questões, notas, acervo e flashcards
  _indices/cobertura.md    → mapa de lacunas: tópicos sem questão / sem nota

Uso:
  python3 scripts/build_indices.py          # (re)gera os índices
  python3 scripts/build_indices.py --check  # só verifica se estão atualizados (sai com 1 se não)
"""
import csv
import json
import sys
from collections import Counter, defaultdict

from comum import INDICES, QUESTOES, RAIZ, TIPOS_ITEM, como_lista, ler_md, topicos_edital


def rel(p):
    return str(p.relative_to(RAIZ)).replace("\\", "/")


def coletar_questoes():
    questoes, provas = [], []
    for p in sorted(QUESTOES.rglob("*.md")):
        if p.name == "README.md":
            continue
        try:
            fm, _ = ler_md(p)
        except ValueError:
            continue  # validar.py aponta o erro
        if not fm:
            continue
        if fm.get("tipo") in TIPOS_ITEM:
            questoes.append({**fm, "caminho": rel(p)})
        elif fm.get("tipo") == "prova":
            provas.append({**fm, "caminho": rel(p)})
    questoes.sort(key=lambda q: str(q.get("id")))
    return questoes, provas


def coletar_notas():
    """Notas em disciplinas/ com `topicos:` no frontmatter."""
    notas = []
    for p in sorted((RAIZ / "disciplinas").rglob("*.md")):
        try:
            fm, _ = ler_md(p)
        except ValueError:
            continue
        if fm and fm.get("topicos"):
            notas.append({"caminho": rel(p), "titulo": fm.get("titulo", p.stem), "topicos": como_lista(fm["topicos"])})
    return notas


def gerar():
    topicos = topicos_edital()
    questoes, provas = coletar_questoes()
    notas = coletar_notas()

    por_topico = {tid: {"texto": t["texto"], "disciplina": t["disciplina"], "prova": t["prova"],
                        "questoes": [], "notas": [], "acervo": [], "flashcards": []}
                  for tid, t in topicos.items()}

    def anexar(tid, campo, valor):
        # Um subitem (ML.3.1) também conta para o tópico pai (ML.3).
        if tid not in por_topico:
            return
        if valor not in por_topico[tid][campo]:
            por_topico[tid][campo].append(valor)
        pai = topicos[tid].get("pai")
        if pai and valor not in por_topico[pai][campo]:
            por_topico[pai][campo].append(valor)

    for q in questoes:
        for tid in como_lista(q.get("topicos")):
            anexar(tid, "questoes", q["id"])
    for n in notas:
        for tid in n["topicos"]:
            anexar(tid, "notas", n["caminho"])

    # Acervo e flashcards são organizados por disciplina → valem para todos os tópicos dela.
    acervo = RAIZ / "concursos" / "cgu-affc" / "acervo"
    banco_fc = RAIZ / "flashcards" / "banco"
    for tid, t in topicos.items():
        arq = acervo / f"{t['slug']}.md"
        if arq.exists():
            por_topico[tid]["acervo"].append(rel(arq))
        csv_fc = banco_fc / f"{t['slug']}.csv"
        if csv_fc.exists():
            with csv_fc.open(encoding="utf-8") as f:
                n = sum(1 for _ in csv.DictReader(f))
            por_topico[tid]["flashcards"].append({"arquivo": rel(csv_fc), "cards": n})

    return {
        "questoes.json": json.dumps(questoes, ensure_ascii=False, indent=1, default=str) + "\n",
        "provas.json": json.dumps(provas, ensure_ascii=False, indent=1, default=str) + "\n",
        "por_topico.json": json.dumps(por_topico, ensure_ascii=False, indent=1) + "\n",
        "cobertura.md": cobertura(topicos, por_topico, questoes, provas),
    }


def cobertura(topicos, por_topico, questoes, provas):
    validas = [q for q in questoes if q.get("status") != "anulada"]
    por_tipo = Counter(q.get("tipo") for q in questoes)
    por_alvo = Counter(q.get("cargo_alvo") for q in questoes)
    sem_topico = [q["id"] for q in questoes if not como_lista(q.get("topicos"))]
    linhas = [
        "# 🗺️ Cobertura do edital — CGU AFFC · Ciência de Dados",
        "",
        "> Gerado por `python3 scripts/build_indices.py` — não editar à mão.",
        "",
        "## Resumo",
        f"- Provas no banco: **{len(provas)}**",
        f"- Questões: **{len(questoes)}** ({len(validas)} válidas) · "
        + " · ".join(f"{k}: {v}" for k, v in sorted(por_tipo.items())),
        "- Por cargo: " + " · ".join(f"{k}: {v}" for k, v in sorted(por_alvo.items(), key=str)),
        f"- Questões fora do edital da CGU (sem tópico): {len(sem_topico)}",
        "",
        "Legenda: Q = questões reais válidas · N = notas em `disciplinas/` · 🔴 sem questão e sem nota · 🟡 só um dos dois · 🟢 os dois",
        "",
    ]
    validas_ids = {q["id"] for q in validas}
    disc_atual = None
    for tid, t in topicos.items():
        if t["nivel"] != "subitem":
            continue
        if t["disciplina"] != disc_atual:
            disc_atual = t["disciplina"]
            linhas += ["", f"## {t['prova']} · {disc_atual}", "", "| | Tópico | Q | N | Texto |", "|:-:|---|:-:|:-:|---|"]
        info = por_topico[tid]
        nq = len([q for q in info["questoes"] if q in validas_ids])
        nn = len(info["notas"])
        cor = "🟢" if nq and nn else ("🟡" if nq or nn else "🔴")
        texto = t["texto"] if len(t["texto"]) <= 90 else t["texto"][:87] + "…"
        linhas.append(f"| {cor} | `{tid}` | {nq} | {nn} | {texto} |")
    return "\n".join(linhas) + "\n"


def main():
    saidas = gerar()
    if "--check" in sys.argv:
        desatualizados = [n for n, c in saidas.items()
                          if not (INDICES / n).exists() or (INDICES / n).read_text(encoding="utf-8") != c]
        if desatualizados:
            print("Índices desatualizados: " + ", ".join(desatualizados) + " → rode python3 scripts/build_indices.py")
            sys.exit(1)
        print("Índices atualizados.")
        return
    INDICES.mkdir(exist_ok=True)
    for nome, conteudo in saidas.items():
        (INDICES / nome).write_text(conteudo, encoding="utf-8")
    q = json.loads(saidas["questoes.json"])
    print(f"_indices/: {len(q)} questões, {len(json.loads(saidas['provas.json']))} provas")


if __name__ == "__main__":
    main()
