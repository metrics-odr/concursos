---
name: gerar-questoes
description: Gera questões no estilo Cebraspe (certo/errado e discursiva) para a prova do Eduardo (CGU AFFC – Ciência de Dados), ancoradas no edital e em questões reais do banco. Use quando ele pedir "gere N questões", "questões da minha prova", "simulado", "questões de <assunto>", "me testa em <tópico>", "discursiva", "corrige minha discursiva", ou perguntar o que falta estudar ("lacunas", "o que está descoberto").
---

# Gerar questões no estilo Cebraspe

Não copie o conteúdo dos arquivos abaixo para cá: **leia-os** a cada uso (eles são atualizados).

## 1. Ler antes de gerar
1. `bancas/cebraspe/perfil.md` — formato, pontuação, padrões de pegadinha e exemplos reais.
2. `_indices/por_topico.json` — tópico do edital (ex.: `ML.3.1`) → questões reais, notas, acervo.
3. `_indices/questoes.json` — todas as questões do banco com frontmatter e `caminho`.
4. Se o pedido for discursiva: `bancas/cebraspe/discursiva.md`.

Se `_indices/` estiver ausente ou desatualizado, rodar `python3 scripts/build_indices.py` primeiro.

## 2. Escolher os tópicos
- O Eduardo disse o assunto → mapear para IDs do edital em `concursos/cgu-affc/edital/topicos.json` (campo `id`).
- Não disse → sortear ponderando: **P3 (EP, ED, ML, OP) ≈ 70%** dos itens (vale 2 pontos/item), P2 ≈ 20%, P1 ≈ 10%; dentro disso, preferir tópicos ⬜/🟨 em `concursos/cgu-affc/PROGRESSO.md` e tópicos 🔴/🟡 em `_indices/cobertura.md`.
- “Questões da minha prova” sem número → 5 itens.

## 3. Buscar referências reais
Para cada tópico: filtrar `_indices/questoes.json` por `topicos` contendo o ID (ou o tópico pai, ex.: `ML.3`), `status != anulada`; primeiro `cargo_alvo: sim`, depois `analogo`. Ler **3 a 5** arquivos (o `caminho` e o texto-base em `texto_base`) para copiar o estilo: tamanho, comando, tipo de troca no item errado.

## 4. Rotular cada questão
- **REPRODUZIDA** — texto original, com `id` e fonte (órgão/ano). Usar quando o Eduardo pedir “questões reais” ou para aquecer.
- **ADAPTADA (de <id>)** — reescrita a partir de uma questão real; dizer em uma linha o que mudou (contexto CGU, número, conceito trocado).
- **INÉDITA** — criada no estilo da banca, com base no edital e nas notas de `disciplinas/` (se existirem).
- Se **não existir questão real** do tópico, dizer isso explicitamente (“sem questão real no banco para ML.5.3 — itens inéditos”).

## 5. Montar a saída
> [!IMPORTANT]
> **Banca sempre visível.** O arquivo/saída abre com `🏛️ **Banca: <nome>**` (do concurso em `concursos/concursos.json`) e **cada questão** leva a banca no rótulo: `[INÉDITA · Banca Cebraspe]`. Frontmatter de simulado exige `banca:`. Nunca misturar bancas no mesmo bloco; um questionário por banca.
```
### Bloco 1 — <tópico do edital: ID + nome curto>
<texto-base curto, se houver>
<comando: "Considerando..., julgue os itens a seguir.">
1. <item>   [INÉDITA · Banca Cebraspe]
2. <item>   [ADAPTADA de CEB-2022-PETROBRAS-CD-Q056 · Banca Cebraspe]
...
---
## Gabarito comentado
1. **E** — <por quê, apontando a peça trocada> · Tópico `ML.2.4` · Nota: [[...]] (se houver) · Ref.: CEB-...
```
- Gabarito **só no final**, nunca ao lado do item.
- Equilibrar C e E (nem todos iguais); cada E com **uma** peça errada; nada ambíguo (ver checklist do perfil).
- Não inventar dispositivo legal, número ou fato: se não tiver certeza, não use ou marque `> [!NOTE] Verificar:`.

## 6. Depois
- Se o Eduardo pedir para salvar: `desafios/simulados/prova-claude-<DD-MM-AAAA>-<descricao>.md` e, se o gabarito for separado, `gabarito-claude-<DD-MM-AAAA>-<descricao>.md` (padrão em `questoes/README.md` → “Padrão de nome”; com frontmatter `titulo`, `tipo: simulado`, `banca`, `topicos: [...]`, `atualizado`), rodar `python3 scripts/build_indices.py && python3 scripts/validar.py`, commit e push.
- Se ele responder os itens: corrigir, e registrar os erros em `concursos/cgu-affc/revisao/questoes.md` (caderno de erros).

## Variações
- **Discursiva**: proposta no padrão Cebraspe (texto motivador + comando com 2–4 aspectos + número de linhas), espelho de correção em seção separada no final. Para corrigir um texto dele, seguir “Correção” em `bancas/cebraspe/discursiva.md`.
- **Lacunas** (“o que falta?”): ler `_indices/cobertura.md` + `PROGRESSO.md` e propor o que estudar primeiro (peso P3, tópicos 🔴) e que provas buscar (`concursos/cgu-affc/revisao/provas-cebraspe.md`).
