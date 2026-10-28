#!/usr/bin/env python3
"""Exporta os cards de flashcards/banco/*.csv para arquivos de importação do Anki.

Gera em flashcards/exportados/:
  anki-basico.txt     -> tipo de nota "Básico"                       (basico, vf, comparacao)
  anki-invertido.txt  -> tipo de nota "Básico (e cartão invertido)"  (invertido)
  anki-cloze.txt      -> tipo de nota "Omissão de palavras"          (cloze)

Uso:
  python3 flashcards/scripts/exportar_anki.py            # todos os concursos
  python3 flashcards/scripts/exportar_anki.py cgu-affc   # só um concurso
"""
import csv
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
BANCO = RAIZ / "banco"
SAIDA = RAIZ / "exportados"

ARQUIVO_POR_TIPO = {
    "basico": "anki-basico.txt",
    "vf": "anki-basico.txt",
    "comparacao": "anki-basico.txt",
    "invertido": "anki-invertido.txt",
    "cloze": "anki-cloze.txt",
}
COLUNAS = ["id", "tipo", "frente", "verso", "topico", "concursos", "fonte", "criado"]


def ler_cards(filtro_concurso=None):
    for arquivo in sorted(BANCO.glob("*.csv")):
        if arquivo.name.startswith("_"):
            continue
        disciplina = arquivo.stem
        with arquivo.open(encoding="utf-8", newline="") as f:
            for n, card in enumerate(csv.DictReader(f), start=2):
                faltando = [c for c in COLUNAS if c not in card]
                if faltando:
                    sys.exit(f"{arquivo.name}: colunas ausentes {faltando}")
                if card["tipo"] not in ARQUIVO_POR_TIPO:
                    sys.exit(f"{arquivo.name}, linha {n}: tipo inválido '{card['tipo']}'")
                concursos = card["concursos"].split()
                if filtro_concurso and filtro_concurso not in concursos:
                    continue
                yield disciplina, concursos, card


def main():
    filtro = sys.argv[1] if len(sys.argv) > 1 else None
    linhas = {nome: [] for nome in set(ARQUIVO_POR_TIPO.values())}
    ids = set()

    for disciplina, concursos, card in ler_cards(filtro):
        if card["id"] in ids:
            sys.exit(f"id duplicado: {card['id']}")
        ids.add(card["id"])
        tags = [f"disciplina::{disciplina}", f"topico::{card['topico']}", f"tipo::{card['tipo']}"]
        tags += [f"concurso::{c}" for c in concursos]
        verso = card["verso"]
        if card["fonte"]:
            verso = f"{verso}<br><small>Fonte: {card['fonte']}</small>" if verso else f"<small>Fonte: {card['fonte']}</small>"
        baralho = f"Concursos::{disciplina}"
        linhas[ARQUIVO_POR_TIPO[card["tipo"]]].append(
            [card["id"], baralho, card["frente"], verso, " ".join(tags)]
        )

    SAIDA.mkdir(exist_ok=True)
    total = 0
    for nome, registros in linhas.items():
        destino = SAIDA / nome
        if not registros:
            destino.unlink(missing_ok=True)
            continue
        with destino.open("w", encoding="utf-8", newline="") as f:
            f.write("#separator:tab\n#html:true\n#guid column:1\n#deck column:2\n#tags column:5\n")
            csv.writer(f, delimiter="\t", lineterminator="\n").writerows(registros)
        print(f"{destino.relative_to(RAIZ.parent)}: {len(registros)} cards")
        total += len(registros)
    print(f"Total: {total} cards" + (f" (concurso {filtro})" if filtro else ""))


if __name__ == "__main__":
    main()
