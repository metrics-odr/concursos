#!/usr/bin/env python3
"""Gera indice.json (lista de arquivos do repo) para a Área do Concurseiro.

O app usa a API do GitHub para listar arquivos; este índice é o plano B quando a API
não responde (limite de requisições). Roda no build do GitHub Pages.

Uso: python3 scripts/gerar_indice.py [pasta_saida]
"""
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent


def main():
    saida = Path(sys.argv[1]) if len(sys.argv) > 1 else RAIZ
    arquivos = subprocess.run(["git", "ls-files"], cwd=RAIZ, capture_output=True, text=True, check=True).stdout.split("\n")
    arquivos = sorted(a for a in arquivos if a and not a.startswith(".github/"))
    dados = {"gerado": datetime.now(timezone.utc).isoformat(timespec="seconds"), "arquivos": arquivos}
    (saida / "indice.json").write_text(json.dumps(dados, ensure_ascii=False, indent=0) + "\n", encoding="utf-8")
    print(f"indice.json: {len(arquivos)} arquivos")


if __name__ == "__main__":
    main()
