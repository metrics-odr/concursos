#!/usr/bin/env python3
"""Extrai o texto de cada PDF em _inbox/ para um .md ao lado (<nome>.pdf.md), para o Claude classificar.

- Só processa PDFs que ainda não têm o .md (idempotente).
- Usa pdftotext (poppler); se o PDF for imagem (sem texto), o .md avisa que precisa de leitura visual/OCR.
- Não classifica nem move nada: isso é trabalho da skill `ingerir-material`.

Uso: python3 scripts/extrair_pdf.py [pasta]   (padrão: _inbox/)
"""
import shutil
import subprocess
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent


def extrair(pdf):
    if not shutil.which("pdftotext"):
        sys.exit("pdftotext não encontrado (instale poppler-utils).")
    texto = subprocess.run(["pdftotext", "-enc", "UTF-8", str(pdf), "-"], capture_output=True, text=True).stdout
    return texto.strip()


def main():
    pasta = Path(sys.argv[1]) if len(sys.argv) > 1 else RAIZ / "_inbox"
    novos = 0
    for pdf in sorted(pasta.rglob("*.pdf")) + sorted(pasta.rglob("*.PDF")):
        if "_revisar" in pdf.parts:
            continue
        md = pdf.with_name(pdf.name + ".md")
        if md.exists():
            continue
        texto = extrair(pdf)
        aviso = "" if len(texto) > 200 else (
            "> [!WARNING]\n> Quase nenhum texto extraído: o PDF parece ser imagem (escaneado/manuscrito). "
            "Ler as páginas visualmente.\n\n")
        md.write_text(f"# Texto extraído de `{pdf.name}`\n\n> Gerado por `scripts/extrair_pdf.py` — texto bruto, "
                      f"pode ter colunas embaralhadas, fórmulas e tabelas quebradas. Conferir no PDF.\n\n{aviso}"
                      f"```text\n{texto}\n```\n", encoding="utf-8")
        novos += 1
        print(md.relative_to(RAIZ) if md.is_relative_to(RAIZ) else md)
    print(f"{novos} PDF(s) extraído(s).")


if __name__ == "__main__":
    main()
