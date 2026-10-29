#!/usr/bin/env python3
"""Valida a prova de nivelamento (concursos/cgu-affc/nivelamento/).

Confere:
- estrutura.json: cada disciplina/tópico existe em edital/topicos.json e todo tópico do edital está em algum bloco;
- proporcionalidade: itens por prova (P1 4, P2 5, P3 11 = 20) batem com a soma das cotas das disciplinas;
- banco/<slug>.json: ids únicos, gabarito C/E, tópico válido, justificativa nos itens ERRADOS;
- todo tópico do edital tem ao menos 1 item no banco; ideal ≥ 2× a cota para variar entre execuções.

Uso: python3 scripts/validar_nivelamento.py   (sai com erro se algo estiver inconsistente)
"""
import json
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
CONCURSO = RAIZ / "concursos" / "cgu-affc"
NIV = CONCURSO / "nivelamento"


def main():
    erros, avisos = [], []
    edital = json.loads((CONCURSO / "edital" / "topicos.json").read_text(encoding="utf-8"))
    est = json.loads((NIV / "estrutura.json").read_text(encoding="utf-8"))
    disc_edital = {d["slug"]: d for d in edital["disciplinas"]}
    provas = {p["id"]: p for p in est["provas"]}
    por_prova = {p: 0 for p in provas}
    ids = set()
    total_banco = 0

    for d in est["disciplinas"]:
        slug = d["slug"]
        ed = disc_edital.get(slug)
        if not ed:
            erros.append(f"{slug}: disciplina não existe em topicos.json")
            continue
        if ed["prova"] != d["prova"]:
            erros.append(f"{slug}: prova {d['prova']} ≠ {ed['prova']} no edital")
        nums = {t["num"] for t in ed["topicos"]}
        cobertos = d["topicos"]
        for t in set(nums) - set(cobertos):
            erros.append(f"{slug}: tópico {t} do edital fora da estrutura")
        for t in set(cobertos) - nums:
            erros.append(f"{slug}: tópico {t} não existe no edital")

        arq = NIV / "banco" / f"{slug}.json"
        if not arq.exists():
            erros.append(f"{slug}: falta banco/{slug}.json")
            continue
        itens = json.loads(arq.read_text(encoding="utf-8"))["itens"]
        total_banco += len(itens)
        for it in itens:
            if it["id"] in ids:
                erros.append(f"id repetido: {it['id']}")
            ids.add(it["id"])
            if it["g"] not in ("C", "E"):
                erros.append(f"{it['id']}: gabarito deve ser C ou E")
            if it["t"] not in nums:
                erros.append(f"{it['id']}: tópico {it['t']} não existe")
            if not it.get("q"):
                erros.append(f"{it['id']}: falta o enunciado (q)")
            if it["g"] == "E" and not it.get("j"):
                erros.append(f"{it['id']}: item ERRADO precisa de justificativa (j)")
        por_prova[d["prova"]] += d["itens"]
        sem_banco = [t for t in cobertos if not any(it["t"] == t for it in itens)]
        if sem_banco:
            erros.append(f"{slug}: tópicos sem nenhum item no banco: {sem_banco}")
        if len(itens) < 2 * d["itens"]:
            avisos.append(f"{slug}: só {len(itens)} itens no banco (ideal ≥ {2 * d['itens']} para variar)")

    for pid, p in provas.items():
        if por_prova[pid] != p["itens"]:
            erros.append(f"{pid}: {por_prova[pid]} itens nas disciplinas, esperado {p['itens']}")
    if sum(por_prova.values()) != est["total_itens"]:
        erros.append(f"total de itens {sum(por_prova.values())} ≠ {est['total_itens']}")

    for a in avisos:
        print(f"⚠️  {a}")
    for e in erros:
        print(f"❌ {e}")
    resumo = " · ".join(f"{p} {n} itens" for p, n in por_prova.items())
    print(f"Nivelamento: {resumo} · banco com {total_banco} itens")
    return 1 if erros else 0


if __name__ == "__main__":
    sys.exit(main())
