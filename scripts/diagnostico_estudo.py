#!/usr/bin/env python3
"""Diagnóstico de estudo: junta TODOS os nivelamentos salvos + caderno de erros.

Uso: python3 scripts/diagnostico_estudo.py [concurso]   (padrão: cgu-affc)

Lê concursos/<concurso>/nivelamento/resultados/*.md (bloco <!-- nivelamento:{...} -->)
e concursos/<concurso>/revisao/questoes.md. Imprime, por disciplina e por tópico,
acertos/erros/brancos ponderados pelo peso da prova (P1 e P2 = 1; P3 = 2),
ordenado pelo que mais pesa em pontos perdidos.
"""
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PESO = {"P1": 1, "P2": 1, "P3": 2}


def carregar(conc):
    pasta = RAIZ / "concursos" / conc / "nivelamento" / "resultados"
    execs = []
    for f in sorted(pasta.glob("*.md")):
        m = re.search(r"<!-- nivelamento:(\{.*\}) -->", f.read_text(encoding="utf-8"), re.S)
        if m:
            execs.append((f.stem, json.loads(m.group(1))["itens"]))
    return execs


def caderno(conc):
    f = RAIZ / "concursos" / conc / "revisao" / "questoes.md"
    linhas = []
    for l in f.read_text(encoding="utf-8").splitlines():
        c = [x.strip() for x in l.strip().strip("|").split("|")]
        if len(c) >= 5 and re.match(r"\d{2}/\d{2}|\d{4}-\d{2}-\d{2}", c[0]):
            linhas.append(c)
    return linhas


def main():
    conc = sys.argv[1] if len(sys.argv) > 1 else "cgu-affc"
    execs = carregar(conc)
    print(f"Nivelamentos considerados: {len(execs)} -> {', '.join(n for n, _ in execs) or 'nenhum'}")
    disc = defaultdict(lambda: dict(p="", ok=0, er=0, br=0, n=0))
    top = defaultdict(lambda: dict(ok=0, er=0, br=0))
    for _, itens in execs:
        for i in itens:
            w = PESO[i["p"]]
            k = "br" if not i["r"] else ("ok" if i["r"] == i["g"] else "er")
            d = disc[i["d"]]
            d["p"] = i["p"]
            d[k] += w
            d["n"] += 1
            top[(i["d"], i["t"])][k] += w
    print("\nDisciplina | prova | itens | pts certos | pts errados | pts em branco | líquido/possível")
    for s, d in sorted(disc.items(), key=lambda x: -(x[1]["er"] * 2 + x[1]["br"])):
        pos = d["ok"] + d["er"] + d["br"]
        print(f"{s} | {d['p']} | {d['n']} | {d['ok']} | {d['er']} | {d['br']} | {d['ok'] - d['er']}/{pos}")
    print("\nTópicos com erro ou branco (disciplina · tópico: erros / brancos):")
    for (s, t), v in sorted(top.items(), key=lambda x: -(x[1]["er"] * 2 + x[1]["br"])):
        if v["er"] or v["br"]:
            print(f"  {s} · {t}: {v['er']} / {v['br']}")
    cad = caderno(conc)
    print(f"\nCaderno de erros: {len(cad)} registro(s)")
    for c in cad:
        print("  -", " | ".join(c[:5]))


if __name__ == "__main__":
    main()
