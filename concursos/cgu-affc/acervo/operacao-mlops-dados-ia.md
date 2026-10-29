# 🔎 Acervo — Operação, Governança e Gestão de Soluções de Dados e IA

> P3 · Conhecimentos específicos · Pasta de notas: `disciplinas/operacao-mlops-dados-ia/` (ainda sem notas)

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

Para cada item: vídeos do YouTube, PDFs e artigos reais (links diretos, de `fontes.json`) e questões reais do banco.

### 1 Ciclo de vida e MLOps

- **1.1** Versionamento de dados, código e modelos
  - ▶️ [Testando DVC para versionamento de dados e modelos de Machine Learning | (DataOps/MLOps)](https://www.youtube.com/watch?v=sHZr8EcOQYM) — Samuel Luz
  - ▶️ [Versioning Data with DVC (Hands-On Tutorial!)](https://www.youtube.com/watch?v=kLKBcPonMYw) — DVCorg
  - 📄 [Pipeline MLOps automatizado (arXiv)](https://arxiv.org/pdf/2512.11541) — PDF
  - 📰 [MLOps: otimizando o ciclo de vida de ML em produção (DSA)](https://blog.dsacademy.com.br/mlops-otimizando-o-ciclo-de-vida-de-machine-learning-em-producao/) — artigo
  - 📰 [Arquitetura de MLOps em 2026 (Bix)](https://www.bixtecnologia.com.br/arquitetura-de-mlops-2026/) — artigo
- **1.2** Registro de experimentos
  - ▶️ [What is Experiment Tracking in Machine Learning? | MLFlow | Ashutosh Tripathi](https://www.youtube.com/watch?v=BiUBqv1QNOA) — Ashutosh Tripathi
  - ▶️ [DagsHub Learning: Experiment Tracking for Machine Learning with MLflow](https://www.youtube.com/watch?v=6h0tNCShmsU) — DagsHub
  - ▶️ [MLflow Tracking: Rastreie Seus Experimentos de Machine Learning - 02](https://www.youtube.com/watch?v=q5dRa4PRG6M) — PalancaCode
  - 📄 [Pipeline MLOps automatizado (arXiv)](https://arxiv.org/pdf/2512.11541) — PDF
  - 📰 [MLOps (DSA) — registro de experimentos](https://blog.dsacademy.com.br/mlops-otimizando-o-ciclo-de-vida-de-machine-learning-em-producao/) — artigo
- **1.3** Pipelines, testes e integração e entrega contínuas
  - ▶️ [MLOPS Github Action With CICD Pipeline One Shot Tutorial](https://www.youtube.com/watch?v=ciqWMIf7Pz0) — Krish Naik
  - ▶️ [Pipelines em Machine Learning | Criando linhas de produção para seus modelos](https://www.youtube.com/watch?v=wdnbxrPqbO0) — Let's Data
  - ▶️ [MLOps Tutorial#1. Continuous Integration (CI/CD) for ML Pipelines with Github Actions](https://www.youtube.com/watch?v=9I8X-3HIErc) — Data Science Garage
  - 📄 [Pipeline MLOps automatizado com CI/CD e retreinamento (arXiv)](https://arxiv.org/pdf/2512.11541) — PDF
  - 📰 [MLOps CI/CD: guia para automatizar IA em produção](https://todasolucao.com.br/blog/estrategias-cicd-mlops-automatizando-ia/) — artigo
  - 📰 [MLOps vs DevOps (Databricks)](https://www.databricks.com/blog/mlops-vs-devops) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q118](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q118.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2022-PETROBRAS-CD-Q120](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q120.md) — questão real · Banca Cebraspe
- **1.4** Reprodutibilidade
  - ▶️ [Como montar seu ambiente de Ciência de Dados - Container Docker](https://www.youtube.com/watch?v=H6n9jQuExH0) — Diego Nogare
  - 📄 [Pipeline MLOps automatizado (arXiv)](https://arxiv.org/pdf/2512.11541) — PDF
  - 📰 [Arquitetura de MLOps em 2026 (Bix)](https://www.bixtecnologia.com.br/arquitetura-de-mlops-2026/) — artigo
- **1.5** Disponibilização por APIs, implantação e reversão
  - ▶️ [How to Deploy a Machine Learning Model as a REST API with FastAPI in Python](https://www.youtube.com/watch?v=25ahE8RSQ60) — Onur Baltaci
  - ▶️ [Creating APIs For Machine Learning Models with FastAPI](https://www.youtube.com/watch?v=5PgqzVG9SCk) — NeuralNine
  - 📄 [Pipeline MLOps com implantação em staging/produção (arXiv)](https://arxiv.org/pdf/2512.11541) — PDF
  - 📰 [MLOps infrastructure: CI/CD para treino e implantação (Introl)](https://introl.com/blog/mlops-infrastructure-cicd-pipelines-model-training-deployment) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q119](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q119.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2022-PETROBRAS-CD-Q120](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q120.md) — questão real · Banca Cebraspe
- **1.6** Monitoramento de mudanças nas distribuições, nas relações e no desempenho
  - ▶️ [Live #7: Como colocar modelos de Machine Learning em Produção](https://www.youtube.com/watch?v=fLtZGWCzQJQ) — Stack
  - ▶️ [Monitoramento de modelos: por quê monitorar, boas práticas e aprendizados | Nubank ML M…](https://www.youtube.com/watch?v=iAiY9L47eak) — Building Nubank
  - 📄 [Retreinamento em resposta a mudanças de distribuição (arXiv)](https://arxiv.org/pdf/2512.11541) — PDF
  - 📰 [Monitoramento de drift de dados e de conceito (Bix)](https://www.bixtecnologia.com.br/arquitetura-de-mlops-2026/) — artigo
  - 📰 [Pipeline MLOps com monitoramento de data drift (GitHub)](https://github.com/xuxujh/mlops-tabular-credit-risk) — artigo

### 2 Sustentação de soluções analíticas

- **2.1** Serviços gerenciados e operação própria
  - ▶️ [Cloud Computing Services Models - IaaS PaaS SaaS Explained](https://www.youtube.com/watch?v=36zducUX16w) — Ecourse Review
  - ▶️ [Cloud Computing Service Model - IaaS PaaS SaaS Explained | Types of Cloud Services | Si…](https://www.youtube.com/watch?v=boY2i6qhPr8) — Simplilearn
  - ▶️ [Cloud Computing Explained | IaaS SaaS PaaS](https://www.youtube.com/watch?v=lex-DYi1UpU) — CertBros
  - 📄 [Guia Complementar de Segurança da Informação para Computação em Nuvem (PPSI 2.0)](https://www.gov.br/governodigital/pt-br/privacidade-e-seguranca/ppsi-2.0/arquivos/guianuvemppsi2-0-v1-1-110626.pdf) — PDF
  - 📰 [Nuvem, on-premise ou híbrido: como escolher a infraestrutura de TI](https://www.latinatrade.com/blog/nuvem-on-premise-ou-hibrido-como-escolher.html) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q117](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q117.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q098](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q098.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q099](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q099.md) — questão real · Banca Cebraspe
- **2.2** Requisitos de processamento, memória, armazenamento e aceleradores
  - ▶️ [GPU for Machine Learning Explained](https://www.youtube.com/watch?v=vcILiZMYpJo) — Saturn Cloud
  - 📰 [Cloud GPU vs servidor próprio para IA: custo e privacidade](https://adentro.com.br/cloud-gpu-vs-servidor-proprio-ia/) — artigo
  - 📰 [GPU dedicada vs GPU na nuvem (EVEO)](https://blog.eveo.com.br/gpu-dedicada-vs-gpu-nuvem-diferenca) — artigo
  - 📝 [CEB-2025-ANM-CD-Q118](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q118.md) — questão real · Banca Cebraspe
- **2.3** Custo, latência, disponibilidade e observabilidade de pipelines e inferência
  - ▶️ [Data Observability | Monitoração de Pipeline de dados com Grafana](https://www.youtube.com/watch?v=qQTBJ9Bylrg) — Meetup Engenharia de Dados
  - ▶️ [Exploring the Latency/Throughput & Cost Space for LLM Inference // Timothée Lacroix //…](https://www.youtube.com/watch?v=mYRqvB1_gRk) — AAIF Live
  - ▶️ [Same latency, 10x cheaper: cutting ML inference costs](https://www.youtube.com/watch?v=CcNIEALPkxc) — Hasgeek TV
  - 📰 [Observabilidade de dados: o que é e como aplicar (Softdesign)](https://www.softdesign.com.br/blog/observabilidade-de-dados/) — artigo
  - 📰 [O que é observabilidade de dados? (IBM)](https://www.ibm.com/think/topics/data-observability) — artigo
  - 📰 [Guia prático para a observabilidade do pipeline de dados (New Relic)](https://newrelic.com/blog/observability/data-pipeline-observability) — artigo
  - 📰 [Cloud GPU, dedicado ou on-premise: custo, latência e disponibilidade (EVEO)](https://blog.eveo.com.br/cloud-gpu-dedicado-ou-on-premise-qual-escolher) — artigo
- **2.4** Controle de acesso, proteção de segredos e continuidade das soluções
  - ▶️ [O que é Plano de Contingência - 4 minutos Sobre Negócios EP 02](https://www.youtube.com/watch?v=RQrltKWw_aM) — ProdutividadeMaxima
  - ▶️ [[#001] AWS IAM: Fundamentos do Controle de Acesso em Nuvem](https://www.youtube.com/watch?v=0mw9ditQg8I) — AprendaAWS
  - ▶️ [Plano de Continuidade de Negócios (PCN): O que é e por que sua empresa precisa dele?](https://www.youtube.com/watch?v=0mhl0_uQOLQ) — ISH Tecnologia
  - 📄 [Guia Complementar de Segurança da Informação para Computação em Nuvem (PPSI 2.0)](https://www.gov.br/governodigital/pt-br/privacidade-e-seguranca/ppsi-2.0/arquivos/guianuvemppsi2-0-v1-1-110626.pdf) — PDF
  - 📰 [Adoção do gerenciamento de segredos (STF)](https://bibliotecadigital.stf.jus.br/xmlui/bitstream/handle/123456789/2594/Flavio%20Henrique_Artigo_Cientifico_Final.pdf?sequence=1&isAllowed=y) — artigo
  - 📰 [Guia básico de orientações ao gestor em segurança da informação (GSI)](https://www.bibliotecadeseguranca.com.br/wp-content/uploads/2020/03/guia-basico-de-orientacoes-ao-gestor-em-seguranca-da-informacao-e-comunicacoes.pdf) — artigo
  - 📝 [CEB-2025-ANM-CD-Q079](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q079.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q080](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q080.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q081](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q081.md) — questão real · Banca Cebraspe

### 3 Governança e responsabilidade

- **3.1** Papéis, riscos e evidências sobre dados, modelos e decisões
  - ▶️ [Governança de Inteligência Artificial: como reduzir riscos e definir o papel da IA no n…](https://www.youtube.com/watch?v=hglMeK5CDZ8) — Bridge & Co.
  - ▶️ [O que é um Data Steward? E por que ele é o guardião invisível dos seus dados](https://www.youtube.com/watch?v=3mNY8FAEjj8) — Paulo Cordeiro | Governança de Dados e IA
  - ▶️ [Governança de IA na Prática: Regras, Riscos e Decisões](https://www.youtube.com/watch?v=yhK0SnIlxFw) — LatamIA
  - 📄 [Recomendações de governança para o uso de IA pelo poder público](https://www.transparencia.org.br/downloads/publicacoes/Recomendacoes_Governanca_Uso_IA_PoderPublico.pdf) — PDF
  - 📄 [Avaliação de impacto algorítmico (LAPIN)](https://lapin.org.br/wp-content/uploads/2023/04/RelatorioAIA.pdf) — PDF
  - 📰 [IA e devido processo na administração pública (RDA/FGV)](https://periodicos.fgv.br/rda/article/download/91301/87808/226749) — artigo
- **3.2** Rastreabilidade, avaliação de impacto, revisão humana e contestação
  - ▶️ [TUTORIAL RIPD - Relatório de Impacto à Proteção de Dados](https://www.youtube.com/watch?v=tkJzP0fCA2o) — Direito Connect
  - ▶️ [Como Fazer o Relatório de Impacto à Proteção de Dados: RIPD ou DPIA | WE209](https://www.youtube.com/watch?v=PFL2cL0KgUI) — Canal Tracker Segurança da Informação
  - ▶️ [Relatório de Impacto à Proteção de Dados Pessoais (RIPD/ PIA) na LGPD](https://www.youtube.com/watch?v=xBpJhYLIFRI) — Maria Godoy
  - 📄 [Relatório de Avaliação de Impacto Algorítmico (LAPIN)](https://lapin.org.br/wp-content/uploads/2023/04/RelatorioAIA.pdf) — PDF
  - 📄 [Guia do usuário brasileiro de IA — contestação e revisão humana (InternetLab)](https://internetlab.org.br/wp-content/uploads/2026/03/Guia-do-usuario-brasileiro-de-inteligencia-artificial.pdf) — PDF
  - 📰 [IA na tomada de decisão no setor público (RSD)](https://rsdjournal.org/rsd/article/download/51541/40441) — artigo
- **3.3** Proteção de dados pessoais e informações sensíveis
  - ▶️ [DIREITO DIGITAL e LGPD (Resumo) - LEI GERAL DE PROTEÇÃO DE DADOS PESSOAIS | Privacidade…](https://www.youtube.com/watch?v=So9Lhgbq2sk) — Me Julga - Cíntia Brunelli
  - ▶️ [Dados Sensíveis - Hipóteses e restrições ao tratamento de Dados - Art. 11 LGPD - Vídeo 15](https://www.youtube.com/watch?v=JqhD5PMwGIc) — Simone Santinato
  - ▶️ [Lei nº 13.709 de 2018 - Lei Geral de Proteção de Dados (LGPD) - Conceitos e Característ…](https://www.youtube.com/watch?v=XbuniaIh_Tc) — Professor Raphael Pinho
  - 📄 [Tratamento de dados pessoais pelo Poder Público (ANPD)](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-poder-publico-anpd-versao-final.pdf/@@download/file) — PDF
  - 📰 [LGPD — Lei 13.709/2018 (Planalto)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) — artigo
  - 📝 [CEB-2025-ANM-CD-Q055](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q055.md) — questão real · Banca Cebraspe
- **3.4** Prevenção e tratamento de discriminação e de uso fora da finalidade
  - ▶️ [Webinar | Imersão em Direito e Tecnologia: Discriminação algorítmica](https://www.youtube.com/watch?v=CTFW9rbvp3I) — FGV
  - ▶️ [Discriminação Algorítmica e os Desafios da Ética Digital](https://www.youtube.com/watch?v=L_WCyFdJ_t8) — Faculdade Infnet
  - ▶️ [Discriminação algorítmica: desafios interdisciplinares | Programa Renascença](https://www.youtube.com/watch?v=Cuk53pR6RxY) — Diplomacia para Democracia
  - 📄 [IA e governança algorítmica no setor público (UDESC)](https://www.udesc.br/arquivos/udesc/id_cpmenu/15664/Intelig_ncia_artifical_e_governan_a_algoritmica_desafios_e_oportunidades_para_o_setor_p_blico_1663350826524_15664.pdf) — PDF
  - 📰 [Viés algorítmico e discriminação (Migalhas)](https://www.migalhas.com.br/depeso/415125/vies-algoritmico-e-discriminacao-ia-pode-amplificar-vieses-sociais) — artigo
- **3.5** Avaliação de resultados e limites da automação
  - ▶️ [Automação de Processos e Decisões na Prática](https://www.youtube.com/watch?v=rF2vAn35GY8) — Maurício Bitencourt
  - ▶️ [Explicabilidade Algorítmica e Revisão de Decisões Automatizadas](https://www.youtube.com/watch?v=Cntu132CjUc) — Data Privacy Brasil
  - ▶️ [Decisões automatizadas ou por algoritmos: garantias jurídicas](https://www.youtube.com/watch?v=Qwt_QvhxOOk) — Mario Cruz
  - 📄 [IA na tomada de decisão no setor público (RSD)](https://rsdjournal.org/rsd/article/download/51541/40441) — PDF
  - 📰 [Governança algorítmica, constitucionalismo tecnológico e direitos](https://revistatopicos.com.br/generate/pdf_zenodo/pub_784688151.pdf) — artigo

### 4 Gestão de produtos de dados

- **4.1** Alinhamento entre problema público, produto e resultado
  - ▶️ [Estratégia para Produtos de Dados (Data Product)](https://www.youtube.com/watch?v=jFOYdqvCRvY) — FIA Business School - Labdata
  - ▶️ [What is a Data Product? Data Products Explained!](https://www.youtube.com/watch?v=soNK0iF23lg) — The Data and AI Guy
  - ▶️ [O QUE É UM PRODUTO DE DADOS?](https://www.youtube.com/watch?v=3z8nBoqudn0) — PPT Não Compila Tecnologia e Transformação Digital
  - 📰 [Metodologias ágeis na administração pública brasileira (RSP/ENAP, 2021)](https://bibliotecadigital.enap.gov.br/bitstream/1/6660/1/4310-Texto%20do%20Artigo-19349-1-10-20210630.pdf) — artigo
- **4.2** Priorização, critérios de aceitação e indicadores
  - ▶️ [Priorização do Backlog e o Princípio de Pareto | Gestão Ágil](https://www.youtube.com/watch?v=QEglZ9va9Oc) — Mario Trentim | Estratégia em Açao
  - ▶️ [O QUE SÃO CRITÉRIOS DE ACEITE? 🐧 | AULA #15 | FUNDAMENTOS DE GESTÃO DE BACKLOG](https://www.youtube.com/watch?v=kPUqjX_qhL0) — CANAL VALOR
  - ▶️ [O que são CRITÉRIOS DE ACEITAÇÃO? | Felipe Franco](https://www.youtube.com/watch?v=dbnyG8XHM0c) — Felipe Franco
  - 📰 [Metodologias ágeis na administração pública (RSP/ENAP)](https://bibliotecadigital.enap.gov.br/bitstream/1/6660/1/4310-Texto%20do%20Artigo-19349-1-10-20210630.pdf) — artigo
- **4.3** Descoberta de necessidades, entrega e ciclo de vida
  - ▶️ [CICLO DE VIDA DO PRODUTO DIGITAL | AULA 2 | FUNDAMENTOS DE PRODUCT DISCOVERY](https://www.youtube.com/watch?v=keIBhdIQKsk) — CANAL VALOR
  - ▶️ [COMO ENTENDER as NECESSIDADES dos CLIENTES | Product Discovery](https://www.youtube.com/watch?v=iN7aozlM_Lg) — Codando Sem Codar - Giampaolo Lepore
  - ▶️ [Ciclo de Vida do Produto Digital: Do MVP ao Growth (c/ Murylo Schulttais, Product Manag…](https://www.youtube.com/watch?v=evYiMsesTtE) — Tera
  - 📄 [Métodos ágeis: capacitação em Scrum e Kanban (ESESP, 2025)](https://esesp.es.gov.br/Media/esesp/Apostilas/2025/Planejamento_e_Projetos/Apostila%20-%20M%C3%A9todos%20%C3%81geis%20Capacita%C3%A7%C3%A3o%20Scrum%20e%20Kanban.pdf) — PDF
  - 📰 [Metodologias ágeis na administração pública (RSP/ENAP)](https://bibliotecadigital.enap.gov.br/bitstream/1/6660/1/4310-Texto%20do%20Artigo-19349-1-10-20210630.pdf) — artigo
  - 📝 [CEB-2025-ANM-CD-Q059](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q059.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q060](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q060.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q061](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q061.md) — questão real · Banca Cebraspe
- **4.4** Scrum e Kanban
  - ▶️ [Scrum vs Kanban - What's the Difference?](https://www.youtube.com/watch?v=rIaz-l1Kf8w) — Development That Pays
  - ▶️ [The Scrum Guide: FULL COURSE](https://www.youtube.com/watch?v=s3y95I79D_Q) — David McLachlan
  - ▶️ [The difference between Kanban and Scrum](https://www.youtube.com/watch?v=19dMPv0pOGE) — Darcy DeClute
  - 📄 [Métodos ágeis: capacitação em Scrum e Kanban (ESESP, 2025)](https://esesp.es.gov.br/Media/esesp/Apostilas/2025/Planejamento_e_Projetos/Apostila%20-%20M%C3%A9todos%20%C3%81geis%20Capacita%C3%A7%C3%A3o%20Scrum%20e%20Kanban.pdf) — PDF
  - 📰 [Scrum e Kanban em órgão público estadual (RGSA)](https://rgsa.openaccesspublications.org/rgsa/article/download/13157/7491/43753) — artigo
- **4.5** Articulação com PDTIC, plano de transformação digital e plano de dados abertos
  - ▶️ [Dados Abertos: Conceito e Aplicações | Transmissão UFPE](https://www.youtube.com/watch?v=ESYlDPppdYw) — Canal UFPE
  - ▶️ [EP.35 - DADOS ABERTOS: TRANSPARÊNCIA E CONTROLE SOCIAL](https://www.youtube.com/watch?v=PMl_UQtsAwM) — Escola de Gestão e Contas
  - ▶️ [Plano Diretor de Tecnologia da Informação e Comunicação PDTIC.](https://www.youtube.com/watch?v=SSPnt7t_02o) — Luiz Fernando Pires Kozak
  - 📄 [PDTIC 2026-2027 (Ministério do Planejamento)](https://www.gov.br/planejamento/pt-br/acesso-a-informacao/transparencia-e-prestacao-de-contas/gestao-de-tecnologia-da-informacao-e-comunicacao/plano-diretor-de-tic/pdtic_2026-2027-mpo_publicacao.pdf/@@display-file/file) — PDF
  - 📰 [Plano de Transformação Digital (MEC)](https://www.gov.br/mec/pt-br/transformacao-digital/transformacaodigital.pdf) — artigo
  - 📰 [Decreto 12.198/2024 — Estratégia Federal de Governo Digital (Planalto)](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/decreto/d12198.htm) — artigo
  - 📝 [CEB-2025-ANM-CD-Q057](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q057.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q058](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q058.md) — questão real · Banca Cebraspe
- **4.6** Comunicação dos resultados e das incertezas aos usuários
  - ▶️ [Comunicação dos Resultados | Curso de Análise de Dados | Aula 07](https://www.youtube.com/watch?v=HIJeRSUUEKY) — Alexandre Polselli | Data Universe
  - ▶️ [Criando um Storytelling com Seus Dados](https://www.youtube.com/watch?v=nDNynBaLKRk) — Hashtag Programação
  - ▶️ [Storytelling com dados - Resumo do livro](https://www.youtube.com/watch?v=i1U8Zdoshw0) — Métricas Boss
  - 📄 [Interpretação crítica dos resultados estatísticos (UNESP)](https://www.ibilce.unesp.br/Home/Departamentos/CiencCompEstatistica/Adriana/interpretacao-critica-dos-resultados-estatisticos.pdf) — PDF
  - 📰 [Erros de interpretação do valor-p: comunicar incerteza](https://estatisticaparapesquisa.com.br/valor-p-o-que-e/) — artigo

### 5 Contratação e controle de soluções

- **5.1** Estudo técnico preliminar e termo de referência
  - ▶️ [O Estudo Técnico Preliminar (ETP) na Nova Lei de Licitações](https://www.youtube.com/watch?v=qYtzMJFr6pw) — Professor Ricardo Ribas
  - ▶️ [Como montar um Termo de Referência - Nova Lei de Licitações](https://www.youtube.com/watch?v=wJIdtSRXWuk) — Professor Murilo Caldas
  - ▶️ [Termo de Referência - Lei 14.133/21](https://www.youtube.com/watch?v=Ract-xetINo) — Nova Licitação
  - 📄 [Estudo Técnico Preliminar de TIC (PGE-PR)](https://www.pge.pr.gov.br/sites/default/arquivos_restritos/files/documento/2023-06/E-BOX%2003%20-%20ESTUDO%20T%C3%89CNICO%20PRELIMINAR%20TIC.pdf) — PDF
  - 📄 [ETP — Lei 14.133/2021 (TRF6)](https://portal.trf6.jus.br/wp-content/uploads/2025/01/SEI_0979816_Estudo_Tecnico_Preliminar___ETP__Lei_14.133_2021_-1.pdf) — PDF
  - 📰 [Estudo técnico preliminar: diretrizes (TCE-SC)](https://www.tcesc.tc.br/sites/default/files/2024-04/RTCESC_02_Artigo_Estudo%20t%C3%A9cnico%20preliminar.pdf) — artigo
  - 📝 [CEB-2025-ANM-CD-Q069](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q069.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q072](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q072.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q073](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q073.md) — questão real · Banca Cebraspe
- **5.2** Viabilidade, dimensionamento e custo total de propriedade
  - ▶️ [Entenda o que é TCO: Custo Total de Propriedade](https://www.youtube.com/watch?v=wpoGABku51k) — FriendsLab
  - ▶️ [O passo a passo para fazer um estudo de viabilidade de uma obra](https://www.youtube.com/watch?v=-IEaf9Q5eCw) — Eng. Mariele
  - ▶️ [TCO (Custo Total de Propriedade) - Versão Português](https://www.youtube.com/watch?v=uJWNo2C5rvc) — Júlio Abud - Procurement/ Compras 360
  - 📄 [Estudo Técnico Preliminar (ETP) — principais pontos (TCE-RN)](https://www.tce.rn.gov.br/as/EscolaContas/ArquivosCurso/73/Estudo_T%C3%A9cnico_Preliminar_(ETP)__Vanessa_Ubarana.pdf) — PDF
  - 📰 [Estudo técnico preliminar (TCE-SC)](https://www.tcesc.tc.br/sites/default/files/2024-04/RTCESC_02_Artigo_Estudo%20t%C3%A9cnico%20preliminar.pdf) — artigo
- **5.3** Comparação entre desenvolvimento próprio, contratação e serviços de nuvem
  - ▶️ [Contratação de Serviços de Computação em Nuvem no setor público](https://www.youtube.com/watch?v=cwclZBDpcU0) — AWS Developers LATAM
  - ▶️ [Contratação e adoção de serviços de computação em nuvem no governo brasileiro](https://www.youtube.com/watch?v=C1wZcCMVR6k) — HDI Brasil
  - 📄 [Estratégia de uso de software e serviços em nuvem (Governo Digital)](https://www.gov.br/governodigital/pt-br/contratacoes-de-tic/legislacao/modelo-de-contratacao-de-software-e-servicos-em-nuvem/vigentes/estrategia-de-software-e-uso-de-nuvem/estrategia_software_e_nuvem_mapa.pdf) — PDF
  - 📰 [Portaria SGD/MGI nº 5.950/2023 — contratação de software e nuvem](https://www.gov.br/governodigital/pt-br/contratacoes-de-tic/legislacao/modelo-de-contratacao-de-software-e-servicos-em-nuvem/vigentes/portaria-sgd-mgi-no-5-950-de-26-de-outubro-de-2023) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q117](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q117.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q068](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q068.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q099](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q099.md) — questão real · Banca Cebraspe
- **5.4** Pesquisa de preços
  - ▶️ [5 maiores dúvidas sobre a Pesquisa de Preços na Nova Lei](https://www.youtube.com/watch?v=B1ILQtDx3Og) — Professor Ricardo Ribas
  - ▶️ [2025 | Pesquisa de Preço na Nova Lei de Licitações? O que mudou?  #lei14133 #licitacao…](https://www.youtube.com/watch?v=1W19O9_tGDk) — Via Jurídica I Empresa e Licitação
  - 📰 [Portaria SGD/MGI nº 5.950/2023 — planilha de custos e preços](https://www.gov.br/governodigital/pt-br/contratacoes-de-tic/legislacao/modelo-de-contratacao-de-software-e-servicos-em-nuvem/vigentes/portaria-sgd-mgi-no-5-950-de-26-de-outubro-de-2023) — artigo
  - 📝 [CEB-2025-ANM-CD-Q074](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q074.md) — questão real · Banca Cebraspe
- **5.5** Requisitos de qualidade, proteção e desempenho
  - ▶️ [Service Level Agreement (SLA): O que é um acordo de nível de serviço?](https://www.youtube.com/watch?v=FmHtyotP1I0) — Starti Partners
  - ▶️ [O que é o Acordo de Nível de Serviços ANS ou SLA - ITIL 4 Foundation](https://www.youtube.com/watch?v=RhdO-FP6v-0) — Prof. Adriano Martins Antonio
  - ▶️ [SLA - Saiba tudo sobre  “Acordo de Nível de Serviço - ANS”](https://www.youtube.com/watch?v=8RXBp1-DzzA) — Grupo Giovanella
  - 📄 [Guia de Segurança da Informação para Computação em Nuvem (PPSI 2.0)](https://www.gov.br/governodigital/pt-br/privacidade-e-seguranca/ppsi-2.0/arquivos/guianuvemppsi2-0-v1-1-110626.pdf) — PDF
  - 📝 [CEB-2025-ANM-CD-Q065](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q065.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q070](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q070.md) — questão real · Banca Cebraspe
- **5.6** Fiscalização e pagamento por entregas verificáveis
  - ▶️ [Aula 13 - fiscalização de contratos administrativos](https://www.youtube.com/watch?v=9g8ITRHbokk) — PROFESSOR THIAGO MARRARA
  - ▶️ [Lei 14.133/2021 - FISCALIZAÇÃO DE CONTRATO ADMINISTRATIVO| Mapa Mental Explicado](https://www.youtube.com/watch?v=santQnVdP24) — Rosane O Brito (rosaneobrito)
  - 📰 [Portaria SGD/MGI nº 5.950/2023 — gestão e fiscalização](https://www.gov.br/governodigital/pt-br/contratacoes-de-tic/legislacao/modelo-de-contratacao-de-software-e-servicos-em-nuvem/vigentes/portaria-sgd-mgi-no-5-950-de-26-de-outubro-de-2023) — artigo
  - 📝 [CEB-2025-ANM-CD-Q067](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q067.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q071](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q071.md) — questão real · Banca Cebraspe
- **5.7** Propriedade intelectual, portabilidade, acesso a dados e modelos, dependência tecnológica e plano de saída
  - ▶️ [Contratação Pública e Propriedade Intelectual](https://www.youtube.com/watch?v=13Fb5yWw0gU) — JuLaw TV
  - ▶️ [Desenvolvimento de Software e a Propriedade Intelectual](https://www.youtube.com/watch?v=eyolb3FDar0) — Portal Intelectual
  - ▶️ [A propriedade intelectual de software no Brasil](https://www.youtube.com/watch?v=S4p8La26q2U) — Reges Bronzatti
  - 📰 [Contratação de nuvem — portabilidade e dependência tecnológica (Senado)](https://www2.senado.leg.br/bdsf/bitstream/handle/id/569196/TCC_Rubens_Terra_Neto.pdf?sequence=1&isAllowed=y) — artigo
  - 📰 [Estratégia de saída da nuvem exige testes técnicos e governança contratual](https://brasilinovador.com.br/estrategia-de-saida-da-nuvem-corporativa-exige-testes-tecnicos-e-governanca-contratual/) — artigo
  - 📰 [Boas práticas para licitação de serviços de computação em nuvem (IBGP)](https://forum.ibgp.com.br/licitacao-de-servicos-de-computacao-em-nuvem/) — artigo
  - 📝 [CEB-2025-ANM-CD-Q063](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q063.md) — questão real · Banca Cebraspe
