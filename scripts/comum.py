"""Funções compartilhadas por build_indices.py e validar.py (frontmatter, tópicos do edital, wikilinks)."""
import json
import re
from pathlib import Path

import yaml

RAIZ = Path(__file__).resolve().parent.parent
QUESTOES = RAIZ / "questoes"
TOPICOS = RAIZ / "concursos" / "cgu-affc" / "edital" / "topicos.json"
INDICES = RAIZ / "_indices"

TIPOS_ITEM = {"certo-errado", "multipla-escolha", "discursiva"}
WIKILINK = re.compile(r"!?\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]")
FM = re.compile(r"^---\n(.*?)\n---\n?", re.S)


def ler_md(caminho):
    """(frontmatter: dict | None, corpo: str). Frontmatter inválido levanta ValueError."""
    texto = caminho.read_text(encoding="utf-8")
    m = FM.match(texto)
    if not m:
        return None, texto
    try:
        dados = yaml.safe_load(m.group(1)) or {}
    except yaml.YAMLError as e:
        raise ValueError(f"frontmatter YAML inválido: {e}".splitlines()[0])
    if not isinstance(dados, dict):
        raise ValueError("frontmatter não é um dicionário chave: valor")
    return dados, texto[m.end():]


def topicos_edital():
    """{id: {"id", "texto", "disciplina", "slug", "prova"}} com tópicos (ML.3) e subitens (ML.3.1)."""
    d = json.loads(TOPICOS.read_text(encoding="utf-8"))
    out = {}
    for disc in d["disciplinas"]:
        base = {"disciplina": disc["disciplina"], "slug": disc["slug"], "prova": disc["prova"]}
        for t in disc["topicos"]:
            out[t["id"]] = {"id": t["id"], "texto": t["titulo"], "nivel": "topico", **base}
            for s in t["subitens"]:
                out[s["id"]] = {"id": s["id"], "texto": s["texto"], "nivel": "subitem", "pai": t["id"], **base}
    return out


def arquivos_repo():
    """Arquivos do repositório (fora .git), caminhos relativos com '/'."""
    return sorted(str(p.relative_to(RAIZ)).replace("\\", "/") for p in RAIZ.rglob("*")
                  if p.is_file() and ".git" not in p.relative_to(RAIZ).parts[:1] and "_site" not in p.parts)


def resolver_wikilink(alvo, arquivos):
    """Mesma regra do app (app/app.js → resolverWiki): caminho, caminho sem .md ou nome do arquivo."""
    nome = alvo.strip().lower()
    for p in arquivos:
        if p.lower() in (nome, f"{nome}.md"):
            return p
    for p in arquivos:
        base = p.rsplit("/", 1)[-1].lower()
        if base in (nome, f"{nome}.md") or p.lower().endswith(f"/{nome}.md") or p.lower().endswith(f"/{nome}"):
            return p
    return None


def como_lista(valor):
    if valor is None:
        return []
    return valor if isinstance(valor, list) else [valor]
