# 🔎 Acervo — Aprendizado de Máquina e Inteligência Artificial

> P3 · Conhecimentos específicos · Pasta de notas: `disciplinas/aprendizado-de-maquina-e-ia/` (ainda sem notas)

## 🧭 Como estudar

- Supervisionado × não supervisionado; viés-variância; validação cruzada; métricas (precisão, recall, F1, AUC) e matriz de confusão.
- Redes neurais e Transformers: entenda atenção, embeddings, RAG e limites (alucinação, injeção de prompt).
- Agentes: ferramentas, limites de autonomia e avaliação.

## 📚 Fontes curadas

- 📄 [ISLP — An Introduction to Statistical Learning (livro gratuito)](https://www.statlearning.com/)
- 🎓 [Google — Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
- 🎓 [scikit-learn — User Guide](https://scikit-learn.org/stable/user_guide.html)
- ▶️ [3Blue1Brown — série sobre redes neurais](https://www.youtube.com/@3blue1brown)
- ▶️ [Andrej Karpathy — Neural Networks: Zero to Hero](https://www.youtube.com/@AndrejKarpathy)
- 🎓 [Hugging Face — curso de LLM/NLP](https://huggingface.co/learn/llm-course)
- 📄 [Attention Is All You Need (Transformer)](https://arxiv.org/abs/1706.03762)
- 📄 [Retrieval-Augmented Generation (RAG) — artigo original](https://arxiv.org/abs/2005.11401)
- 📰 [Anthropic — Building effective agents](https://www.anthropic.com/research/building-effective-agents)
- 📰 [OWASP — Top 10 para aplicações com LLM](https://genai.owasp.org/llm-top-10/)

## 🗂️ Por tópico do edital

Para cada item: vídeos do YouTube, PDFs e artigos reais (links diretos, de `fontes.json`) e questões reais do banco.

### 1 Seleção e construção de modelos

- **1.1** Aprendizado supervisionado e não supervisionado; noções e limites de abordagens semissupervisionadas e por reforço
  - ▶️ [O que é Aprendizado Supervisionado x Não Supervisionado (Machine Learning - Aula 6)](https://www.youtube.com/watch?v=JDDqP6IZ4NQ) — Didática Tech
  - ▶️ [Supervised vs Unsupervised vs Semi / Self Supervised vs Reinforcement Learning | Machin…](https://www.youtube.com/watch?v=2Z1B0xESzMw) — Ciara Feely
  - ▶️ [O Aprendizado Não Supervisionado e a Base Teórica do K Means](https://www.youtube.com/watch?v=q05qbU8FYKU) — Hashtag Programação
  - 📄 [Introdução ao Aprendizado de Máquina (LPS/USP)](http://www.lps.usp.br/hae/apostila/introaprend-ead.pdf) — PDF
  - 📄 [Aprendizado semissupervisionado (Fabricio Breve, ICMC-USP)](https://www.fabriciobreve.com/artigos/slides/Aprendizado%20Semi-Supervisionado%20em%20Redes%20Complexas.pdf) — PDF
  - 📰 [Aprendizado supervisionado x não supervisionado (Google Cloud)](https://cloud.google.com/discover/supervised-vs-unsupervised-learning) — artigo
  - 📰 [Introdução ao aprendizado por reforço (IME-USP)](https://linux.ime.usp.br/~scaroni/rlsummer/aula1.pdf) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q079](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q079.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q092](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q092.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q093](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q093.md) — questão real · Banca Cebraspe
- **1.2** Regressão, classificação, agrupamento, redução de dimensionalidade e detecção de anomalias; regularização, ensembles, sobreajuste e subajuste; comparação com soluções simples
  - ▶️ [O que são problemas de Classificação e de Regressão? (Machine Learning - Aula 7)](https://www.youtube.com/watch?v=rDIocV_r9Xk) — Didática Tech
  - ▶️ [Anomaly Detection with Isolation Forests using Python and Scikit-learn](https://www.youtube.com/watch?v=s0Y5PaVnAWU) — Alister Luiz
  - ▶️ [Ensemble Learning Techniques Voting Bagging Boosting Random Forest Stacking in ML by  M…](https://www.youtube.com/watch?v=eNyUfpGBLts) — Mahesh Huddar
  - 📄 [Aprendizado de Máquina A (UFMG)](https://dcc.ufmg.br/wp-content/uploads/Aprendizado-de-maquina-A.pdf) — PDF
  - 📄 [Aprendizado de máquina: uma abordagem estatística — Izbicki](https://rafaelizbicki.com/AME.pdf) — PDF
  - 📰 [Viés, variância e regularização (DEV)](https://dev.to/giselyalves13/vies-variancia-e-regularizacao-2me7) — artigo
  - 📰 [Random Forest (LAMFO/UnB)](https://lamfo-unb.github.io/2020/07/08/Random-Forest/) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q056](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q056.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2022-PETROBRAS-CD-Q057](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q057.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2022-PETROBRAS-CD-Q058](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q058.md) — questão real · Banca Cebraspe

### 2 Validação e generalização

- **2.1** Separação de treino, validação e teste
  - ▶️ [Divisão da base de dados em treino e teste](https://www.youtube.com/watch?v=w8fSlD8H6F4) — Tutoriais de Programação
  - ▶️ [Princípios de separação de dados em treino, validação, teste e reamostragens](https://www.youtube.com/watch?v=R5c8S61balo) — Carvalho Ribeiro
  - ▶️ [Como dividir dados em conjunto de treino e conjunto de testes - train_test_split - Python](https://www.youtube.com/watch?v=y0NHzMEanIU) — Papa Thalyson
  - 📄 [Treinando, testando e selecionando (UFSC)](https://geam.paginas.ufsc.br/files/2020/02/train-test-select.pdf) — PDF
  - 📄 [Avaliando o que foi aprendido (UFPR)](https://www.inf.ufpr.br/aurora/disciplinas/datamining/avalia.pdf) — PDF
  - 📰 [Overfitting — Machine Learning Crash Course (Google)](https://developers.google.com/machine-learning/crash-course/overfitting/overfitting?hl=pt-br) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q055](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q055.md) — questão real · Banca Cebraspe
- **2.2** Validação cruzada e temporal
  - ▶️ [Cross-Validation for Time Series Forecasting | Python Tutorial](https://www.youtube.com/watch?v=1rZpbvSI26c) — Egor Howell
  - ▶️ [Forecasting Principles & Practice: 5.10 Time series cross-validation](https://www.youtube.com/watch?v=OGpENuxjRWM) — OTexts
  - 📄 [Métodos de validação tradicional e temporal (USP)](https://teses.usp.br/teses/disponiveis/95/95131/tde-19052018-122805/publico/CostaSaClebiano2018.pdf) — PDF
  - 📄 [Estudo comparativo de técnicas de validação cruzada (USP)](https://teses.usp.br/teses/disponiveis/45/45133/tde-26082019-220647/publico/Dissertacao_JoaoPauloZanola.pdf) — PDF
  - 📰 [Cross-validation — documentação do scikit-learn](https://scikit-learn.org/stable/modules/cross_validation.html) — artigo
  - 📰 [Guia abrangente de validação cruzada K-Fold (DataCamp)](https://www.datacamp.com/tutorial/k-fold-cross-validation) — artigo
- **2.3** Vazamento de informação
  - ▶️ [What is Data Leakage In Machine Learning?](https://www.youtube.com/watch?v=n9jz7G68pVg) — Krish Naik
  - ▶️ [Dados de Treino e Teste (Introdução a Machine Learning - Aula 3)](https://www.youtube.com/watch?v=N2TT2Q83abc) — Didática Tech
  - 📄 [Hidden Leaks in Time Series Forecasting: vazamento de dados (arXiv)](https://arxiv.org/pdf/2512.06932) — PDF
  - 📰 [Pipelines no Scikit-Learn: transformações sem data leakage (Sigmoidal)](https://sigmoidal.ai/pipelines-scikit-learn/) — artigo
  - 📰 [Combinatorial Purged Cross Validation — vazamento no K-fold](https://medium.com/@balemar/combinatorial-purged-cross-validation-48fc748d006e) — artigo
- **2.4** Viés e variância
  - ▶️ [O tradeoff de viés e variância (bias-variance tradeoff) - Perguntas de Entrevista - D…](https://www.youtube.com/watch?v=F0mLg9WQUJo) — Data Hackers
  - ▶️ [O trade-off entre Viés e Variância](https://www.youtube.com/watch?v=IGL3T9NjtIY) — Muri Tech
  - 📄 [Aprendizado de máquina: uma abordagem estatística — Izbicki (viés e variância)](https://rafaelizbicki.com/AME.pdf) — PDF
  - 📰 [Overfitting, underfitting e o trade-off viés-variância (Data Hackers)](https://medium.com/data-hackers/overfitting-underfitting-e-o-trade-off-vi%C3%A9s-vari%C3%A2ncia-275167d5ecdb) — artigo
  - 📰 [Viés–Variância: por que um modelo que se ajusta melhor pode ser pior?](https://alexandrelevada.substack.com/p/viesvariancia-por-que-um-modelo-que) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q054](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q054.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2022-PETROBRAS-CD-Q056](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q056.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2022-PETROBRAS-CD-Q057](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q057.md) — questão real · Banca Cebraspe
- **2.5** Generalização e estabilidade dos resultados
  - ▶️ [Understanding Model Generalization in Machine Learning](https://www.youtube.com/watch?v=QfDVCrDMbfg) — Speak Fluent English Now
  - 📄 [Treinando, testando e selecionando (UFSC)](https://geam.paginas.ufsc.br/files/2020/02/train-test-select.pdf) — PDF
  - 📰 [Overfitting e generalização — Machine Learning Crash Course (Google)](https://developers.google.com/machine-learning/crash-course/overfitting/overfitting?hl=pt-br) — artigo
  - 📰 [O modelo bem ajustado: entre o underfitting e o overfitting](https://www.blog.psicometriaonline.com.br/o-caminho-para-um-modelo-bem-ajustado/) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q054](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q054.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q116](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q116.md) — questão real · Banca Cebraspe
- **2.6** Comparação de modelos e adequação ao uso pretendido
  - ▶️ [COMPARANDO MODELOS DE MACHINE LEARNING!!](https://www.youtube.com/watch?v=_Y1SWuKr4Tg) — Téo Me Why
  - 📄 [Avaliando o que foi aprendido (UFPR)](https://www.inf.ufpr.br/aurora/disciplinas/datamining/avalia.pdf) — PDF
  - 📰 [Cross-validation: avaliando o desempenho de estimadores (scikit-learn)](https://scikit-learn.org/stable/modules/cross_validation.html) — artigo
  - 📰 [Como escolher um modelo de Machine Learning (viés × variância)](https://medium.com/@marcelohfms73/trade-off-vi%C3%A9s-x-vari%C3%A2ncia-e-overfitting-como-escolher-um-modelo-de-machine-learning-84a7a5e9b79a) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q066](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q066.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-DISC01](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-disc01.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q112](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q112.md) — questão real · Banca Cebraspe

### 3 Métricas e efeitos das decisões

- **3.1** Precisão, sensibilidade, especificidade, calibração e métricas de regressão
  - ▶️ [ROC and AUC, Clearly Explained!](https://www.youtube.com/watch?v=4jRBRDbJemM) — StatQuest with Josh Starmer
  - ▶️ [Model Calibration | Machine Learning](https://www.youtube.com/watch?v=hWb-MIXKe-s) — TwinEd Productions
  - 📄 [Métricas de desempenho: classificação (UFSC)](https://geam.paginas.ufsc.br/files/2020/02/Metricas-desempenho-classificacao2-1.pdf) — PDF
  - 📰 [CS 229 — dicas e truques de aprendizado de máquina (Stanford, em português)](https://web.stanford.edu/~shervine/l/pt/teaching/cs-229/dicas-truques-aprendizado-maquina/) — artigo
  - 📰 [Métricas de avaliação para modelos de regressão (Alura)](https://www.alura.com.br/artigos/metricas-de-regressao) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q052](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q052.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2022-PETROBRAS-CD-Q053](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q053.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-DISC01](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-disc01.md) — questão real · Banca Cebraspe
- **3.2** Custos dos falsos positivos e falsos negativos
  - ▶️ [Curva Precisão-Recall](https://www.youtube.com/watch?v=b2almKPOD-A) — ProfDanilo_DS
  - ▶️ [False Positive (FP) versus False Negative (FN) errors based on Probability Thresholds](https://www.youtube.com/watch?v=uPElOCH79qQ) — Saniya Khullar
  - 📄 [Métricas de desempenho: classificação (UFSC)](https://geam.paginas.ufsc.br/files/2020/02/Metricas-desempenho-classificacao2-1.pdf) — PDF
  - 📰 [Matriz de Confusão: como utilizar para análise de modelos (DataGeeks)](https://www.datageeks.com.br/matriz-de-confusao/) — artigo
  - 📰 [Métricas de avaliação: acurácia, precisão, recall](https://vitorborbarodrigues.medium.com/m%C3%A9tricas-de-avalia%C3%A7%C3%A3o-acur%C3%A1cia-precis%C3%A3o-recall-quais-as-diferen%C3%A7as-c8f05e0a513c) — artigo
- **3.3** Desempenho por grupos, discriminação e incerteza
  - ▶️ [Introduction to Algorithm Fairness | Causes, Measuring & Preventing Unfairness in Machi…](https://www.youtube.com/watch?v=3UcSq1dGW2c) — A Data Odyssey
  - ▶️ [Discriminação algorítmica e justiça social](https://www.youtube.com/watch?v=5MAH1hg7hXg) — Instituto Humanitas Unisinos – IHU
  - ▶️ [Incerteza em Machine Learning - Roberto Silveira](https://www.youtube.com/watch?v=jN2oGoLVlDo) — Machine Learning Porto Alegre
  - 📄 [IA, Direito e equidade algorítmica: discriminações em modelos de ML](https://www.researchgate.net/publication/366697521_Inteligencia_artificial_Direito_e_equidade_algoritmica_discriminacoes_sociais_em_modelos_de_machine_learning_para_a_tomada_de_decisao) — PDF
  - 📰 [Todos são iguais perante o algoritmo? Discriminação algorítmica (IDP)](https://www.portaldeperiodicos.idp.edu.br/direitopublico/article/view/5869) — artigo
  - 📰 [Discriminação algorítmica (Migalhas)](https://www.migalhas.com.br/depeso/442736/discriminacao-algoritmica) — artigo
- **3.4** Explicabilidade e interpretabilidade
  - ▶️ [Explainable AI Made Easy: SHAP, LIME & PFI with Hands-On Coding](https://www.youtube.com/watch?v=YZwDizPBFaM) — Code With Swapna
  - ▶️ [QUAL É A VARIÁVEL MAIS IMPORTANTE - MACHINE LEARNING](https://www.youtube.com/watch?v=cNd6JUzyVMM) — Eduardo | Ciência dos Dados
  - 📄 [IA explicável para reduzir a assimetria de informação (Redin)](https://seer.faccat.br/index.php/redin/article/view/3538/2143) — PDF
  - 📰 [Interpretabilidade de modelos de ML e IA (Data Science Academy)](https://blog.dsacademy.com.br/interpretabilidade-de-modelos-de-machine-learning-e-ia/) — artigo
  - 📰 [Explicabilidade em modelos de IA: LIME e SHAP (Gran Cursos)](https://blog.grancursosonline.com.br/explicabilidade-em-modelos-de-ia-fundamentos-tecnicos-lime-shap-e-praticas-de-implementacao/) — artigo
- **3.5** Limites do uso de escores para priorização e tomada de decisão
  - ▶️ [Credit Scoring Models : example and explanation of an expert score card model in Excel](https://www.youtube.com/watch?v=qBv78M_fU9M) — Stachanov Holding B.V.
  - 📄 [Modelos preditivos para priorização em auditoria financeira (TCU, 2025)](https://sites.tcu.gov.br/recursos/trabalhos-pos-graduacao/pdfs/CGAF_CandiceEscorcio_TCC_2025.pdf) — PDF
  - 📄 [Detecção de anomalias fiscais no setor de combustíveis (UFPE)](https://repositorio.ufpe.br/bitstream/123456789/71260/1/DISSERTA%C3%87%C3%83O%20Joao%20Alexandre%20Beltrao%20Alves.pdf) — PDF
  - 📰 [Modelagem preditiva para priorização de inconsistências fiscais (E&S Journal)](https://revistaes.com.br/artigos/modelagem-preditiva-para-priorizacao-de-inconsistencias-fiscais-a-partir-do-balancete-da-ecd?lang=en) — artigo

### 4 Redes neurais

- **4.1** Perceptron e redes multicamadas
  - ▶️ [A primeira REDE NEURAL PROFUNDA🤖: Perceptron Multicamada 🦿 | Redes Neurais e Deep Learn…](https://www.youtube.com/watch?v=e5nC31i7nVY) — Universo Discreto
  - ▶️ [Redes Neurais Artificiais #02: Perceptron - Part I](https://www.youtube.com/watch?v=xGShRYE55uM) — Machine Learning para humanos
  - ▶️ [O Perceptron - A Estrutura Base de Redes Neurais e Deep Learning](https://www.youtube.com/watch?v=6jvngmjvsOg) — Hashtag Programação
  - 📄 [Redes neurais — Perceptrons de múltiplas camadas II (UFF)](https://www.professores.uff.br/jmarcos/wp-content/uploads/sites/112/2017/08/aula4.pdf) — PDF
  - 📄 [Apostila de redes neurais (UNESP)](https://www.feis.unesp.br/Home/departamentos/engenhariaeletrica/pos-graduacao/apostila-redes-neurais-anna-diva_minussi.pdf) — PDF
  - 📰 [Perceptron multicamadas (Wikipédia)](https://pt.wikipedia.org/wiki/Perceptron_multicamadas) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q070](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q070.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2022-PETROBRAS-CD-Q071](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q071.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q087](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q087.md) — questão real · Banca Cebraspe
- **4.2** Funções de ativação e perda, otimização, retropropagação e regularização em nível conceitual e de interpretação de resultados
  - ▶️ [Dropout - Regularizando sua Rede Neural](https://www.youtube.com/watch?v=gppAMo4mNZ0) — Sandeco
  - ▶️ [Deep Learning by Hand for Beginners (Part 2 - Backpropagation & Gradient Descent)](https://www.youtube.com/watch?v=DHUQ9yiYMYM) — Thu Vu
  - 📄 [Introdução à Inteligência Computacional — apostila (INPE)](https://www.inpe.br/elac2018/arquivos/ELAC2018_MC3_apostila.pdf) — PDF
  - 📄 [Redes neurais — backpropagation (PUC-Rio)](https://www.maxwell.vrac.puc-rio.br/7587/7587_5.PDF) — PDF
  - 📰 [Apostila de Perceptron e Multilayer Perceptron](https://www.researchgate.net/publication/395103664_Apostila_de_Perceptron_e_Multilayer_Perceptron) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q071](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q071.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2022-PETROBRAS-CD-Q072](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q072.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2022-PETROBRAS-CD-Q073](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q073.md) — questão real · Banca Cebraspe
- **4.3** Redes convolucionais, recorrentes e transformers
  - ▶️ [Convolutional Neural Networks Explained (CNN Visualized)](https://www.youtube.com/watch?v=pj9-rr1wDhM) — Futurology — An Optimistic Future
  - ▶️ [ENTENDA REDES NEURAIS RECORRENTES (RNN) | Redes Neurais e Deep Learning 11](https://www.youtube.com/watch?v=lrAT0oEfvIg) — Universo Discreto
  - ▶️ [Modelo Transformer | Mecanismo de atenção: Self-Attention | Deep Learning e NLP | Leona…](https://www.youtube.com/watch?v=9pEUkg_VHqg) — Aprendiz do Futuro
  - 📄 [A Nova Eletricidade: aplicações, riscos e tendências da IA moderna](https://arxiv.org/pdf/2310.18324) — PDF
  - 📰 [Transformadores: o estado da arte em PLN (Deep Learning Book)](https://www.deeplearningbook.com.br/transformadores-o-estado-da-arte-em-processamento-de-linguagem-natural/) — artigo
  - 📰 [Redes neurais: o que são e qual sua importância (SAS)](https://www.sas.com/pt_br/insights/analytics/neural-networks.html) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q074](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q074.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2022-PETROBRAS-CD-Q076](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q076.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2022-PETROBRAS-CD-Q077](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q077.md) — questão real · Banca Cebraspe
- **4.4** Adequação ao tipo de dado, custo, limitações e alternativas
  - ▶️ [DEEP LEARNING EXPLICADO](https://www.youtube.com/watch?v=ggmDI9_fm54) — Ciência Todo Dia
  - ▶️ [What is Deep Learning? (DL 01)](https://www.youtube.com/watch?v=DrhJLHiia7g) — Professor Bryce
  - ▶️ [Qual a diferença entre Inteligência Artificial, Machine Learning, Data Science, Deep Le…](https://www.youtube.com/watch?v=ccZ2pyr3YDw) — Filipe Deschamps
  - 📄 [A Nova Eletricidade: aplicações, riscos e tendências da IA moderna](https://arxiv.org/pdf/2310.18324) — PDF
  - 📰 [Rede neural recorrente (Wikipédia)](https://pt.wikipedia.org/wiki/Rede_neural_recorrente) — artigo
  - 📰 [Transformadores (Deep Learning Book)](https://www.deeplearningbook.com.br/transformadores-o-estado-da-arte-em-processamento-de-linguagem-natural/) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q079](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q079.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q087](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q087.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q120](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q120.md) — questão real · Banca Cebraspe
- **4.5** Transferência de aprendizado e ajuste de modelos
  - ▶️ [Como treinar modelos LLM com FINE-TUNING usando LORA e PYTHON!](https://www.youtube.com/watch?v=RGfNf9QrJ8E) — DataWay
  - ▶️ [O que é Transfer Learning? - Deep Learning / Aprendizado Profundo | Leonardo Ribeiro](https://www.youtube.com/watch?v=sKNnNblRvCY) — Aprendiz do Futuro
  - ▶️ [What is Transfer Learning?](https://www.youtube.com/watch?v=BqqfQnyjmgg) — Hugging Face
  - 📄 [Ajuste fino de modelos Transformers com PEFT](https://ainews.net.br/wp-content/uploads/2025/01/Ajuste-fino-de-modelos-Transformers-atraves-de-tecnicas-PEFT-Parameter-Efficient-Fine-Tuning.pdf) — PDF
  - 📄 [Análise de técnicas de Transfer Learning (UFPE)](https://www.cin.ufpe.br/~tg/2019-1/TG_CC/tg_lsa2.pdf) — PDF
  - 📰 [Fine-tuning eficiente de modelos de linguagem (SBRC/SBC)](https://sol.sbc.org.br/index.php/sbrc/article/download/35127/34918/) — artigo

### 5 Linguagem natural e modelos generativos

- **5.1** Pré-processamento e classificação de textos
  - ▶️ [NLP Text Preprocessing: Tokenization, Stop Words, & Case Normalization Explained](https://www.youtube.com/watch?v=Cg1GyFw7o8Y) — SH AI Academy
  - ▶️ [Machine Learning - Classificação de textos com Python](https://www.youtube.com/watch?v=uJpU0rYUokM) — Manual do Machine Learning
  - ▶️ [Classificação de texto - Machine Learning - Python](https://www.youtube.com/watch?v=4_hLIxBeblA) — Italo Marcelo
  - 📄 [Abordagens de PLN e aprendizado profundo (UFU)](https://repositorio.ufu.br/bitstream/123456789/44590/1/AbordagensProcessamentoLinguagem.pdf) — PDF
  - 📄 [Classificação automática de texto (USP)](https://www.teses.usp.br/teses/disponiveis/3/3141/tde-06072014-225124/publico/Diss_FabricioCatae.pdf) — PDF
  - 📰 [Estudo comparativo de modelos de classificação textual (UFAM)](https://riu.ufam.edu.br/bitstream/prefix/6934/2/TCC_FelipeGusm%C3%A3o.pdf) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q081](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q081.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2022-PETROBRAS-CD-Q083](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q083.md) — questão real · Banca Cebraspe
- **5.2** Representações vetoriais, embeddings e similaridade semântica
  - ▶️ [Cosine Similarity Explained Visually | Vector Search Course #7](https://www.youtube.com/watch?v=T5bZiVcX3t8) — Engineering Visualized
  - ▶️ [Unifying the Cosine Similarity & Euclidian Distance | Vector Search | Snowflake Postgres](https://www.youtube.com/watch?v=_oAS1yBMguw) — Knowledge Amplifier
  - 📄 [Embeddings e PLN (UFU)](https://repositorio.ufu.br/bitstream/123456789/44590/1/AbordagensProcessamentoLinguagem.pdf) — PDF
  - 📄 [Word embeddings e similaridade semântica (UFPE)](https://www.cin.ufpe.br/~tg/2018-2/TG_CC/tg_mhc.pdf) — PDF
  - 📰 [Word embeddings: LSA, Word2Vec, GloVe (UFPE)](https://www.cin.ufpe.br/~tg/2018-2/TG_CC/tg_mhc.pdf) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q082](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q082.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2022-PETROBRAS-CD-Q083](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q083.md) — questão real · Banca Cebraspe
- **5.3** Modelos de linguagem e LLMs
  - ▶️ [Como o chatGPT funciona: Modelos de Linguagem em Larga Escala (LLM).](https://www.youtube.com/watch?v=0tRJJWi9bGc) — As Línguas e o Mundo
  - ▶️ [How Large Language Models Work](https://www.youtube.com/watch?v=5sLYAQS9sWQ) — IBM Technology
  - ▶️ [O que é uma LLM (grandes modelos de linguagem)?](https://www.youtube.com/watch?v=3oXTD8ydeDc) — Horizonte Digital
  - 📄 [A ascensão dos Large Language Models (Management Solutions)](https://www.managementsolutions.com/sites/default/files/minisite/static/72b0015f-39c9-4a52-ba63-872c115bfbd0/llm/pdf/ascensao-dos-llm.pdf) — PDF
  - 📰 [Transformadores: o estado da arte em PLN (Deep Learning Book)](https://www.deeplearningbook.com.br/transformadores-o-estado-da-arte-em-processamento-de-linguagem-natural/) — artigo
  - 📝 [CEB-2025-ANM-CD-Q090](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q090.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q093](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q093.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q095](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q095.md) — questão real · Banca Cebraspe
- **5.4** Prompts, recuperação de informação para geração de respostas e ajuste de modelos
  - ▶️ [What is Retrieval-Augmented Generation (RAG)?](https://www.youtube.com/watch?v=T-D1OfcDW1M) — IBM Technology
  - ▶️ [Engenharia de Prompt: O Guia Definitivo](https://www.youtube.com/watch?v=1VDcke66TRE) — Bruno Picinini
  - ▶️ [Como treinar modelos LLM com FINE-TUNING usando LORA e PYTHON!](https://www.youtube.com/watch?v=RGfNf9QrJ8E) — DataWay
  - 📄 [A ascensão dos LLMs — prompts e ajuste fino (Management Solutions)](https://www.managementsolutions.com/sites/default/files/minisite/static/72b0015f-39c9-4a52-ba63-872c115bfbd0/llm/pdf/ascensao-dos-llm.pdf) — PDF
  - 📰 [Geração aumentada por recuperação — RAG (Wikipédia)](https://pt.wikipedia.org/wiki/Gera%C3%A7%C3%A3o_aumentada_por_recupera%C3%A7%C3%A3o) — artigo
  - 📰 [O que é RAG (Jornal da IA)](https://jornaldaia.com/glossario/o-que-e-rag) — artigo
  - 📝 [CEB-2025-ANM-CD-Q091](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q091.md) — questão real · Banca Cebraspe
- **5.5** Avaliação de respostas, fontes, alucinações e limitações
  - ▶️ [23.How to Evaluate LLMs: BLEU, BERTScore, LLM-as-a-Judge & Benchmarks](https://www.youtube.com/watch?v=o-bZc-Ba03M) — AI Academy
  - ▶️ [Alucinação em IA: Como evitar erros em Modelos de LLM](https://www.youtube.com/watch?v=LwByNcjIH74) — Sa e Lucas | AI Builders
  - 📄 [IA na tomada de decisão: riscos e verificação (RSD)](https://rsdjournal.org/rsd/article/download/51541/40441) — PDF
  - 📰 [O que é RAG — avaliação e limites (Jornal da IA)](https://jornaldaia.com/glossario/o-que-e-rag) — artigo
  - 📰 [RAG não elimina alucinação (Livros em Resumo)](https://livrosemresumo.com.br/noticias/rag-nao-elimina-alucinacao-o-que-ele-realmente-resolve-entenda-neste-artigo) — artigo

### 6 Agentes e uso seguro de ferramentas

- **6.1** Agentes de IA e integração com ferramentas e fontes
  - ▶️ [AI Agents, LLM, RAG e ChatGPT Explicados em 5 Minutos](https://www.youtube.com/watch?v=GZU3bPkjpTI) — Jornada de Dados - Luciano Vasconcelos
  - ▶️ [🤖 Introducción a los Agentes IA | LLM, RAG, Memoria, Tools y Context Engineering explic…](https://www.youtube.com/watch?v=CAJwValBbzQ) — Coffee & Data
  - ▶️ [Qué es un AGENTE IA de Inteligencia Artificial EXPLICADO FÁCIL](https://www.youtube.com/watch?v=V8Wb3aijSdc) — Alan Daitch
  - 📰 [What is the Model Context Protocol (MCP)? (Databricks)](https://www.databricks.com/blog/what-is-model-context-protocol) — artigo
  - 📰 [Model Context Protocol (MCP): o que é, quando usar e segurança](https://x-apps.com.br/mcp-model-context-protocol-guia/) — artigo
  - 📰 [Function Calling vs MCP: integrando ferramentas a agentes de IA](https://medium.com/@mdbaraujo/function-calling-vs-b0a49771b5a9) — artigo
- **6.2** Autorização, rastreabilidade e supervisão
  - ▶️ [Guardrails: IMPEÇA seu Agente de IA de falar besteira](https://www.youtube.com/watch?v=FV_P03nn_Vk) — Ronnald Hawk | Engenharia de IA
  - ▶️ [GuardRails: 8 Camadas de Segurança que Todo Agente de IA Precisa](https://www.youtube.com/watch?v=d4nTB8Vui3o) — Breno Vieira LionLab 
  - ▶️ [Why AI Agents Need A Human in the Loop Now](https://www.youtube.com/watch?v=cmEJ-5zYKHA) — IBM Technology
  - 📄 [Recomendações de governança para o uso de IA pelo poder público (Transparência Internacional)](https://www.transparencia.org.br/downloads/publicacoes/Recomendacoes_Governanca_Uso_IA_PoderPublico.pdf) — PDF
  - 📰 [MCP — permissões e segurança de agentes](https://x-apps.com.br/mcp-model-context-protocol-guia/) — artigo
- **6.3** Proteção contra instruções maliciosas em conteúdo externo, exposição de dados e uso indevido de ferramentas
  - ▶️ [The OWASP LLM Top 10 has a few surprises for you](https://www.youtube.com/watch?v=auS34nm9VAc) — IBM Technology
  - ▶️ [Prompt Injection in LLM Agents (ReAct, Langchain)](https://www.youtube.com/watch?v=43qfHaKh0Xk) — Donato Capitella
  - ▶️ [Attacking LLM - Prompt Injection](https://www.youtube.com/watch?v=Sv5OLj2nVAQ) — LiveOverflow
  - 📄 [OWASP Top 10 para aplicativos LLM v1.1 (português)](https://genai.owasp.org/wp-content/uploads/2024/05/OWASP-Top-10-for-LLM-Applications-v1_1_Portugese.pdf) — PDF
  - 📄 [Prompt injection em documentos judiciais (Migalhas)](https://arq.migalhas.com.br/arquivos/2026/5/183ba69f8e8d22_artigo-promptinjection(1).pdf) — PDF
  - 📰 [OWASP Top 10 for LLM Applications 2025](https://owasp.github.io/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf) — artigo
- **6.4** Avaliação dos resultados e limites de autonomia
  - ▶️ [The Secret to Making AI Agents 100% Reliable - Human in the Loop (n8n)](https://www.youtube.com/watch?v=CdnR-fNVPKI) — Nate Herk | AI Automation
  - ▶️ [Why AI Agents Need A Human in the Loop Now](https://www.youtube.com/watch?v=cmEJ-5zYKHA) — IBM Technology
  - ▶️ [How to Build Human-in-the-Loop for AI Agents (Practical Guide)](https://www.youtube.com/watch?v=7GOxUgVTz3s) — Dave Ebbelaar
  - 📄 [Recomendações de governança para o uso de IA pelo poder público](https://www.transparencia.org.br/downloads/publicacoes/Recomendacoes_Governanca_Uso_IA_PoderPublico.pdf) — PDF
  - 📰 [IA na tomada de decisão: supervisão humana e limites (RSD)](https://rsdjournal.org/rsd/article/download/51541/40441) — artigo
