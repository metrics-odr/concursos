---
titulo: Discursiva Cebraspe — CGU AFFC
tipo: perfil-banca
topicos: []
atualizado: 2026-10-29
---
# ✍️ Discursiva Cebraspe — CGU AFFC (P4)

> Fonte: edital CGU 2026, subitens 9.1 e 9.7 (`concursos/cgu-affc/edital/edital-cgu-2026-12.md`). Resumo da banca: [[perfil]].

## Formato

| | Questão 1 | Questão 2 — situação-problema |
|---|---|---|
| Base | conhecimentos **complementares** (P2: governança, transparência, direito público, evidências e IA, auditoria) | conhecimentos **específicos** (Ciência de Dados) |
| Tamanho | até **30 linhas** | até **60 linhas** |
| Valor | **30 pontos** | **70 pontos** |
| Nota | NQ₁ = NC − 6 × NE ÷ TL | NQ₂ = NC − 14 × NE ÷ TL |

- **NC** = nota de conteúdo (apresentação e estrutura textuais + desenvolvimento do tema); **NE** = número de erros de língua (grafia, morfossintaxe, propriedade vocabular); **TL** = linhas efetivamente escritas.
- Aprovação: **NFPD = NQ₁ + NQ₂ ≥ 50**. Fuga ao tema ou texto em branco → zero. Texto além do limite de linhas é desconsiderado.
- Dois corretores de conteúdo; se as notas divergirem mais de 25% do máximo, há terceira correção (9.7.4.1).
- Tempo: a tarde inteira (3 h 30) é só para a discursiva → ~1 h para a Q1 e ~2 h para a Q2, incluindo rascunho.

## Como o Cebraspe monta a questão
- Um **texto motivador** curto + um comando com **2 a 4 aspectos numerados** (“Em seu texto, aborde: 1 …; 2 …; 3 …”).
- O **padrão de resposta** divide a nota de conteúdo entre esses aspectos (em geral partes iguais), com faixas de 0 a N para cada aspecto conforme a completude.
- Exemplos oficiais para treinar (padrões de resposta e provas): ver a seção 2 de `concursos/cgu-affc/revisao/provas-cebraspe.md` (CNPq 2024 Gestão de Dados, PF 2025 Cargo 16, ANATEL 2024, TCDF 2024).

> [!NOTE] Verificar:
> Ainda não há discursiva transcrita em `questoes/`. Ao incluir uma (tipo `discursiva`), copiar o **padrão de resposta oficial** para a seção “Comentário” e citar aqui como exemplo.

## Estrutura recomendada para a situação-problema (60 linhas)
1. **Contexto e diagnóstico** (≈10 linhas): o problema público e por que dados/IA ajudam.
2. **Solução técnica** (≈20 linhas): dados e fontes → preparação → modelo/técnica → validação e métricas.
3. **Riscos e governança** (≈15 linhas): vieses, LGPD, explicabilidade, revisão humana, rastreabilidade.
4. **Operação** (≈10 linhas): implantação, monitoramento, indicadores.
5. **Conclusão** (≈5 linhas): retomar o comando.

Um parágrafo por aspecto do comando, na ordem do comando: é assim que o corretor procura cada ponto do padrão de resposta.

## Correção de um texto do Eduardo (skill `gerar-questoes`, modo discursiva)
1. Montar o espelho: aspectos do comando × pontos possíveis.
2. Pontuar cada aspecto (0 a máximo) com justificativa curta.
3. Contar erros de língua (NE) e linhas (TL) → aplicar a fórmula do edital.
4. Devolver: nota estimada, o que faltou por aspecto e uma versão reescrita dos trechos mais fracos.
