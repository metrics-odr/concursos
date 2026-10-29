---
id: CEB-2025-ANM-CD-DISC01
tipo: discursiva
banca: Cebraspe
ano: 2025
orgao: ANM
cargo: Especialista em Recursos Minerais – Cargo 24
especialidade: Tecnologia da Informação – Ciência de Dados
cargo_alvo: analogo
topicos: [EP.5.1, ML.1.2, ML.2.6, ML.3.1]
gabarito: null
status: valida
fonte_pdf: questoes/_pdf/prova-cebraspe-16-02-2025-anm-especialista-ti-ciencia-de-dados.pdf
pagina: 7
linhas: 45
pontos: 30
---
**PROVA DISCURSIVA** (até 45 linhas · 30 pontos, dos quais até 1,5 para apresentação e estrutura textual)

> O processo de descoberta de conhecimento em bancos de dados (KDD) é fundamental para a identificação de padrões e tendências valiosas dentro de grandes volumes de dados. A cada dia, novas fontes de dados são geradas, o que torna a tarefa de extrair informações relevantes mais desafiadora. KDD é um processo iterativo que envolve várias etapas, desde a coleta e preparação dos dados até a interpretação e validação dos padrões descobertos. O processo de KDD é um esforço multidisciplinar que envolve técnicas de mineração de dados, estatística, aprendizado de máquina e conhecimento específico do domínio.
>
> Fayyad et al. *Knowledge Discovery and Data Mining: towards a unifying framework*, 1996 (tradução livre).

Considerando que o fragmento de texto acima tem caráter unicamente motivador, redija um texto dissertativo em atendimento ao que se pede a seguir.

1. Aborde duas das principais etapas do processo de KDD e a importância de cada uma delas. [valor: 10,00 pontos]
2. Descreva duas técnicas de mineração de dados utilizadas durante o processo de KDD. [valor: 10,00 pontos]
3. Explique como a interpretação e validação dos padrões descobertos impactam a utilidade do conhecimento extraído para a tomada de decisões. [valor: 8,50 pontos]

## Padrão de resposta definitivo (Cebraspe)
Fonte: `questoes/_pdf/gabarito-cebraspe-16-02-2025-anm-todos-os-cargos-definitivo.pdf` (cargo 24, prova discursiva). Resumo fiel:

**Etapas do KDD** (abordar duas, com a importância de cada):
| Etapa | O que é | Por que importa |
|---|---|---|
| Seleção | escolha dos dados relevantes para o objetivo | dados irrelevantes ou de baixa qualidade comprometem as demais etapas |
| Pré-processamento | limpeza e transformação: valores ausentes, normalização, remoção de outliers | dados adequados para a mineração, sem distorcer os resultados |
| Transformação | combinar/transformar em formatos adequados (agregação, redução de dimensionalidade) | prepara os dados para as análises seguintes |
| Mineração de dados | aplicar técnicas de aprendizado de máquina e estatística para achar padrões, associações e correlações | é onde surgem os padrões úteis |
| Interpretação e avaliação | analisar os resultados quanto à relevância e aplicabilidade | mostra o valor agregado e o alcance do conhecimento extraído |

**Técnicas de mineração** (descrever duas): classificação (atribuir rótulos/categorias — ex.: prever se o cliente compra) · *clustering* (não supervisionado, agrupa dados semelhantes) · regras de associação (“quem compra pão também compra leite”) · redução de dimensionalidade (PCA) · regressão (prever valores contínuos, ex.: vendas).

**Interpretação e validação** → determinam a utilidade prática: avaliar se os padrões são significativos, precisos e úteis no contexto; validar com testes (precisão, *recall*, F1-score; robustez das associações). Bem interpretados → decisões estratégicas (campanhas, produtos, processos); mal interpretados ou não validados → conclusões errôneas, decisões inadequadas e investimento perdido.

### Quesitos avaliados
| Quesito | Conceitos |
|---|---|
| 2.1 Etapas do KDD e importância | 0 a 6 — nota máxima: duas ou mais etapas corretas **e** a importância de cada |
| 2.2 Técnicas de mineração | 0 a 3 — nota máxima: duas técnicas descritas corretamente |
| 2.3 Interpretação e validação × tomada de decisão | 0 a 2 — nota máxima: explicação correta e consistente |

> [!TIP]
> Note que o padrão aceita **qualquer duas** das cinco etapas de Fayyad e **qualquer duas** técnicas: estruture em parágrafos “etapa → o que é → por que importa” para pontuar cada conceito.
