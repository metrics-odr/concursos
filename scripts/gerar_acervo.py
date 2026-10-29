#!/usr/bin/env python3
"""Gera concursos/cgu-affc/acervo/<disciplina>.md a partir do edital (topicos.json) e da curadoria.

Cada arquivo traz: como estudar, fontes curadas e, para CADA tópico do edital, vídeos reais sobre o tema
(curados em acervo/videos.json, por ID do edital) e atalhos de busca (PDFs, questões Cebraspe e artigos).

Uso: python3 scripts/gerar_acervo.py
"""
import json
from pathlib import Path
from urllib.parse import quote_plus

RAIZ = Path(__file__).resolve().parent.parent
CONCURSO = RAIZ / "concursos" / "cgu-affc"
ACERVO = CONCURSO / "acervo"
ICONES = {"video": "▶️", "curso": "🎓", "pdf": "📄", "lei": "⚖️", "artigo": "📰", "ferramenta": "🧰", "questoes": "📝"}


def termos(texto, limite=9):
    palavras = [p.strip(",;:()") for p in texto.replace("*", "").split()]
    return " ".join(p for p in palavras if p)[:120] if len(palavras) <= limite else " ".join(palavras[:limite])


def buscas(assunto):
    q = quote_plus(assunto)
    return " · ".join([
        f"[📄 PDFs](https://www.google.com/search?q={q}+filetype%3Apdf)",
        f"[📝 Questões Cebraspe](https://www.google.com/search?q={q}+cebraspe+site%3Aqconcursos.com)",
        f"[📰 Artigos](https://www.google.com/search?q={q}+concurso+resumo)",
    ])


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
                "Vídeos selecionados sobre cada tópico (YouTube) e atalhos de busca para PDFs, questões e artigos.", ""]
        for t in d["topicos"]:
            out += [f"### {t['num']} {t['titulo']}", "", buscas(t["titulo"]), ""]
            for s in t["subitens"]:
                out.append(f"- **{s['num']}** {s['texto']}")
                out += videos_md(videos.get(s["id"], []), "  ")
                out.append(f"  - {buscas(termos(s['texto']))}")
            out.append("")
        (ACERVO / f"{d['slug']}.md").write_text("\n".join(out), encoding="utf-8")
        indice.append(f"| {d['prova']} | [{d['disciplina']}]({d['slug']}.md) | {len(c['links'])} |")

    indice += ["", "## 📝 Provas anteriores", "", "→ [`revisao/provas-cebraspe.md`](../revisao/provas-cebraspe.md)", ""]
    (ACERVO / "README.md").write_text("\n".join(indice), encoding="utf-8")
    print(f"acervo: {len(topicos['disciplinas'])} disciplinas geradas em {ACERVO.relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
