# 🔎 Acervo — Operação, Governança e Gestão de Soluções de Dados e IA

> P3 · Conhecimentos específicos · Pasta de notas: [`disciplinas/operacao-mlops-dados-ia/`](../../../disciplinas/operacao-mlops-dados-ia/)

## 🧭 Como estudar

- MLOps: versionamento (dados, código, modelo), registro de experimentos, CI/CD/CT, monitoramento de drift.
- Governança de IA: NIST AI RMF, documentação (model cards), contratação de soluções e plano de saída.

## 📚 Fontes curadas

- 📰 [Google Cloud — MLOps: pipelines de entrega contínua e automação (pt-BR)](https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning?hl=pt-br)
- 📰 [Google — Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)
- 📄 [Hidden Technical Debt in Machine Learning Systems (NeurIPS 2015)](https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems)
- 📄 [Model Cards for Model Reporting](https://arxiv.org/abs/1810.03993)
- 🎓 [MLflow — documentação (tracking, registry)](https://mlflow.org/docs/latest/index.html)
- 🎓 [DVC — versionamento de dados e modelos](https://dvc.org/doc)
- 📰 [NIST — AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- ⚖️ [Lei 14.133/2021 — Licitações e contratos (contratação de soluções)](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm)

## 🗂️ Por tópico do edital

Vídeos selecionados sobre cada tópico (YouTube) e atalhos de busca para PDFs, questões e artigos.

### 1 Ciclo de vida e MLOps

[📄 PDFs](https://www.google.com/search?q=Ciclo+de+vida+e+MLOps+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Ciclo+de+vida+e+MLOps+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Ciclo+de+vida+e+MLOps+concurso+resumo)

- **1.1** Versionamento de dados, código e modelos
  - ▶️ [Testando DVC para versionamento de dados e modelos de Machine Learning | (DataOps/MLOps)](https://www.youtube.com/watch?v=sHZr8EcOQYM) — Samuel Luz
  - ▶️ [Versioning Data with DVC (Hands-On Tutorial!)](https://www.youtube.com/watch?v=kLKBcPonMYw) — DVCorg
  - [📄 PDFs](https://www.google.com/search?q=Versionamento+de+dados+c%C3%B3digo+e+modelos+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Versionamento+de+dados+c%C3%B3digo+e+modelos+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Versionamento+de+dados+c%C3%B3digo+e+modelos+concurso+resumo)
- **1.2** Registro de experimentos
  - ▶️ [What is Experiment Tracking in Machine Learning? | MLFlow | Ashutosh Tripathi](https://www.youtube.com/watch?v=BiUBqv1QNOA) — Ashutosh Tripathi
  - ▶️ [DagsHub Learning: Experiment Tracking for Machine Learning with MLflow](https://www.youtube.com/watch?v=6h0tNCShmsU) — DagsHub
  - ▶️ [MLflow Tracking: Rastreie Seus Experimentos de Machine Learning - 02](https://www.youtube.com/watch?v=q5dRa4PRG6M) — PalancaCode
  - [📄 PDFs](https://www.google.com/search?q=Registro+de+experimentos+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Registro+de+experimentos+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Registro+de+experimentos+concurso+resumo)
- **1.3** Pipelines, testes e integração e entrega contínuas
  - ▶️ [MLOPS Github Action With CICD Pipeline One Shot Tutorial](https://www.youtube.com/watch?v=ciqWMIf7Pz0) — Krish Naik
  - ▶️ [Pipelines em Machine Learning | Criando linhas de produção para seus modelos](https://www.youtube.com/watch?v=wdnbxrPqbO0) — Let's Data
  - ▶️ [MLOps Tutorial#1. Continuous Integration (CI/CD) for ML Pipelines with Github Actions](https://www.youtube.com/watch?v=9I8X-3HIErc) — Data Science Garage
  - [📄 PDFs](https://www.google.com/search?q=Pipelines+testes+e+integra%C3%A7%C3%A3o+e+entrega+cont%C3%ADnuas+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Pipelines+testes+e+integra%C3%A7%C3%A3o+e+entrega+cont%C3%ADnuas+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Pipelines+testes+e+integra%C3%A7%C3%A3o+e+entrega+cont%C3%ADnuas+concurso+resumo)
- **1.4** Reprodutibilidade
  - ▶️ [Como montar seu ambiente de Ciência de Dados - Container Docker](https://www.youtube.com/watch?v=H6n9jQuExH0) — Diego Nogare
  - [📄 PDFs](https://www.google.com/search?q=Reprodutibilidade+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Reprodutibilidade+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Reprodutibilidade+concurso+resumo)
- **1.5** Disponibilização por APIs, implantação e reversão
  - ▶️ [How to Deploy a Machine Learning Model as a REST API with FastAPI in Python](https://www.youtube.com/watch?v=25ahE8RSQ60) — Onur Baltaci
  - ▶️ [Creating APIs For Machine Learning Models with FastAPI](https://www.youtube.com/watch?v=5PgqzVG9SCk) — NeuralNine
  - [📄 PDFs](https://www.google.com/search?q=Disponibiliza%C3%A7%C3%A3o+por+APIs+implanta%C3%A7%C3%A3o+e+revers%C3%A3o+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Disponibiliza%C3%A7%C3%A3o+por+APIs+implanta%C3%A7%C3%A3o+e+revers%C3%A3o+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Disponibiliza%C3%A7%C3%A3o+por+APIs+implanta%C3%A7%C3%A3o+e+revers%C3%A3o+concurso+resumo)
- **1.6** Monitoramento de mudanças nas distribuições, nas relações e no desempenho
  - ▶️ [Live #7: Como colocar modelos de Machine Learning em Produção](https://www.youtube.com/watch?v=fLtZGWCzQJQ) — Stack
  - ▶️ [Monitoramento de modelos: por quê monitorar, boas práticas e aprendizados | Nubank ML M…](https://www.youtube.com/watch?v=iAiY9L47eak) — Building Nubank
  - [📄 PDFs](https://www.google.com/search?q=Monitoramento+de+mudan%C3%A7as+nas+distribui%C3%A7%C3%B5es+nas+rela%C3%A7%C3%B5es+e+no+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Monitoramento+de+mudan%C3%A7as+nas+distribui%C3%A7%C3%B5es+nas+rela%C3%A7%C3%B5es+e+no+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Monitoramento+de+mudan%C3%A7as+nas+distribui%C3%A7%C3%B5es+nas+rela%C3%A7%C3%B5es+e+no+concurso+resumo)

### 2 Sustentação de soluções analíticas

[📄 PDFs](https://www.google.com/search?q=Sustenta%C3%A7%C3%A3o+de+solu%C3%A7%C3%B5es+anal%C3%ADticas+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Sustenta%C3%A7%C3%A3o+de+solu%C3%A7%C3%B5es+anal%C3%ADticas+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Sustenta%C3%A7%C3%A3o+de+solu%C3%A7%C3%B5es+anal%C3%ADticas+concurso+resumo)

- **2.1** Serviços gerenciados e operação própria
  - ▶️ [Cloud Computing Services Models - IaaS PaaS SaaS Explained](https://www.youtube.com/watch?v=36zducUX16w) — Ecourse Review
  - ▶️ [Cloud Computing Service Model - IaaS PaaS SaaS Explained | Types of Cloud Services | Si…](https://www.youtube.com/watch?v=boY2i6qhPr8) — Simplilearn
  - ▶️ [Cloud Computing Explained | IaaS SaaS PaaS](https://www.youtube.com/watch?v=lex-DYi1UpU) — CertBros
  - [📄 PDFs](https://www.google.com/search?q=Servi%C3%A7os+gerenciados+e+opera%C3%A7%C3%A3o+pr%C3%B3pria+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Servi%C3%A7os+gerenciados+e+opera%C3%A7%C3%A3o+pr%C3%B3pria+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Servi%C3%A7os+gerenciados+e+opera%C3%A7%C3%A3o+pr%C3%B3pria+concurso+resumo)
- **2.2** Requisitos de processamento, memória, armazenamento e aceleradores
  - ▶️ [GPU for Machine Learning Explained](https://www.youtube.com/watch?v=vcILiZMYpJo) — Saturn Cloud
  - [📄 PDFs](https://www.google.com/search?q=Requisitos+de+processamento+mem%C3%B3ria+armazenamento+e+aceleradores+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Requisitos+de+processamento+mem%C3%B3ria+armazenamento+e+aceleradores+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Requisitos+de+processamento+mem%C3%B3ria+armazenamento+e+aceleradores+concurso+resumo)
- **2.3** Custo, latência, disponibilidade e observabilidade de pipelines e inferência
  - ▶️ [Data Observability | Monitoração de Pipeline de dados com Grafana](https://www.youtube.com/watch?v=qQTBJ9Bylrg) — Meetup Engenharia de Dados
  - ▶️ [Exploring the Latency/Throughput & Cost Space for LLM Inference // Timothée Lacroix //…](https://www.youtube.com/watch?v=mYRqvB1_gRk) — AAIF Live
  - ▶️ [Same latency, 10x cheaper: cutting ML inference costs](https://www.youtube.com/watch?v=CcNIEALPkxc) — Hasgeek TV
  - [📄 PDFs](https://www.google.com/search?q=Custo+lat%C3%AAncia+disponibilidade+e+observabilidade+de+pipelines+e+infer%C3%AAncia+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Custo+lat%C3%AAncia+disponibilidade+e+observabilidade+de+pipelines+e+infer%C3%AAncia+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Custo+lat%C3%AAncia+disponibilidade+e+observabilidade+de+pipelines+e+infer%C3%AAncia+concurso+resumo)
- **2.4** Controle de acesso, proteção de segredos e continuidade das soluções
  - ▶️ [O que é Plano de Contingência - 4 minutos Sobre Negócios EP 02](https://www.youtube.com/watch?v=RQrltKWw_aM) — ProdutividadeMaxima
  - ▶️ [[#001] AWS IAM: Fundamentos do Controle de Acesso em Nuvem](https://www.youtube.com/watch?v=0mw9ditQg8I) — AprendaAWS
  - ▶️ [Plano de Continuidade de Negócios (PCN): O que é e por que sua empresa precisa dele?](https://www.youtube.com/watch?v=0mhl0_uQOLQ) — ISH Tecnologia
  - [📄 PDFs](https://www.google.com/search?q=Controle+de+acesso+prote%C3%A7%C3%A3o+de+segredos+e+continuidade+das+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Controle+de+acesso+prote%C3%A7%C3%A3o+de+segredos+e+continuidade+das+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Controle+de+acesso+prote%C3%A7%C3%A3o+de+segredos+e+continuidade+das+concurso+resumo)

### 3 Governança e responsabilidade

[📄 PDFs](https://www.google.com/search?q=Governan%C3%A7a+e+responsabilidade+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Governan%C3%A7a+e+responsabilidade+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Governan%C3%A7a+e+responsabilidade+concurso+resumo)

- **3.1** Papéis, riscos e evidências sobre dados, modelos e decisões
  - ▶️ [Governança de Inteligência Artificial: como reduzir riscos e definir o papel da IA no n…](https://www.youtube.com/watch?v=hglMeK5CDZ8) — Bridge & Co.
  - ▶️ [O que é um Data Steward? E por que ele é o guardião invisível dos seus dados](https://www.youtube.com/watch?v=3mNY8FAEjj8) — Paulo Cordeiro | Governança de Dados e IA
  - ▶️ [Governança de IA na Prática: Regras, Riscos e Decisões](https://www.youtube.com/watch?v=yhK0SnIlxFw) — LatamIA
  - [📄 PDFs](https://www.google.com/search?q=Pap%C3%A9is+riscos+e+evid%C3%AAncias+sobre+dados+modelos+e+decis%C3%B5es+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Pap%C3%A9is+riscos+e+evid%C3%AAncias+sobre+dados+modelos+e+decis%C3%B5es+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Pap%C3%A9is+riscos+e+evid%C3%AAncias+sobre+dados+modelos+e+decis%C3%B5es+concurso+resumo)
- **3.2** Rastreabilidade, avaliação de impacto, revisão humana e contestação
  - ▶️ [TUTORIAL RIPD - Relatório de Impacto à Proteção de Dados](https://www.youtube.com/watch?v=tkJzP0fCA2o) — Direito Connect
  - ▶️ [Como Fazer o Relatório de Impacto à Proteção de Dados: RIPD ou DPIA | WE209](https://www.youtube.com/watch?v=PFL2cL0KgUI) — Canal Tracker Segurança da Informação
  - ▶️ [Relatório de Impacto à Proteção de Dados Pessoais (RIPD/ PIA) na LGPD](https://www.youtube.com/watch?v=xBpJhYLIFRI) — Maria Godoy
  - [📄 PDFs](https://www.google.com/search?q=Rastreabilidade+avalia%C3%A7%C3%A3o+de+impacto+revis%C3%A3o+humana+e+contesta%C3%A7%C3%A3o+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Rastreabilidade+avalia%C3%A7%C3%A3o+de+impacto+revis%C3%A3o+humana+e+contesta%C3%A7%C3%A3o+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Rastreabilidade+avalia%C3%A7%C3%A3o+de+impacto+revis%C3%A3o+humana+e+contesta%C3%A7%C3%A3o+concurso+resumo)
- **3.3** Proteção de dados pessoais e informações sensíveis
  - ▶️ [DIREITO DIGITAL e LGPD (Resumo) - LEI GERAL DE PROTEÇÃO DE DADOS PESSOAIS | Privacidade…](https://www.youtube.com/watch?v=So9Lhgbq2sk) — Me Julga - Cíntia Brunelli
  - ▶️ [Dados Sensíveis - Hipóteses e restrições ao tratamento de Dados - Art. 11 LGPD - Vídeo 15](https://www.youtube.com/watch?v=JqhD5PMwGIc) — Simone Santinato
  - ▶️ [Lei nº 13.709 de 2018 - Lei Geral de Proteção de Dados (LGPD) - Conceitos e Característ…](https://www.youtube.com/watch?v=XbuniaIh_Tc) — Professor Raphael Pinho
  - [📄 PDFs](https://www.google.com/search?q=Prote%C3%A7%C3%A3o+de+dados+pessoais+e+informa%C3%A7%C3%B5es+sens%C3%ADveis+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Prote%C3%A7%C3%A3o+de+dados+pessoais+e+informa%C3%A7%C3%B5es+sens%C3%ADveis+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Prote%C3%A7%C3%A3o+de+dados+pessoais+e+informa%C3%A7%C3%B5es+sens%C3%ADveis+concurso+resumo)
- **3.4** Prevenção e tratamento de discriminação e de uso fora da finalidade
  - ▶️ [Webinar | Imersão em Direito e Tecnologia: Discriminação algorítmica](https://www.youtube.com/watch?v=CTFW9rbvp3I) — FGV
  - ▶️ [Discriminação Algorítmica e os Desafios da Ética Digital](https://www.youtube.com/watch?v=L_WCyFdJ_t8) — Faculdade Infnet
  - ▶️ [Discriminação algorítmica: desafios interdisciplinares | Programa Renascença](https://www.youtube.com/watch?v=Cuk53pR6RxY) — Diplomacia para Democracia
  - [📄 PDFs](https://www.google.com/search?q=Preven%C3%A7%C3%A3o+e+tratamento+de+discrimina%C3%A7%C3%A3o+e+de+uso+fora+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Preven%C3%A7%C3%A3o+e+tratamento+de+discrimina%C3%A7%C3%A3o+e+de+uso+fora+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Preven%C3%A7%C3%A3o+e+tratamento+de+discrimina%C3%A7%C3%A3o+e+de+uso+fora+concurso+resumo)
- **3.5** Avaliação de resultados e limites da automação
  - ▶️ [Automação de Processos e Decisões na Prática](https://www.youtube.com/watch?v=rF2vAn35GY8) — Maurício Bitencourt
  - ▶️ [Explicabilidade Algorítmica e Revisão de Decisões Automatizadas](https://www.youtube.com/watch?v=Cntu132CjUc) — Data Privacy Brasil
  - ▶️ [Decisões automatizadas ou por algoritmos: garantias jurídicas](https://www.youtube.com/watch?v=Qwt_QvhxOOk) — Mario Cruz
  - [📄 PDFs](https://www.google.com/search?q=Avalia%C3%A7%C3%A3o+de+resultados+e+limites+da+automa%C3%A7%C3%A3o+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Avalia%C3%A7%C3%A3o+de+resultados+e+limites+da+automa%C3%A7%C3%A3o+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Avalia%C3%A7%C3%A3o+de+resultados+e+limites+da+automa%C3%A7%C3%A3o+concurso+resumo)

### 4 Gestão de produtos de dados

[📄 PDFs](https://www.google.com/search?q=Gest%C3%A3o+de+produtos+de+dados+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Gest%C3%A3o+de+produtos+de+dados+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Gest%C3%A3o+de+produtos+de+dados+concurso+resumo)

- **4.1** Alinhamento entre problema público, produto e resultado
  - ▶️ [Estratégia para Produtos de Dados (Data Product)](https://www.youtube.com/watch?v=jFOYdqvCRvY) — FIA Business School - Labdata
  - ▶️ [What is a Data Product? Data Products Explained!](https://www.youtube.com/watch?v=soNK0iF23lg) — The Data and AI Guy
  - ▶️ [O QUE É UM PRODUTO DE DADOS?](https://www.youtube.com/watch?v=3z8nBoqudn0) — PPT Não Compila Tecnologia e Transformação Digital
  - [📄 PDFs](https://www.google.com/search?q=Alinhamento+entre+problema+p%C3%BAblico+produto+e+resultado+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Alinhamento+entre+problema+p%C3%BAblico+produto+e+resultado+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Alinhamento+entre+problema+p%C3%BAblico+produto+e+resultado+concurso+resumo)
- **4.2** Priorização, critérios de aceitação e indicadores
  - ▶️ [Priorização do Backlog e o Princípio de Pareto | Gestão Ágil](https://www.youtube.com/watch?v=QEglZ9va9Oc) — Mario Trentim | Estratégia em Açao
  - ▶️ [O QUE SÃO CRITÉRIOS DE ACEITE? 🐧 | AULA #15 | FUNDAMENTOS DE GESTÃO DE BACKLOG](https://www.youtube.com/watch?v=kPUqjX_qhL0) — CANAL VALOR
  - ▶️ [O que são CRITÉRIOS DE ACEITAÇÃO? | Felipe Franco](https://www.youtube.com/watch?v=dbnyG8XHM0c) — Felipe Franco
  - [📄 PDFs](https://www.google.com/search?q=Prioriza%C3%A7%C3%A3o+crit%C3%A9rios+de+aceita%C3%A7%C3%A3o+e+indicadores+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Prioriza%C3%A7%C3%A3o+crit%C3%A9rios+de+aceita%C3%A7%C3%A3o+e+indicadores+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Prioriza%C3%A7%C3%A3o+crit%C3%A9rios+de+aceita%C3%A7%C3%A3o+e+indicadores+concurso+resumo)
- **4.3** Descoberta de necessidades, entrega e ciclo de vida
  - ▶️ [CICLO DE VIDA DO PRODUTO DIGITAL | AULA 2 | FUNDAMENTOS DE PRODUCT DISCOVERY](https://www.youtube.com/watch?v=keIBhdIQKsk) — CANAL VALOR
  - ▶️ [COMO ENTENDER as NECESSIDADES dos CLIENTES | Product Discovery](https://www.youtube.com/watch?v=iN7aozlM_Lg) — Codando Sem Codar - Giampaolo Lepore
  - ▶️ [Ciclo de Vida do Produto Digital: Do MVP ao Growth (c/ Murylo Schulttais, Product Manag…](https://www.youtube.com/watch?v=evYiMsesTtE) — Tera
  - [📄 PDFs](https://www.google.com/search?q=Descoberta+de+necessidades+entrega+e+ciclo+de+vida+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Descoberta+de+necessidades+entrega+e+ciclo+de+vida+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Descoberta+de+necessidades+entrega+e+ciclo+de+vida+concurso+resumo)
- **4.4** Scrum e Kanban
  - ▶️ [Scrum vs Kanban - What's the Difference?](https://www.youtube.com/watch?v=rIaz-l1Kf8w) — Development That Pays
  - ▶️ [The Scrum Guide: FULL COURSE](https://www.youtube.com/watch?v=s3y95I79D_Q) — David McLachlan
  - ▶️ [The difference between Kanban and Scrum](https://www.youtube.com/watch?v=19dMPv0pOGE) — Darcy DeClute
  - [📄 PDFs](https://www.google.com/search?q=Scrum+e+Kanban+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Scrum+e+Kanban+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Scrum+e+Kanban+concurso+resumo)
- **4.5** Articulação com PDTIC, plano de transformação digital e plano de dados abertos
  - ▶️ [Dados Abertos: Conceito e Aplicações | Transmissão UFPE](https://www.youtube.com/watch?v=ESYlDPppdYw) — Canal UFPE
  - ▶️ [EP.35 - DADOS ABERTOS: TRANSPARÊNCIA E CONTROLE SOCIAL](https://www.youtube.com/watch?v=PMl_UQtsAwM) — Escola de Gestão e Contas
  - ▶️ [Plano Diretor de Tecnologia da Informação e Comunicação PDTIC.](https://www.youtube.com/watch?v=SSPnt7t_02o) — Luiz Fernando Pires Kozak
  - [📄 PDFs](https://www.google.com/search?q=Articula%C3%A7%C3%A3o+com+PDTIC+plano+de+transforma%C3%A7%C3%A3o+digital+e+plano+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Articula%C3%A7%C3%A3o+com+PDTIC+plano+de+transforma%C3%A7%C3%A3o+digital+e+plano+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Articula%C3%A7%C3%A3o+com+PDTIC+plano+de+transforma%C3%A7%C3%A3o+digital+e+plano+concurso+resumo)
- **4.6** Comunicação dos resultados e das incertezas aos usuários
  - ▶️ [Comunicação dos Resultados | Curso de Análise de Dados | Aula 07](https://www.youtube.com/watch?v=HIJeRSUUEKY) — Alexandre Polselli | Data Universe
  - ▶️ [Criando um Storytelling com Seus Dados](https://www.youtube.com/watch?v=nDNynBaLKRk) — Hashtag Programação
  - ▶️ [Storytelling com dados - Resumo do livro](https://www.youtube.com/watch?v=i1U8Zdoshw0) — Métricas Boss
  - [📄 PDFs](https://www.google.com/search?q=Comunica%C3%A7%C3%A3o+dos+resultados+e+das+incertezas+aos+usu%C3%A1rios+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Comunica%C3%A7%C3%A3o+dos+resultados+e+das+incertezas+aos+usu%C3%A1rios+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Comunica%C3%A7%C3%A3o+dos+resultados+e+das+incertezas+aos+usu%C3%A1rios+concurso+resumo)

### 5 Contratação e controle de soluções

[📄 PDFs](https://www.google.com/search?q=Contrata%C3%A7%C3%A3o+e+controle+de+solu%C3%A7%C3%B5es+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Contrata%C3%A7%C3%A3o+e+controle+de+solu%C3%A7%C3%B5es+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Contrata%C3%A7%C3%A3o+e+controle+de+solu%C3%A7%C3%B5es+concurso+resumo)

- **5.1** Estudo técnico preliminar e termo de referência
  - ▶️ [O Estudo Técnico Preliminar (ETP) na Nova Lei de Licitações](https://www.youtube.com/watch?v=qYtzMJFr6pw) — Professor Ricardo Ribas
  - ▶️ [Como montar um Termo de Referência - Nova Lei de Licitações](https://www.youtube.com/watch?v=wJIdtSRXWuk) — Professor Murilo Caldas
  - ▶️ [Termo de Referência - Lei 14.133/21](https://www.youtube.com/watch?v=Ract-xetINo) — Nova Licitação
  - [📄 PDFs](https://www.google.com/search?q=Estudo+t%C3%A9cnico+preliminar+e+termo+de+refer%C3%AAncia+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Estudo+t%C3%A9cnico+preliminar+e+termo+de+refer%C3%AAncia+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Estudo+t%C3%A9cnico+preliminar+e+termo+de+refer%C3%AAncia+concurso+resumo)
- **5.2** Viabilidade, dimensionamento e custo total de propriedade
  - ▶️ [Entenda o que é TCO: Custo Total de Propriedade](https://www.youtube.com/watch?v=wpoGABku51k) — FriendsLab
  - ▶️ [O passo a passo para fazer um estudo de viabilidade de uma obra](https://www.youtube.com/watch?v=-IEaf9Q5eCw) — Eng. Mariele
  - ▶️ [TCO (Custo Total de Propriedade) - Versão Português](https://www.youtube.com/watch?v=uJWNo2C5rvc) — Júlio Abud - Procurement/ Compras 360
  - [📄 PDFs](https://www.google.com/search?q=Viabilidade+dimensionamento+e+custo+total+de+propriedade+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Viabilidade+dimensionamento+e+custo+total+de+propriedade+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Viabilidade+dimensionamento+e+custo+total+de+propriedade+concurso+resumo)
- **5.3** Comparação entre desenvolvimento próprio, contratação e serviços de nuvem
  - ▶️ [Contratação de Serviços de Computação em Nuvem no setor público](https://www.youtube.com/watch?v=cwclZBDpcU0) — AWS Developers LATAM
  - ▶️ [Contratação e adoção de serviços de computação em nuvem no governo brasileiro](https://www.youtube.com/watch?v=C1wZcCMVR6k) — HDI Brasil
  - [📄 PDFs](https://www.google.com/search?q=Compara%C3%A7%C3%A3o+entre+desenvolvimento+pr%C3%B3prio+contrata%C3%A7%C3%A3o+e+servi%C3%A7os+de+nuvem+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Compara%C3%A7%C3%A3o+entre+desenvolvimento+pr%C3%B3prio+contrata%C3%A7%C3%A3o+e+servi%C3%A7os+de+nuvem+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Compara%C3%A7%C3%A3o+entre+desenvolvimento+pr%C3%B3prio+contrata%C3%A7%C3%A3o+e+servi%C3%A7os+de+nuvem+concurso+resumo)
- **5.4** Pesquisa de preços
  - ▶️ [5 maiores dúvidas sobre a Pesquisa de Preços na Nova Lei](https://www.youtube.com/watch?v=B1ILQtDx3Og) — Professor Ricardo Ribas
  - ▶️ [2025 | Pesquisa de Preço na Nova Lei de Licitações? O que mudou?  #lei14133 #licitacao…](https://www.youtube.com/watch?v=1W19O9_tGDk) — Via Jurídica I Empresa e Licitação
  - [📄 PDFs](https://www.google.com/search?q=Pesquisa+de+pre%C3%A7os+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Pesquisa+de+pre%C3%A7os+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Pesquisa+de+pre%C3%A7os+concurso+resumo)
- **5.5** Requisitos de qualidade, proteção e desempenho
  - ▶️ [Service Level Agreement (SLA): O que é um acordo de nível de serviço?](https://www.youtube.com/watch?v=FmHtyotP1I0) — Starti Partners
  - ▶️ [O que é o Acordo de Nível de Serviços ANS ou SLA - ITIL 4 Foundation](https://www.youtube.com/watch?v=RhdO-FP6v-0) — Prof. Adriano Martins Antonio
  - ▶️ [SLA - Saiba tudo sobre  “Acordo de Nível de Serviço - ANS”](https://www.youtube.com/watch?v=8RXBp1-DzzA) — Grupo Giovanella
  - [📄 PDFs](https://www.google.com/search?q=Requisitos+de+qualidade+prote%C3%A7%C3%A3o+e+desempenho+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Requisitos+de+qualidade+prote%C3%A7%C3%A3o+e+desempenho+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Requisitos+de+qualidade+prote%C3%A7%C3%A3o+e+desempenho+concurso+resumo)
- **5.6** Fiscalização e pagamento por entregas verificáveis
  - ▶️ [Aula 13 - fiscalização de contratos administrativos](https://www.youtube.com/watch?v=9g8ITRHbokk) — PROFESSOR THIAGO MARRARA
  - ▶️ [Lei 14.133/2021 - FISCALIZAÇÃO DE CONTRATO ADMINISTRATIVO| Mapa Mental Explicado](https://www.youtube.com/watch?v=santQnVdP24) — Rosane O Brito (rosaneobrito)
  - [📄 PDFs](https://www.google.com/search?q=Fiscaliza%C3%A7%C3%A3o+e+pagamento+por+entregas+verific%C3%A1veis+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Fiscaliza%C3%A7%C3%A3o+e+pagamento+por+entregas+verific%C3%A1veis+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Fiscaliza%C3%A7%C3%A3o+e+pagamento+por+entregas+verific%C3%A1veis+concurso+resumo)
- **5.7** Propriedade intelectual, portabilidade, acesso a dados e modelos, dependência tecnológica e plano de saída
  - ▶️ [Contratação Pública e Propriedade Intelectual](https://www.youtube.com/watch?v=13Fb5yWw0gU) — JuLaw TV
  - ▶️ [Desenvolvimento de Software e a Propriedade Intelectual](https://www.youtube.com/watch?v=eyolb3FDar0) — Portal Intelectual
  - ▶️ [A propriedade intelectual de software no Brasil](https://www.youtube.com/watch?v=S4p8La26q2U) — Reges Bronzatti
  - [📄 PDFs](https://www.google.com/search?q=Propriedade+intelectual+portabilidade+acesso+a+dados+e+modelos+depend%C3%AAncia+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Propriedade+intelectual+portabilidade+acesso+a+dados+e+modelos+depend%C3%AAncia+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Propriedade+intelectual+portabilidade+acesso+a+dados+e+modelos+depend%C3%AAncia+concurso+resumo)
