#!/usr/bin/env python3
"""Gera concursos/cgu-affc/acervo/<disciplina>.md a partir do edital (topicos.json) e da curadoria.

Cada arquivo traz: como estudar, fontes curadas e, para CADA tópico do edital, vídeos (acervo/videos.json), PDFs e artigos reais (acervo/fontes.json, por ID do edital) e questões do banco.

Uso: python3 scripts/gerar_acervo.py
"""
import json
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
CONCURSO = RAIZ / "concursos" / "cgu-affc"
ACERVO = CONCURSO / "acervo"
ICONES = {"video": "▶️", "curso": "🎓", "pdf": "📄", "lei": "⚖️", "artigo": "📰", "ferramenta": "🧰", "questoes": "📝"}


def fontes_md(f, questoes, recuo):
    """Uma linha por fonte real: 📄 PDF e 📰 artigo (acervo/fontes.json) e 📝 questões do banco (Banca Cebraspe)."""
    linhas = []
    for l in f.get("pdf", []):
        linhas.append(f"{recuo}- 📄 [{l['titulo']}]({l['url']}) — PDF")
    for l in f.get("artigo", []):
        linhas.append(f"{recuo}- 📰 [{l['titulo']}]({l['url']}) — artigo")
    for q in questoes:
        linhas.append(f"{recuo}- 📝 [{q[0]}]({q[1]}) — questão real · Banca Cebraspe")
    return linhas


def questoes_do_banco(por_topico, sid):
    """Questões reais do banco (questoes/) ligadas ao tópico: [(id, caminho relativo ao acervo)]."""
    achadas = []
    for qid in por_topico.get(sid, {}).get("questoes", [])[:3]:
        arq = next((RAIZ / "questoes").glob(f"*/{qid.lower()}.md"), None)
        if arq:
            achadas.append((qid, "../../../" + str(arq.relative_to(RAIZ))))
    return achadas


def videos_md(videos, recuo):
    """Uma linha por vídeo curado: ▶️ [título](url) — canal."""
    linhas = []
    for v in videos:
        titulo = v["titulo"] if len(v["titulo"]) <= 90 else v["titulo"][:87].rstrip() + "…"
        linhas.append(f"{recuo}- ▶️ [{titulo}](https://www.youtube.com/watch?v={v['id']}) — {v['canal']}")
    return linhas


def link_md(l, prefixo_rel):
    url = l["url"] if l["url"].startswith("http") else prefixo_rel + l["url"]
    nota = f" — {l['nota']}" if l.get("nota") else ""
    return f"- {ICONES.get(l['tipo'], '🔗')} [{l['titulo']}]({url}){nota}"


def main():
    topicos = json.loads((CONCURSO / "edital" / "topicos.json").read_text(encoding="utf-8"))
    curadoria = json.loads((ACERVO / "curadoria.json").read_text(encoding="utf-8"))
    videos = json.loads((ACERVO / "videos.json").read_text(encoding="utf-8"))
    fontes = json.loads((ACERVO / "fontes.json").read_text(encoding="utf-8"))
    pt = RAIZ / "_indices" / "por_topico.json"
    por_topico = json.loads(pt.read_text(encoding="utf-8")) if pt.exists() else {}
    rel = "../../../"  # de concursos/cgu-affc/acervo/ até a raiz
    indice = ["# 🔎 Acervo de estudo — CGU AFFC · Ciência de Dados", "",
              "Onde e como estudar cada disciplina do edital. Fontes curadas + atalhos de busca por tópico.", "",
              "> [!TIP]", "> Gerado por `python3 scripts/gerar_acervo.py`. Para incluir uma fonte, edite "
              "[`curadoria.json`](curadoria.json) (ou peça ao Claude) — vídeos por tópico ficam em [`videos.json`](videos.json) — a rotina semanal também faz isso.", "",
              "## Como estudar (geral)", ""]
    indice += [f"- {c}" for c in curadoria["geral"]["como_estudar"]]
    indice += ["", "## Fontes gerais", ""] + [link_md(l, rel) for l in curadoria["geral"]["links"]]
    indice += ["", "## Disciplinas", "", "| Prova | Disciplina | Fontes curadas |", "|---|---|:---:|"]

    for d in topicos["disciplinas"]:
        c = curadoria.get(d["slug"], {"como_estudar": [], "links": []})
        # só linka a pasta se ela já tem notas (link para pasta inexistente/vazia = página vazia no site)
        pasta = (f"[`disciplinas/{d['slug']}/`]({rel}disciplinas/{d['slug']}/)"
                 if any((RAIZ / "disciplinas" / d["slug"]).glob("*.md")) else f"`disciplinas/{d['slug']}/` (ainda sem notas)")
        out = [f"# 🔎 Acervo — {d['disciplina']}", "",
               f"> {d['prova']} · {d['grupo_nome']} · Pasta de notas: {pasta}", "",
               "## 🧭 Como estudar", ""]
        out += [f"- {x}" for x in c["como_estudar"]] or ["- *(a definir)*"]
        out += ["", "## 📚 Fontes curadas", ""]
        out += [link_md(l, rel) for l in c["links"]] or ["*(nenhuma ainda — a rotina semanal vai preencher)*"]
        out += ["", "## 🗂️ Por tópico do edital", "",
                "Para cada item: vídeos do YouTube, PDFs e artigos reais (links diretos, de `fontes.json`) e questões reais do banco.", ""]
        for t in d["topicos"]:
            out += [f"### {t['num']} {t['titulo']}", ""]
            for s in t["subitens"]:
                out.append(f"- **{s['num']}** {s['texto']}")
                out += videos_md(videos.get(s["id"], []), "  ")
                out += fontes_md(fontes.get(s["id"], {}), questoes_do_banco(por_topico, s["id"]), "  ")
            out.append("")
        (ACERVO / f"{d['slug']}.md").write_text("\n".join(out), encoding="utf-8")
        indice.append(f"| {d['prova']} | [{d['disciplina']}]({d['slug']}.md) | {len(c['links'])} |")

    indice += ["", "## 📝 Provas anteriores", "", "→ [`revisao/provas-cebraspe.md`](../revisao/provas-cebraspe.md)", ""]
    (ACERVO / "README.md").write_text("\n".join(indice), encoding="utf-8")
    print(f"acervo: {len(topicos['disciplinas'])} disciplinas geradas em {ACERVO.relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
