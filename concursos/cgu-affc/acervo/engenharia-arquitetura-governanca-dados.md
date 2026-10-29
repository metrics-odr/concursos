# 🔎 Acervo — Engenharia, Arquitetura e Governança de Dados

> P3 · Conhecimentos específicos · Pasta de notas: [`disciplinas/engenharia-arquitetura-governanca-dados/`](../../../disciplinas/engenharia-arquitetura-governanca-dados/)

## 🧭 Como estudar

- Modelagem: relacional/normalização, NoSQL (documento, chave-valor), dimensional (Kimball: fato × dimensão, SCD), vetorial.
- SQL: joins, GROUP BY/HAVING, subconsultas e funções de janela — escreva consultas à mão.
- Arquiteturas: DW × data lake × lakehouse × data mesh; batch × streaming; Spark.

## 📚 Fontes curadas

- 📰 [Zhamak Dehghani — Data Mesh Principles and Logical Architecture](https://martinfowler.com/articles/data-mesh-principles.html)
- 📄 [Lakehouse (CIDR 2021) — artigo original](https://www.cidrdb.org/cidr2021/papers/cidr2021_paper17.pdf)
- 📰 [Kimball Group — técnicas de modelagem dimensional](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/)
- 🎓 [PostgreSQL — tutorial de funções de janela](https://www.postgresql.org/docs/current/tutorial-window.html)
- 🎓 [Apache Spark — documentação](https://spark.apache.org/docs/latest/)
- ⚖️ [Decreto 10.046/2019 — Compartilhamento de dados na administração federal](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/decreto/D10046.htm)
- ⚖️ [Decreto 8.777/2016 — Política de Dados Abertos](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/decreto/d8777.htm)

## 🗂️ Por tópico do edital

Para cada item: vídeos do YouTube, PDFs e artigos reais (links diretos, de `fontes.json`) e questões reais do banco.

### 1 Modelagem e arquiteturas

- **1.1** Modelos relacional, documental, chave-valor, multidimensional e vetorial; normalização e integridade; transações e consistência
  - ▶️ [Modelagem de Dados - Normalização - Primeira Forma Normal](https://www.youtube.com/watch?v=eRaAMNjCFYw) — Bóson Treinamentos
  - ▶️ [Bancos de Dados Vetoriais, Embeddings e Busca por Similaridade – NLP na Engenharia de S…](https://www.youtube.com/watch?v=4n26QMxeA38) — André Santanchè
  - ▶️ [Banco de Dados Chave-Valor - Fábio Viegas e Gustavo Casaes](https://www.youtube.com/watch?v=EFHR_OKa24o) — FábioGameplays
  - 📄 [Bases de dados — Modelo relacional (Univ. do Minho)](https://www.di.uminho.pt/~asa/material_apoio/PISI/2019_20_Abelha-Aula_Modelo_Relacional(1).pdf) — PDF
  - 📄 [NoSQL 1 — chave-valor e documentos (UFPE)](https://www.cin.ufpe.br/~in940/NoSQL_1_Chave-valor_e_Documentos-DacioAlves.pdf) — PDF
  - 📰 [Relacional versus dados NoSQL (Microsoft Learn)](https://learn.microsoft.com/pt-br/dotnet/architecture/cloud-native/relational-vs-nosql-data) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q095](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q095.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2022-PETROBRAS-CD-Q096](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q096.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2022-PETROBRAS-CD-Q098](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q098.md) — questão real · Banca Cebraspe
- **1.2** Data warehouse, data mart, data lake e lakehouse; produtos de dados, responsabilidade por domínios, autosserviço e governança federada em data mesh
  - ▶️ [DATA MESH - DADOS COMO PRODUTO](https://www.youtube.com/watch?v=iUPNT2VSEzk) — PPT Não Compila Tecnologia e Transformação Digital
  - ▶️ [Data Warehouse / Data Lake / Data Lakehouse // Dicionário do Programador](https://www.youtube.com/watch?v=V07Pk4de-5M) — Código Fonte TV
  - ▶️ [Arquiteturas de dados -  Data Lake, Data Warehouse e Data Mart](https://www.youtube.com/watch?v=cpxAHxKeqAw) — iLucianoDev
  - 📄 [Building a Data Mesh using the Lake House Approach (AWS)](https://pages.awscloud.com/rs/112-TZM-766/images/2021_0723-ABD_Slide-Deck.pdf) — PDF
  - 📄 [Decifrando arquiteturas de dados — sumário (Novatec)](https://s3.novatec.com.br/sumarios/sumario-9788575229217.pdf) — PDF
  - 📰 [Data Lake, Lakehouse ou Data Mesh? (Triggo)](https://triggo.ai/blog/data-lake-lakehouse-ou-data-mesh/) — artigo
  - 📰 [Data lakehouse versus malha de dados versus data mesh (IBM)](https://www.ibm.com/think/topics/data-lakehouse-vs-data-fabric-vs-data-mesh) — artigo
  - 📝 [CEB-2025-ANM-CD-Q106](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q106.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q108](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q108.md) — questão real · Banca Cebraspe

### 2 SQL e consultas analíticas

- **2.1** Definição e manipulação de dados, controle de acesso e transações; filtros, junções, agregações, subconsultas, expressões de tabela comuns e funções de janela
  - ▶️ [Types of SQL Commands (DDL, DQL, DML, DCL, TCL) - SQL Tutorial #5](https://www.youtube.com/watch?v=BxZOqy3Bnl0) — Data with Baraa
  - ▶️ [Banco de Dados para Iniciantes | O que é? Transações ACID](https://www.youtube.com/watch?v=ZdW7VC2ex3o) — Canal TI
  - ▶️ [O que São Comandos DDL, DCL, DML e TCL no SQL](https://www.youtube.com/watch?v=8VzRZ18lhxU) — Hashtag Programação
  - 📄 [Structured Query Language — apostila (UTFPR)](https://coens.dv.utfpr.edu.br/will/wp-content/uploads/2022/03/Apostila_SQL.pdf) — PDF
  - 📰 [Roadmap SQL 2026: do SELECT ao desempenho de queries](https://casado.dev/banco-de-dados/roadmap-sql-2026-do-select-ao-desempenho) — artigo
  - 📰 [Window Functions no SQL Server](https://sqlcrespi.com/2016/05/14/window-functions-no-sql-server/) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q095](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q095.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2022-PETROBRAS-CD-Q097](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q097.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q101](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q101.md) — questão real · Banca Cebraspe
- **2.2** Índices, planos de execução e desempenho; valores nulos, duplicações e erros de interpretação em consultas
  - ▶️ [SQL Execution Plans (Visually Explained) | SQL Hints | #SQL Course 40](https://www.youtube.com/watch?v=O7AzUDogXsw) — Data with Baraa
  - ▶️ [Como usar ÍNDICES no Banco de Dados (SQL Server)](https://www.youtube.com/watch?v=j1n6NX11-G4) — Nerd dos Dados
  - ▶️ [Performance de Bancos de Dados: Índices](https://www.youtube.com/watch?v=SoNu-MplxI4) — SQL Cerebro - Luis Renato de Souza
  - 📄 [Otimizando o desempenho de consultas do PostgreSQL (AWS)](https://docs.aws.amazon.com/pt_br/prescriptive-guidance/latest/postgresql-query-tuning/postgresql-query-tuning.pdf) — PDF
  - 📄 [Apostila SQL — duplicatas e DISTINCT (USP)](https://sites.ffclrp.usp.br/cid/docentes/edberto/Apostilas/Apostila%20SQL.pdf) — PDF
  - 📰 [Guia de arquitetura e design de índices do SQL Server (Microsoft)](https://learn.microsoft.com/pt-br/sql/relational-databases/sql-server-index-design-guide?view=sql-server-ver16) — artigo
  - 📰 [Otimização de comandos SQL (DevMedia)](https://www.devmedia.com.br/artigo-sql-magazine-1-otimizacao-de-comandos-sql/6926) — artigo

### 3 Ingestão e integração

- **3.1** ETL e ELT; processamento em lote e fluxo, completo e incremental; APIs e contratos de dados; formatos CSV, JSON, XML e Parquet; interoperabilidade semântica e técnica; falhas, repetição de processamento e consistência
  - ▶️ [ETL vs ELT | Modern Data Architectures](https://www.youtube.com/watch?v=_Nk0v9qUWk4) — Kahan Data Solutions
  - ▶️ [File Formats Explained (CSV, Excel, JSON, SQL, XML, Parquet ) | Data Science Tutorial # 08](https://www.youtube.com/watch?v=OLbHQB886FE) — Code With Ishfaq
  - 📄 [ETL — extração, transformação e carga (UFGD)](https://evertontetila.ws.ufgd.edu.br/BD2/Aula12-texto.pdf) — PDF
  - 📄 [ETL na era do Big Data (Técnico Lisboa)](https://fenix.tecnico.ulisboa.pt/downloadFile/281870113703236/Thesis.pdf) — PDF
  - 📰 [Extract, transform, load (ETL) — Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/data-guide/relational-data/etl) — artigo
  - 📰 [Streaming ETL vs Traditional ETL](https://www.conduktor.io/glossary/streaming-etl-vs-traditional-etl) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q093](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q093.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2022-PETROBRAS-CD-Q094](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q094.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q107](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q107.md) — questão real · Banca Cebraspe

### 4 Processamento distribuído

- **4.1** Particionamento, paralelismo, movimentação de dados e execução distribuída de transformações e junções
  - ▶️ [MapReduce Architecture: Distributed Big Data Processing](https://www.youtube.com/watch?v=7RNODQ_hxRQ) — The Coding Gopher
  - ▶️ [Spark Tuning #1 - Processamento Distribuído + Top 5 Erros](https://www.youtube.com/watch?v=dQbLTj1qD80) — Zefe
  - 📄 [Skew in Parallel Query Processing (arXiv)](https://arxiv.org/pdf/1401.1872) — PDF
  - 📰 [Como aprendi Apache Spark — Shuffle (DEV)](https://dev.to/renanpyd/como-aprendi-apache-spark-parte-4-shuffle-onde-a-performance-comeca-a-ficar-avancada-1e4g) — artigo
  - 📰 [Otimizar as operações de shuffle (AWS)](https://docs.aws.amazon.com/prescriptive-guidance/latest/tuning-aws-glue-for-apache-spark/optimize-shuffles.html) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q099](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q099.md) — questão real · Banca Cebraspe
- **4.2** Escalabilidade, tolerância a falhas e custo
  - ▶️ [Problemas em Sistemas Distribuídos   Tolerância a falhas](https://www.youtube.com/watch?v=riWhj_bd42c) — Redes e Criptografia
  - ▶️ [FAMERC - Sistemas Distribuídos - Tolerância a Falhas](https://www.youtube.com/watch?v=x_jsYqzoFOo) — Adriano Adauto
  - ▶️ [Sistemas distribuídos - Tolerância a falhas](https://www.youtube.com/watch?v=h2g7cVk18xU) — Geam Felipe dos Santos
  - 📄 [Skew in Parallel Query Processing (arXiv)](https://arxiv.org/pdf/1401.1872) — PDF
  - 📰 [Guia técnico de otimização de pipelines no Apache Spark (Bix)](https://bixtecnologia.com.br/otimizacao-pipelines-apache-spark-databricks/) — artigo
  - 📰 [Apache Spark: processamento distribuído de big data em escala](https://shiftmind.com.br/apache-spark/) — artigo
  - 📝 [CEB-2022-PETROBRAS-CD-Q099](../../../questoes/2022-petrobras-ciencia-de-dados/ceb-2022-petrobras-cd-q099.md) — questão real · Banca Cebraspe
- **4.3** Planos de execução
  - ▶️ [04 Spark DataFrames & Execution Plans | Spark Logical and Physical Execution Planning |…](https://www.youtube.com/watch?v=I_gum_3bEvY) — Ease With Data
  - ▶️ [DAG in Spark - DAG | STAGES | TASKS - Databricks](https://www.youtube.com/watch?v=be-KPSVwX0w) — Chaudhary Data World
  - 📄 [Planos de execução — otimização de consultas PostgreSQL (AWS)](https://docs.aws.amazon.com/pt_br/prescriptive-guidance/latest/postgresql-query-tuning/postgresql-query-tuning.pdf) — PDF
  - 📰 [O plano de execução perfeito (Porto SQL)](https://portosql.wordpress.com/2018/11/21/o-plano-perfeito/) — artigo
- **4.4** Assimetria entre partições e resultados inconsistentes
  - ▶️ [CAP Theorem - Consistency, Availability and Partition Tolerance - System Design](https://www.youtube.com/watch?v=t5WPGMXOtds) — Caleb Curry
  - ▶️ [Spark Data Skew](https://www.youtube.com/watch?v=RArOLJm_5Us) — Data Engineering 
  - 📄 [Skew in Parallel Query Processing (arXiv)](https://arxiv.org/pdf/1401.1872) — PDF
  - 📰 [Spark Data Skew Problem](https://www.dataengi.com/post/2019/02/06/spark-data-skew-problem) — artigo
  - 📰 [Você entende shuffle de verdade? (Medium)](https://medium.com/@larissa.eleterio/entendo-apache-spark-por-dentro-voc%C3%AA-entende-shuffle-de-verdade-66370c9b7fbb) — artigo

### 5 Qualidade e rastreabilidade

- **5.1** Metadados, catálogo e linhagem
  - ▶️ [Curso de TI para área fiscal e controle - Aula 01 - I - 1.4 - Metadados e catálogo de d…](https://www.youtube.com/watch?v=EmeeCfa9iRk) — Prof. Ramon Souza
  - 📄 [Gerenciamento de metadados e da qualidade de dados — Módulo 4 (ENAP)](https://repositorio.enap.gov.br/bitstream/1/7092/4/M%C3%B3dulo%20-4%20Gerenciamento%20de%20Metadados%20e%20da%20qualidade%20de%20Dados%2003-2021.pdf) — PDF
  - 📄 [Gestão da linhagem de dados heterogêneos (SBBD)](https://sol.sbc.org.br/index.php/sbbd/article/download/37270/37053/) — PDF
  - 📰 [O que é linhagem de dados? (Databricks)](https://www.databricks.com/blog/what-is-data-lineage) — artigo
  - 📰 [Linhagem de dados no Microsoft Purview](https://learn.microsoft.com/pt-br/purview/concept-data-lineage) — artigo
- **5.2** Completude, consistência, validade, unicidade, acurácia e atualidade
  - ▶️ [Qualidade dos dados, suas dimensões e aplicações na governança de dados](https://www.youtube.com/watch?v=7dw7D6j8TzI) — Paulo Cordeiro | Governança de Dados e IA
  - ▶️ [6 Principais Dimensões de Qualidade de Dados | Governança de Dados](https://www.youtube.com/watch?v=wTwWg7W9Bcc) — Diário de Dados
  - ▶️ [Principais Medidas de Qualidade dos Dados - Consistência](https://www.youtube.com/watch?v=Q4HFzs6kJDM) — Data Science Academy
  - 📄 [Governança de Dados — Módulo 4: metadados e qualidade (ENAP)](https://repositorio.enap.gov.br/bitstream/1/5008/4/M%C3%B3dulo%204%20-%20Gerenciamento%20de%20Metadados%20e%20da%20qualidade%20de%20Dados.pdf) — PDF
  - 📄 [Qualidade em cadastros públicos de pessoas (TCU)](https://sites.tcu.gov.br/recursos/trabalhos-pos-graduacao/pdfs/Qualidade%20em%20cadastros%20p%C3%BAblicos%20de%20pessoas_%20uma%20proposta%20de%20guia%20para%20avalia%C3%A7%C3%A3o.pdf) — PDF
- **5.3** Perfilamento, deduplicação, vinculação de registros e enriquecimento
  - ▶️ [O que é enriquecimento de dados? Veja como fazer!](https://www.youtube.com/watch?v=GAUtoGNVvos) — Assertiva
  - ▶️ [Introdução à vinculação de dados administrativos (Record Linkage)](https://www.youtube.com/watch?v=-hb7MeIozVU) — Cidacs Fiocruz
  - 📄 [Conquistas e desafios do record linkage (Epidemiol. Serv. Saúde/SciELO)](https://www.scielo.br/j/ress/a/zH4GSZzP9DNZRxwGz3wpMTL/?lang=pt&format=pdf) — PDF
  - 📰 [Estratégia de deduplicação de dados com blocagem (UFRGS)](https://lume.ufrgs.br/handle/10183/26350) — artigo
  - 📰 [Record linkage em condições subótimas — atenção primária no Rio de Janeiro](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8204416/) — artigo
  - 📝 [CEB-2025-ANM-CD-Q107](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q107.md) — questão real · Banca Cebraspe
- **5.4** Conciliação de fontes
  - ▶️ [Analista: entenda como a conciliação auxilia na governança, controle e qualidade dos dados](https://www.youtube.com/watch?v=HApwHTMqmmI) — Dattos
  - 📄 [O desafio do pareamento de grandes bases de dados (IPEA)](https://repositorio.ipea.gov.br/server/api/core/bitstreams/d1a6b1ee-96ff-41d4-90cb-b5ffe7cab1d1/content) — PDF
  - 📰 [Record linkage e conferência de dados — cruzamento de cadastros governamentais](https://www.researchgate.net/publication/266209162_RECORD_LINKAGE_E_CONFERENCIA_DE_DADOS_UMA_AVALIACAO_DE_METODOLOGIAS_DE_CRUZAMENTO_DE_DADOS_CADASTRAIS_GOVERNAMENTAIS) — artigo
- **5.5** Riscos de correspondências incorretas entre pessoas ou entidades
  - ▶️ [Entity Resolution vs Record-to-Record Matching: What’s the Difference? | Quantexa](https://www.youtube.com/watch?v=nN91HuSWOJA) — Quantexa
  - ▶️ [What to look for in an Entity Resolution engine](https://www.youtube.com/watch?v=0PDPGySPQVo) — Quantexa
  - ▶️ [What is Dynamic Entity Resolution?](https://www.youtube.com/watch?v=bgNdeNaEHdY) — Quantexa
  - 📄 [Record linkage e conferência de dados (SBPO 2014)](http://www.din.uem.br/sbpo/sbpo2014/pdf/arq0209.pdf) — PDF
  - 📄 [O desafio do pareamento de grandes bases de dados (IPEA)](https://repositorio.ipea.gov.br/server/api/core/bitstreams/d1a6b1ee-96ff-41d4-90cb-b5ffe7cab1d1/content) — PDF
  - 📰 [Acurácia do relacionamento probabilístico de registros (Cad. Saúde Pública/SciELO)](http://www.scielo.br/j/csp/a/X4rxRLnWDNGHqzpJfTBxvwz/?lang=pt) — artigo

### 6 Compartilhamento e proteção

- **6.1** Minimização, segregação de ambientes e privilégios
  - ▶️ [10 Princípios da LGPD - Lei Geral de Proteção de Dados](https://www.youtube.com/watch?v=guw1qH2Ex2g) — Ummense
  - ▶️ [LGPD 👉 Princípio da Necessidade](https://www.youtube.com/watch?v=5aozQ9CZ6hk) — TAK BRASIL
  - ▶️ [Segurança da Informação – Case: Princípio do Menor Privilégio](https://www.youtube.com/watch?v=PA6KeHhqeRQ) — PHS Brasil Consultoria em Informática
  - 📰 [LGPD — privacidade desde a concepção (ANAC)](https://www.gov.br/anac/pt-br/acesso-a-informacao/seguranca-da-informacao/tratamento-de-dados-pessoais/CartilhaLGPDPrivacybyDesign.pdf) — artigo
  - 📰 [Os princípios no tratamento de dados na LGPD (artigo)](https://www.conjur.com.br/wp-content/uploads/2023/09/artigo-marcio-pestana-lgpd.pdf) — artigo
  - 📰 [Princípios da LGPD (TCE-RO)](https://lgpd.tcero.tc.br/principios-da-lgpd/) — artigo
  - 📝 [CEB-2025-ANM-CD-Q086](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q086.md) — questão real · Banca Cebraspe
- **6.2** Retenção e descarte
  - ▶️ [Frame | Dados #01 - Ciclo de Vida dos Dados](https://www.youtube.com/watch?v=NpEtz30yIQY) — Engineering Brasil
  - ▶️ [LGPD: O que é uma política de retenção e exclusão de dados e porque ter uma | NDM na Pr…](https://www.youtube.com/watch?v=OaLAS6ZN2Ws) — NDM Advogados
  - ▶️ [Ciclo de vida do dado em Ciência de Dados, com Nathália Demétrio, Data Scientist no Itaú](https://www.youtube.com/watch?v=zYMOodYmEYg) — Data & Analytics Forum
  - 📰 [Lei nº 13.709/2018 (LGPD) — arts. 15 e 16 (Planalto)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) — artigo
  - 📝 [CEB-2025-ANM-CD-Q086](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q086.md) — questão real · Banca Cebraspe
- **6.3** Anonimização, pseudonimização e reidentificação
  - ▶️ [Differential Privacy - Simply Explained](https://www.youtube.com/watch?v=gI0wk1CXlsQ) — Simply Explained
  - ▶️ [The Difference Between Pseudonymization & Anonymization | comforte AG](https://www.youtube.com/watch?v=ImU7alYn_rk) — comforte
  - ▶️ [Differential Privacy explained](https://www.youtube.com/watch?v=XgotQQpXwio) — Security and Privacy Academy
  - 📄 [Estudo técnico sobre anonimização de dados na LGPD (ANPD)](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/estudo_tecnico_sobre_anonimizacao_de_dados_na_lgpd___analise_juridica.pdf/@@display-file/file) — PDF
  - 📄 [Anonimização e pseudonimização — guia](https://baptistaluz.com.br/wp-content/uploads/2024/02/guia_pt.pdf) — PDF
  - 📰 [A pseudonimização é suficiente? Riscos de reidentificação sob a LGPD](https://pereiragionedis.com.br/a-pseudonimizacao-e-suficiente-os-riscos-de-reidentificacao-via-inteligencia-artificial-sob-a-otica-da-lgpd/) — artigo
- **6.4** Publicação, reutilização e compartilhamento controlados
  - ▶️ [1. Dados Abertos: O que são Dados Abertos?](https://www.youtube.com/watch?v=lERu4RHlk1w) — Imaflora Brasil
  - ▶️ [O que são dados abertos?](https://www.youtube.com/watch?v=VNTmwmZI_So) — Multiplicidade Mobilidade Urbana
  - 📄 [Tratamento de dados pessoais pelo Poder Público — guia orientativo (ANPD)](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-poder-publico-anpd-versao-final.pdf/@@download/file) — PDF
  - 📄 [O compartilhamento de dados pessoais entre instituições (Cadernos da CGU)](https://revista.cgu.gov.br/Cadernos_CGU/article/download/601/342/3262) — PDF
  - 📰 [Compartilhamento de dados entre órgãos públicos obedece à LGPD (ConJur)](https://www.conjur.com.br/2022-set-15/compartilhamento-dados-entre-orgao-publicos-obedecer-lgpd/) — artigo
- **6.5** Proteção de dados pessoais e equilíbrio entre utilidade analítica, abertura e proteção de pessoas
  - ▶️ [DIREITO DIGITAL e LGPD (Resumo) - LEI GERAL DE PROTEÇÃO DE DADOS PESSOAIS | Privacidade…](https://www.youtube.com/watch?v=So9Lhgbq2sk) — Me Julga - Cíntia Brunelli
  - ▶️ [LGPD - ANONIMIZAÇÃO DE DADOS PESSOAIS](https://www.youtube.com/watch?v=1C8SFPgA_k8) — Dra. Laura Porto
  - ▶️ [Compartilhamento de Dados Públicos e a LGPD](https://www.youtube.com/watch?v=6-v50ud5MV8) — Marcia Moreira
  - 📄 [Guia Transparência × LGPD (CGE-PR)](https://www.cge.pr.gov.br/sites/default/arquivos_restritos/files/documento/2026-03/guia_-_transparencia_x_lgpd.pdf) — PDF
  - 📰 [Enunciado da CGU sobre harmonização entre LAI e LGPD](https://www.gov.br/ouvidorias/pt-br/assuntos/noticias/2022/controladoria-publica-novo-enunciado-sobre-harmonizacao-entre-lai-e-lgpd) — artigo
  - 📝 [CEB-2025-ANM-CD-Q027](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q027.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q055](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q055.md) — questão real · Banca Cebraspe
  - 📝 [CEB-2025-ANM-CD-Q056](../../../questoes/2025-anm-ciencia-de-dados/ceb-2025-anm-cd-q056.md) — questão real · Banca Cebraspe
