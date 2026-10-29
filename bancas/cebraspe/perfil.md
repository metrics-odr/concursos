---
titulo: Perfil da banca Cebraspe
tipo: perfil-banca
topicos: []
atualizado: 2026-10-29
---
# 🎯 Perfil Cebraspe — como a banca cobra (foco: CGU AFFC · Ciência de Dados)

> Referência obrigatória da skill `gerar-questoes`. Cada padrão traz o **ID de uma questão real** do banco (`questoes/`).
> Ao incluir provas novas, acrescentar exemplos aqui. Contagens atualizadas: [[cobertura]].

## 1. Formato da prova da CGU (edital, itens 8 e 9)

| Prova | Itens | Valor do item | Errar | Branco |
|---|:-:|:-:|:-:|:-:|
| P1 – Básicos | 40 | +1,00 | −1,00 | 0 |
| P2 – Complementares | 40 | +1,00 | −1,00 | 0 |
| P3 – Específicos (Ciência de Dados) | 90 | **+2,00** | **−2,00** | 0 |
| P4 – Discursiva | 1 questão de 30 linhas (30 pts) + 1 situação-problema de 60 linhas (70 pts) | | | |

Fonte: `concursos/cgu-affc/edital/edital-cgu-2026-12.md`, subitens 8.2, 8.11 (a–c) e 9.1. Detalhes da discursiva: [[discursiva]].

- **Certo/Errado (C/E)**: cada item está **vinculado ao comando** que o antecede (“julgue os itens a seguir”). O texto-base e o comando valem para todos os itens do bloco.
- **Um erro anula um acerto** → só marcar com confiança > 50% (na P3, cada erro custa 2 pontos).
- Estrutura típica de bloco: **texto-base curto** (definição, situação hipotética, tabela, gráfico, código) → comando → **1 a 9 itens** independentes entre si.

## 2. Anatomia de um item

- Uma frase declarativa, normalmente de **2 a 6 linhas**, às vezes com fórmula, tabela ou trecho de código.
- O item “certo” costuma ser **definição de livro, longa e bem amarrada**: CEB-2022-PETROBRAS-CD-Q051 (variáveis *dummy*), CEB-2022-PETROBRAS-CD-Q072 (funções de ativação), CEB-2022-PETROBRAS-CD-Q090 (imputação K-NN).
- O item “errado” costuma ser uma definição correta **com uma única peça trocada**: troca de papéis, de sentido (maximizar/minimizar) ou de nome.
- Na amostra atual (Petrobras 2022, 62 itens válidos): **35 E × 27 C** (~56% errados). Não usar isso como regra de chute.

## 3. Padrões de “pegadinha” recorrentes

| Padrão | Como aparece | Exemplo real (gabarito) |
|---|---|---|
| **Troca de papéis** entre dois conceitos pareados | treino ↔ validação; X ↔ y; palavra ↔ contexto | CEB-2022-PETROBRAS-CD-Q055 (E) · CEB-2022-PETROBRAS-CD-Q064 (E) · CEB-2022-PETROBRAS-CD-Q082 (E) |
| **Inversão de sentido** | “minimizada” no lugar de “maximizada”; “quanto menor, melhor” | CEB-2022-PETROBRAS-CD-Q062 (E) · CEB-2022-PETROBRAS-CD-Q052 (E) |
| **Descrever A com as características de B** | *bagging* descrito como *boosting*; SaaS chamado de PaaS | CEB-2022-PETROBRAS-CD-Q063 (E) · CEB-2022-PETROBRAS-CD-Q117 (E) |
| **Causa/condição trocada** | “baixa variância → *overfitting*” (o correto é alta variância) | CEB-2022-PETROBRAS-CD-Q056 (E) |
| **Rótulo de métrica trocado** | especificidade chamada de TPR; sensibilidade chamada de FPR | CEB-2022-PETROBRAS-CD-Q053 (E) |
| **Restrição falsa / exclusão indevida** | “MICE não seria aplicável a MAR” (MICE pressupõe MAR) | CEB-2022-PETROBRAS-CD-Q091 (E) |
| **Mecanismo distorcido** | GMM descrito como “mais próximo da média” (pertinência é probabilística); RNN que “duplica camadas” | CEB-2022-PETROBRAS-CD-Q068 (E) · CEB-2022-PETROBRAS-CD-Q074 (E) |
| **Cálculo rápido** (contas de cabeça, sem calculadora) | determinante 2×2 com numpy; TF-IDF com termo presente em todos os documentos (idf = 0) | CEB-2022-PETROBRAS-CD-Q108 (C) · CEB-2022-PETROBRAS-CD-Q109 (E) · CEB-2022-PETROBRAS-CD-Q083 (E) |
| **Leitura de gráfico ou tabela** | quartis no boxplot; decil e assimetria no histograma; atribuição de cluster pela menor distância | CEB-2022-PETROBRAS-CD-Q087 (E) · CEB-2022-PETROBRAS-CD-Q113 (C) · CEB-2022-PETROBRAS-CD-Q115 (C) · CEB-2022-PETROBRAS-CD-Q069 (E) |
| **Código que “quase” funciona** | `read_csv` sem `header=None` em arquivo sem cabeçalho; `fit()` descrito como avaliação em teste | CEB-2022-PETROBRAS-CD-Q093 (E) · CEB-2022-PETROBRAS-CD-Q094 (E) · CEB-2022-PETROBRAS-CD-Q078 (E) |
| **SQL com detalhe errado** | junção/filtro que não entrega o pedido | CEB-2022-PETROBRAS-CD-Q097 (E) |

> [!WARNING]
> **Anulações**: 8 de 70 itens (11%) da Petrobras 2022 foram anulados (os motivos oficiais não estão no banco). O Cebraspe anula itens com mais de uma interpretação ou com erro material, então os itens gerados pelo Claude devem ter **uma única** interpretação.

## 4. Como cada disciplina é cobrada (Ciência de Dados)

| Disciplina (edital CGU) | Estilo predominante | Exemplos |
|---|---|---|
| `EP` Estatística, Programação e Análise de Dados | conta curta, leitura de boxplot/histograma, trecho de Python/pandas/numpy | CEB-2022-PETROBRAS-CD-Q059, CEB-2022-PETROBRAS-CD-Q086, CEB-2022-PETROBRAS-CD-Q108 |
| `ED` Engenharia, Arquitetura e Governança de Dados | MER + `create table`, consulta SQL, NoSQL, HDFS | CEB-2022-PETROBRAS-CD-Q096, CEB-2022-PETROBRAS-CD-Q098, CEB-2022-PETROBRAS-CD-Q099 |
| `ML` Aprendizado de Máquina e IA | conceito com uma peça trocada; gráfico viés × variância; métricas | CEB-2022-PETROBRAS-CD-Q054, CEB-2022-PETROBRAS-CD-Q057, CEB-2022-PETROBRAS-CD-Q066 |
| `OP` Operação, Governança e Gestão (MLOps) | situação hipotética curta (nuvem, container, CI/CD) | CEB-2022-PETROBRAS-CD-Q117, CEB-2022-PETROBRAS-CD-Q119, CEB-2022-PETROBRAS-CD-Q120 |
| P1/P2 (básicos e complementares) | ainda sem questões no banco | — |

> [!NOTE] Verificar:
> A CGU 2026 é o primeiro concurso da carreira com o Cebraspe (ver `concursos/cgu-affc/revisao/provas-cebraspe.md`). O edital é bem mais voltado a **governança, uso responsável de IA, LLMs e controle** do que a Petrobras 2022. Tópicos como ML.5.3–ML.6.4 (LLMs, agentes), OP.3 (governança) e OP.5 (contratação) **não têm questão real no banco ainda**. Para eles, gerar questões INÉDITAS seguindo os padrões acima e avisar isso.

## 5. Checklist para um item gerado parecer Cebraspe
- [ ] Comando no estilo “Considerando…, julgue os itens a seguir.” / “Acerca de…, julgue o próximo item.”
- [ ] Afirmação única, julgável como C ou E sem ambiguidade; sem “marque a alternativa”.
- [ ] Se E: **uma** peça trocada (papel, sentido, condição, número) dentro de um texto que, fora isso, está correto.
- [ ] Terminologia em português com o termo em inglês em itálico (*overfitting*, *bias*, *ensemble*).
- [ ] Situação hipotética ligada a órgão público ou controle quando fizer sentido (perfil CGU).
- [ ] Gabarito separado, comentado, com tópico do edital e link para a nota.
