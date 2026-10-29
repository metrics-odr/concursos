#!/usr/bin/env python3
"""Gera o desafio do dia em desafios/AAAA-MM-DD.md a partir do edital e do PROGRESSO.md.

Regras:
- 1 tópico da P3 (específicos, 2 pontos/item) todo dia, alternando as 4 disciplinas;
- 1 tópico da P1 ou P2, alternando as 9 disciplinas;
- tópicos já ✅/🔁 no PROGRESSO.md e tópicos já sorteados em desafios anteriores ficam por último;
- domingo: revisão da semana + simulado; sábado: discursiva; quarta: padrão de resposta.
Idempotente: se o arquivo do dia já existe, não faz nada.

Uso: python3 scripts/gerar_desafio.py [AAAA-MM-DD] [--json saida.json]
"""
import json
import re
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import quote_plus

RAIZ = Path(__file__).resolve().parent.parent
CONCURSO = RAIZ / "concursos" / "cgu-affc"
DESAFIOS = RAIZ / "desafios"
PROVA = date(2026, 12, 13)
APP = "https://metrics-odr.github.io/concursos/"
BRT = timezone(timedelta(hours=-3))
DIAS = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"]


def status_progresso():
    """{(titulo_disciplina, num_topico): emoji} a partir do PROGRESSO.md."""
    st, disc = {}, None
    for linha in (CONCURSO / "PROGRESSO.md").read_text(encoding="utf-8").splitlines():
        h = re.match(r"^### (.+)", linha)
        if h:
            disc = h.group(1).strip()
        m = re.match(r"^- (⬜|🟨|✅|🔁) \*\*(\d+)\*\*", linha)
        if m and disc:
            st[(disc, m.group(2))] = m.group(1)
    return st


def ja_sorteados():
    feitos = {}
    for arq in sorted(DESAFIOS.glob("????-??-??.md")):
        for slug, num in re.findall(r"<!-- t:([\w-]+):(\d+) -->", arq.read_text(encoding="utf-8")):
            feitos[(slug, num)] = feitos.get((slug, num), 0) + 1
    return feitos


def escolher(disciplinas, indice_dia, st, sorteados):
    d = disciplinas[indice_dia % len(disciplinas)]
    peso = {"🟨": 0, "⬜": 1, "✅": 3, "🔁": 4}

    def chave(t):
        return (sorteados.get((d["slug"], t["num"]), 0), peso.get(st.get((d["disciplina"], t["num"]), "⬜"), 1), int(t["num"]))

    return d, min(d["topicos"], key=chave)


def bloco(d, t, itens):
    rel = f"../concursos/cgu-affc/acervo/{d['slug']}.md"
    q = quote_plus(f"{t['titulo']} cebraspe")
    subs = "; ".join(s["texto"] for s in t["subitens"])[:400]
    return [
        f"### {d['prova']} · {d['disciplina']}",
        f"**{t['num']} {t['titulo']}**" + (f" — {subs}" if subs else ""),
        "",
        f"- [ ] 📖 Estudar o tópico pelo [acervo]({rel}) e registrar a nota em `disciplinas/{d['slug']}/` <!-- t:{d['slug']}:{t['num']} -->",
        f"- [ ] 📝 Resolver {itens} itens Cebraspe do tópico ([buscar questões](https://www.google.com/search?q={q}+site%3Aqconcursos.com)) e anotar os erros em `revisao/questoes.md`",
        "",
    ]


def gerar(dia):
    destino = DESAFIOS / f"{dia.isoformat()}.md"
    if destino.exists():
        return None, destino
    topicos = json.loads((CONCURSO / "edital" / "topicos.json").read_text(encoding="utf-8"))["disciplinas"]
    p3 = [d for d in topicos if d["prova"] == "P3"]
    p12 = [d for d in topicos if d["prova"] in ("P1", "P2")]
    st, sorteados = status_progresso(), ja_sorteados()
    n = dia.toordinal()
    faltam = (PROVA - dia).days
    semana = dia.weekday()

    out = [f"# 🎯 Desafio — {dia.strftime('%d/%m/%Y')} ({DIAS[semana]})", "",
           f"> ⏳ **{faltam} dias** para a prova (13/12/2026) · marque cada item ao concluir.", ""]
    tarefas = []
    if semana == 6:
        out += ["## 🔁 Domingo: revisão e simulado", "",
                "- [ ] 🔁 Revisar as notas e os erros da semana (`revisao/questoes.md`)",
                "- [ ] 🧪 Simulado: 40 itens Cebraspe misturando P1, P2 e P3 (cronometrar ~1 h) — ver [provas](../concursos/cgu-affc/revisao/provas-cebraspe.md)",
                "- [ ] 📊 Atualizar os status no [PROGRESSO](../concursos/cgu-affc/PROGRESSO.md)", ""]
        tarefas = ["Revisão da semana", "Simulado de 40 itens", "Atualizar PROGRESSO"]
    else:
        d3, t3 = escolher(p3, n, st, sorteados)
        d12, t12 = escolher(p12, n, st, sorteados)
        out += ["## 📚 Estudo do dia", ""] + bloco(d3, t3, 20) + bloco(d12, t12, 10)
        tarefas = [f"Estudar {d3['disciplina']} — {t3['num']} {t3['titulo']}", f"20 itens Cebraspe ({t3['titulo']})",
                   f"Estudar {d12['disciplina']} — {t12['num']} {t12['titulo']}", f"10 itens Cebraspe ({t12['titulo']})"]
        extras = ["## ➕ Extra", "", f"- [ ] 🃏 Revisar os flashcards do dia ([abrir]({APP}#/flashcards))"]
        tarefas.append("Revisar flashcards")
        if semana == 5:
            extras.append(f"- [ ] ✍️ Discursiva: situação-problema de 60 linhas sobre **{t3['titulo']}** (70 min, à mão) e comparar com um padrão de resposta Cebraspe")
            tarefas.append("Discursiva de 60 linhas")
        elif semana == 2:
            extras.append("- [ ] 📄 Ler 1 padrão de resposta de discursiva Cebraspe ([lista](../concursos/cgu-affc/revisao/provas-cebraspe.md)) e anotar a estrutura")
            tarefas.append("Ler padrão de resposta")
        extras.append("- [ ] ✅ Atualizar os status no [PROGRESSO](../concursos/cgu-affc/PROGRESSO.md)")
        tarefas.append("Atualizar PROGRESSO")
        out += extras + [""]
    out += ["---", f"*Gerado automaticamente em {datetime.now(BRT).strftime('%d/%m/%Y %H:%M')} (BRT) por `scripts/gerar_desafio.py`.*", ""]
    DESAFIOS.mkdir(exist_ok=True)
    destino.write_text("\n".join(out), encoding="utf-8")
    resumo = {"data": dia.isoformat(), "dias_para_prova": faltam, "tarefas": tarefas,
              "url": f"{APP}#/desafios", "arquivo": str(destino.relative_to(RAIZ))}
    return resumo, destino


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    dia = date.fromisoformat(args[0]) if args else datetime.now(BRT).date()
    resumo, destino = gerar(dia)
    if resumo is None:
        print(f"{destino.relative_to(RAIZ)} já existe — nada a fazer")
        return
    print(f"{destino.relative_to(RAIZ)} criado")
    if "--json" in sys.argv:
        saida = Path(sys.argv[sys.argv.index("--json") + 1])
        saida.write_text(json.dumps(resumo, ensure_ascii=False), encoding="utf-8")


if __name__ == "__main__":
    main()
