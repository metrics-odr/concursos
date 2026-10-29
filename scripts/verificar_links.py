#!/usr/bin/env python3
"""Verifica os links externos da curadoria do acervo e das provas.

Uso: python3 scripts/verificar_links.py [arquivo.json|arquivo.md ...]
Sem argumentos: verifica concursos/*/acervo/curadoria.json e concursos/*/revisao/provas-cebraspe.md.
Sai com código 1 se algum link falhar (status >= 400 ou erro de rede).
"""
import json
import re
import sys
import urllib.request
from urllib.parse import quote
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"


def urls_de(arquivo):
    texto = arquivo.read_text(encoding="utf-8")
    if arquivo.name == "videos.json":
        return [f"https://www.youtube.com/watch?v={x['id']}" for lista in json.loads(texto).values() for x in lista]
    if arquivo.name == "fontes.json":
        return [x["url"] for v in json.loads(texto).values() for l in v.values() for x in l]
    if arquivo.suffix == ".json":
        dados = json.loads(texto)
        return [l["url"] for k, v in dados.items() if isinstance(v, dict) for l in v.get("links", [])]
    return re.findall(r"\]\((https?://[^)\s]+)\)", texto)


def status(url):
    if "youtube.com/watch" in url:  # a página responde 200 até para vídeo removido; o oEmbed não
        url = "https://www.youtube.com/oembed?format=json&url=" + quote(url, safe="")
    for metodo in ("HEAD", "GET"):
        try:
            req = urllib.request.Request(url, method=metodo, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=25) as r:
                return r.status
        except urllib.error.HTTPError as e:
            if metodo == "GET" or e.code not in (403, 404, 405, 429, 500, 501):
                return e.code
        except Exception as e:  # noqa: BLE001
            if metodo == "GET":
                return f"erro: {type(e).__name__}"
    return "?"


def main():
    arquivos = [Path(a) for a in sys.argv[1:]] or [
        *RAIZ.glob("concursos/*/acervo/curadoria.json"), *RAIZ.glob("concursos/*/acervo/videos.json"), *RAIZ.glob("concursos/*/acervo/fontes.json"), *RAIZ.glob("concursos/*/revisao/provas-cebraspe.md")]
    urls = sorted({u for a in arquivos for u in urls_de(a) if u.startswith("http")})
    with ThreadPoolExecutor(8) as ex:
        resultados = list(ex.map(status, urls))
    # 403 costuma ser bloqueio anti-robô (o link abre no navegador): só avisa
    avisos = [(u, s) for u, s in zip(urls, resultados) if s == 403]
    falhas = [(u, s) for u, s in zip(urls, resultados) if not (isinstance(s, int) and s < 400) and s != 403]
    for u, s in avisos:
        print(f"⚠️ {s} (bloqueio anti-robô?)  {u}")
    for u, s in falhas:
        print(f"❌ {s}  {u}")
    print(f"{len(urls) - len(falhas) - len(avisos)}/{len(urls)} links ok, {len(avisos)} avisos, {len(falhas)} falhas")
    sys.exit(1 if falhas else 0)


if __name__ == "__main__":
    main()
