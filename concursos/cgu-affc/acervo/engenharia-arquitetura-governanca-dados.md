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

Vídeos selecionados sobre cada tópico (YouTube) e atalhos de busca para PDFs, questões e artigos.

### 1 Modelagem e arquiteturas

[📄 PDFs](https://www.google.com/search?q=Modelagem+e+arquiteturas+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Modelagem+e+arquiteturas+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Modelagem+e+arquiteturas+concurso+resumo)

- **1.1** Modelos relacional, documental, chave-valor, multidimensional e vetorial; normalização e integridade; transações e consistência
  - ▶️ [Modelagem de Dados - Normalização - Primeira Forma Normal](https://www.youtube.com/watch?v=eRaAMNjCFYw) — Bóson Treinamentos
  - ▶️ [Bancos de Dados Vetoriais, Embeddings e Busca por Similaridade – NLP na Engenharia de S…](https://www.youtube.com/watch?v=4n26QMxeA38) — André Santanchè
  - ▶️ [Banco de Dados Chave-Valor - Fábio Viegas e Gustavo Casaes](https://www.youtube.com/watch?v=EFHR_OKa24o) — FábioGameplays
  - [📄 PDFs](https://www.google.com/search?q=Modelos+relacional+documental+chave-valor+multidimensional+e+vetorial+normaliza%C3%A7%C3%A3o+e+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Modelos+relacional+documental+chave-valor+multidimensional+e+vetorial+normaliza%C3%A7%C3%A3o+e+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Modelos+relacional+documental+chave-valor+multidimensional+e+vetorial+normaliza%C3%A7%C3%A3o+e+concurso+resumo)
- **1.2** Data warehouse, data mart, data lake e lakehouse; produtos de dados, responsabilidade por domínios, autosserviço e governança federada em data mesh
  - ▶️ [DATA MESH - DADOS COMO PRODUTO](https://www.youtube.com/watch?v=iUPNT2VSEzk) — PPT Não Compila Tecnologia e Transformação Digital
  - ▶️ [Data Warehouse / Data Lake / Data Lakehouse // Dicionário do Programador](https://www.youtube.com/watch?v=V07Pk4de-5M) — Código Fonte TV
  - ▶️ [Arquiteturas de dados -  Data Lake, Data Warehouse e Data Mart](https://www.youtube.com/watch?v=cpxAHxKeqAw) — iLucianoDev
  - [📄 PDFs](https://www.google.com/search?q=Data+warehouse+data+mart+data+lake+e+lakehouse+produtos+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Data+warehouse+data+mart+data+lake+e+lakehouse+produtos+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Data+warehouse+data+mart+data+lake+e+lakehouse+produtos+concurso+resumo)

### 2 SQL e consultas analíticas

[📄 PDFs](https://www.google.com/search?q=SQL+e+consultas+anal%C3%ADticas+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=SQL+e+consultas+anal%C3%ADticas+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=SQL+e+consultas+anal%C3%ADticas+concurso+resumo)

- **2.1** Definição e manipulação de dados, controle de acesso e transações; filtros, junções, agregações, subconsultas, expressões de tabela comuns e funções de janela
  - ▶️ [Types of SQL Commands (DDL, DQL, DML, DCL, TCL) - SQL Tutorial #5](https://www.youtube.com/watch?v=BxZOqy3Bnl0) — Data with Baraa
  - ▶️ [Banco de Dados para Iniciantes | O que é? Transações ACID](https://www.youtube.com/watch?v=ZdW7VC2ex3o) — Canal TI
  - ▶️ [O que São Comandos DDL, DCL, DML e TCL no SQL](https://www.youtube.com/watch?v=8VzRZ18lhxU) — Hashtag Programação
  - [📄 PDFs](https://www.google.com/search?q=Defini%C3%A7%C3%A3o+e+manipula%C3%A7%C3%A3o+de+dados+controle+de+acesso+e+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Defini%C3%A7%C3%A3o+e+manipula%C3%A7%C3%A3o+de+dados+controle+de+acesso+e+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Defini%C3%A7%C3%A3o+e+manipula%C3%A7%C3%A3o+de+dados+controle+de+acesso+e+concurso+resumo)
- **2.2** Índices, planos de execução e desempenho; valores nulos, duplicações e erros de interpretação em consultas
  - ▶️ [SQL Execution Plans (Visually Explained) | SQL Hints | #SQL Course 40](https://www.youtube.com/watch?v=O7AzUDogXsw) — Data with Baraa
  - ▶️ [Como usar ÍNDICES no Banco de Dados (SQL Server)](https://www.youtube.com/watch?v=j1n6NX11-G4) — Nerd dos Dados
  - ▶️ [Performance de Bancos de Dados: Índices](https://www.youtube.com/watch?v=SoNu-MplxI4) — SQL Cerebro - Luis Renato de Souza
  - [📄 PDFs](https://www.google.com/search?q=%C3%8Dndices+planos+de+execu%C3%A7%C3%A3o+e+desempenho+valores+nulos+duplica%C3%A7%C3%B5es+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=%C3%8Dndices+planos+de+execu%C3%A7%C3%A3o+e+desempenho+valores+nulos+duplica%C3%A7%C3%B5es+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=%C3%8Dndices+planos+de+execu%C3%A7%C3%A3o+e+desempenho+valores+nulos+duplica%C3%A7%C3%B5es+concurso+resumo)

### 3 Ingestão e integração

[📄 PDFs](https://www.google.com/search?q=Ingest%C3%A3o+e+integra%C3%A7%C3%A3o+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Ingest%C3%A3o+e+integra%C3%A7%C3%A3o+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Ingest%C3%A3o+e+integra%C3%A7%C3%A3o+concurso+resumo)

- **3.1** ETL e ELT; processamento em lote e fluxo, completo e incremental; APIs e contratos de dados; formatos CSV, JSON, XML e Parquet; interoperabilidade semântica e técnica; falhas, repetição de processamento e consistência
  - ▶️ [ETL vs ELT | Modern Data Architectures](https://www.youtube.com/watch?v=_Nk0v9qUWk4) — Kahan Data Solutions
  - ▶️ [File Formats Explained (CSV, Excel, JSON, SQL, XML, Parquet ) | Data Science Tutorial # 08](https://www.youtube.com/watch?v=OLbHQB886FE) — Code With Ishfaq
  - [📄 PDFs](https://www.google.com/search?q=ETL+e+ELT+processamento+em+lote+e+fluxo+completo+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=ETL+e+ELT+processamento+em+lote+e+fluxo+completo+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=ETL+e+ELT+processamento+em+lote+e+fluxo+completo+concurso+resumo)

### 4 Processamento distribuído

[📄 PDFs](https://www.google.com/search?q=Processamento+distribu%C3%ADdo+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Processamento+distribu%C3%ADdo+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Processamento+distribu%C3%ADdo+concurso+resumo)

- **4.1** Particionamento, paralelismo, movimentação de dados e execução distribuída de transformações e junções
  - ▶️ [MapReduce Architecture: Distributed Big Data Processing](https://www.youtube.com/watch?v=7RNODQ_hxRQ) — The Coding Gopher
  - ▶️ [Spark Tuning #1 - Processamento Distribuído + Top 5 Erros](https://www.youtube.com/watch?v=dQbLTj1qD80) — Zefe
  - [📄 PDFs](https://www.google.com/search?q=Particionamento+paralelismo+movimenta%C3%A7%C3%A3o+de+dados+e+execu%C3%A7%C3%A3o+distribu%C3%ADda+de+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Particionamento+paralelismo+movimenta%C3%A7%C3%A3o+de+dados+e+execu%C3%A7%C3%A3o+distribu%C3%ADda+de+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Particionamento+paralelismo+movimenta%C3%A7%C3%A3o+de+dados+e+execu%C3%A7%C3%A3o+distribu%C3%ADda+de+concurso+resumo)
- **4.2** Escalabilidade, tolerância a falhas e custo
  - ▶️ [Problemas em Sistemas Distribuídos   Tolerância a falhas](https://www.youtube.com/watch?v=riWhj_bd42c) — Redes e Criptografia
  - ▶️ [FAMERC - Sistemas Distribuídos - Tolerância a Falhas](https://www.youtube.com/watch?v=x_jsYqzoFOo) — Adriano Adauto
  - ▶️ [Sistemas distribuídos - Tolerância a falhas](https://www.youtube.com/watch?v=h2g7cVk18xU) — Geam Felipe dos Santos
  - [📄 PDFs](https://www.google.com/search?q=Escalabilidade+toler%C3%A2ncia+a+falhas+e+custo+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Escalabilidade+toler%C3%A2ncia+a+falhas+e+custo+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Escalabilidade+toler%C3%A2ncia+a+falhas+e+custo+concurso+resumo)
- **4.3** Planos de execução
  - ▶️ [04 Spark DataFrames & Execution Plans | Spark Logical and Physical Execution Planning |…](https://www.youtube.com/watch?v=I_gum_3bEvY) — Ease With Data
  - ▶️ [DAG in Spark - DAG | STAGES | TASKS - Databricks](https://www.youtube.com/watch?v=be-KPSVwX0w) — Chaudhary Data World
  - [📄 PDFs](https://www.google.com/search?q=Planos+de+execu%C3%A7%C3%A3o+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Planos+de+execu%C3%A7%C3%A3o+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Planos+de+execu%C3%A7%C3%A3o+concurso+resumo)
- **4.4** Assimetria entre partições e resultados inconsistentes
  - ▶️ [CAP Theorem - Consistency, Availability and Partition Tolerance - System Design](https://www.youtube.com/watch?v=t5WPGMXOtds) — Caleb Curry
  - ▶️ [Spark Data Skew](https://www.youtube.com/watch?v=RArOLJm_5Us) — Data Engineering 
  - [📄 PDFs](https://www.google.com/search?q=Assimetria+entre+parti%C3%A7%C3%B5es+e+resultados+inconsistentes+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Assimetria+entre+parti%C3%A7%C3%B5es+e+resultados+inconsistentes+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Assimetria+entre+parti%C3%A7%C3%B5es+e+resultados+inconsistentes+concurso+resumo)

### 5 Qualidade e rastreabilidade

[📄 PDFs](https://www.google.com/search?q=Qualidade+e+rastreabilidade+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Qualidade+e+rastreabilidade+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Qualidade+e+rastreabilidade+concurso+resumo)

- **5.1** Metadados, catálogo e linhagem
  - ▶️ [Curso de TI para área fiscal e controle - Aula 01 - I - 1.4 - Metadados e catálogo de d…](https://www.youtube.com/watch?v=EmeeCfa9iRk) — Prof. Ramon Souza
  - [📄 PDFs](https://www.google.com/search?q=Metadados+cat%C3%A1logo+e+linhagem+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Metadados+cat%C3%A1logo+e+linhagem+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Metadados+cat%C3%A1logo+e+linhagem+concurso+resumo)
- **5.2** Completude, consistência, validade, unicidade, acurácia e atualidade
  - ▶️ [Qualidade dos dados, suas dimensões e aplicações na governança de dados](https://www.youtube.com/watch?v=7dw7D6j8TzI) — Paulo Cordeiro | Governança de Dados e IA
  - ▶️ [6 Principais Dimensões de Qualidade de Dados | Governança de Dados](https://www.youtube.com/watch?v=wTwWg7W9Bcc) — Diário de Dados
  - ▶️ [Principais Medidas de Qualidade dos Dados - Consistência](https://www.youtube.com/watch?v=Q4HFzs6kJDM) — Data Science Academy
  - [📄 PDFs](https://www.google.com/search?q=Completude+consist%C3%AAncia+validade+unicidade+acur%C3%A1cia+e+atualidade+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Completude+consist%C3%AAncia+validade+unicidade+acur%C3%A1cia+e+atualidade+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Completude+consist%C3%AAncia+validade+unicidade+acur%C3%A1cia+e+atualidade+concurso+resumo)
- **5.3** Perfilamento, deduplicação, vinculação de registros e enriquecimento
  - ▶️ [O que é enriquecimento de dados? Veja como fazer!](https://www.youtube.com/watch?v=GAUtoGNVvos) — Assertiva
  - ▶️ [Introdução à vinculação de dados administrativos (Record Linkage)](https://www.youtube.com/watch?v=-hb7MeIozVU) — Cidacs Fiocruz
  - [📄 PDFs](https://www.google.com/search?q=Perfilamento+deduplica%C3%A7%C3%A3o+vincula%C3%A7%C3%A3o+de+registros+e+enriquecimento+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Perfilamento+deduplica%C3%A7%C3%A3o+vincula%C3%A7%C3%A3o+de+registros+e+enriquecimento+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Perfilamento+deduplica%C3%A7%C3%A3o+vincula%C3%A7%C3%A3o+de+registros+e+enriquecimento+concurso+resumo)
- **5.4** Conciliação de fontes
  - ▶️ [Analista: entenda como a conciliação auxilia na governança, controle e qualidade dos dados](https://www.youtube.com/watch?v=HApwHTMqmmI) — Dattos
  - [📄 PDFs](https://www.google.com/search?q=Concilia%C3%A7%C3%A3o+de+fontes+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Concilia%C3%A7%C3%A3o+de+fontes+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Concilia%C3%A7%C3%A3o+de+fontes+concurso+resumo)
- **5.5** Riscos de correspondências incorretas entre pessoas ou entidades
  - ▶️ [Entity Resolution vs Record-to-Record Matching: What’s the Difference? | Quantexa](https://www.youtube.com/watch?v=nN91HuSWOJA) — Quantexa
  - ▶️ [What to look for in an Entity Resolution engine](https://www.youtube.com/watch?v=0PDPGySPQVo) — Quantexa
  - ▶️ [What is Dynamic Entity Resolution?](https://www.youtube.com/watch?v=bgNdeNaEHdY) — Quantexa
  - [📄 PDFs](https://www.google.com/search?q=Riscos+de+correspond%C3%AAncias+incorretas+entre+pessoas+ou+entidades+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Riscos+de+correspond%C3%AAncias+incorretas+entre+pessoas+ou+entidades+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Riscos+de+correspond%C3%AAncias+incorretas+entre+pessoas+ou+entidades+concurso+resumo)

### 6 Compartilhamento e proteção

[📄 PDFs](https://www.google.com/search?q=Compartilhamento+e+prote%C3%A7%C3%A3o+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Compartilhamento+e+prote%C3%A7%C3%A3o+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Compartilhamento+e+prote%C3%A7%C3%A3o+concurso+resumo)

- **6.1** Minimização, segregação de ambientes e privilégios
  - ▶️ [10 Princípios da LGPD - Lei Geral de Proteção de Dados](https://www.youtube.com/watch?v=guw1qH2Ex2g) — Ummense
  - ▶️ [LGPD 👉 Princípio da Necessidade](https://www.youtube.com/watch?v=5aozQ9CZ6hk) — TAK BRASIL
  - ▶️ [Segurança da Informação – Case: Princípio do Menor Privilégio](https://www.youtube.com/watch?v=PA6KeHhqeRQ) — PHS Brasil Consultoria em Informática
  - [📄 PDFs](https://www.google.com/search?q=Minimiza%C3%A7%C3%A3o+segrega%C3%A7%C3%A3o+de+ambientes+e+privil%C3%A9gios+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Minimiza%C3%A7%C3%A3o+segrega%C3%A7%C3%A3o+de+ambientes+e+privil%C3%A9gios+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Minimiza%C3%A7%C3%A3o+segrega%C3%A7%C3%A3o+de+ambientes+e+privil%C3%A9gios+concurso+resumo)
- **6.2** Retenção e descarte
  - ▶️ [Frame | Dados #01 - Ciclo de Vida dos Dados](https://www.youtube.com/watch?v=NpEtz30yIQY) — Engineering Brasil
  - ▶️ [LGPD: O que é uma política de retenção e exclusão de dados e porque ter uma | NDM na Pr…](https://www.youtube.com/watch?v=OaLAS6ZN2Ws) — NDM Advogados
  - ▶️ [Ciclo de vida do dado em Ciência de Dados, com Nathália Demétrio, Data Scientist no Itaú](https://www.youtube.com/watch?v=zYMOodYmEYg) — Data & Analytics Forum
  - [📄 PDFs](https://www.google.com/search?q=Reten%C3%A7%C3%A3o+e+descarte+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Reten%C3%A7%C3%A3o+e+descarte+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Reten%C3%A7%C3%A3o+e+descarte+concurso+resumo)
- **6.3** Anonimização, pseudonimização e reidentificação
  - ▶️ [Differential Privacy - Simply Explained](https://www.youtube.com/watch?v=gI0wk1CXlsQ) — Simply Explained
  - ▶️ [The Difference Between Pseudonymization & Anonymization | comforte AG](https://www.youtube.com/watch?v=ImU7alYn_rk) — comforte
  - ▶️ [Differential Privacy explained](https://www.youtube.com/watch?v=XgotQQpXwio) — Security and Privacy Academy
  - [📄 PDFs](https://www.google.com/search?q=Anonimiza%C3%A7%C3%A3o+pseudonimiza%C3%A7%C3%A3o+e+reidentifica%C3%A7%C3%A3o+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Anonimiza%C3%A7%C3%A3o+pseudonimiza%C3%A7%C3%A3o+e+reidentifica%C3%A7%C3%A3o+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Anonimiza%C3%A7%C3%A3o+pseudonimiza%C3%A7%C3%A3o+e+reidentifica%C3%A7%C3%A3o+concurso+resumo)
- **6.4** Publicação, reutilização e compartilhamento controlados
  - ▶️ [1. Dados Abertos: O que são Dados Abertos?](https://www.youtube.com/watch?v=lERu4RHlk1w) — Imaflora Brasil
  - ▶️ [O que são dados abertos?](https://www.youtube.com/watch?v=VNTmwmZI_So) — Multiplicidade Mobilidade Urbana
  - [📄 PDFs](https://www.google.com/search?q=Publica%C3%A7%C3%A3o+reutiliza%C3%A7%C3%A3o+e+compartilhamento+controlados+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Publica%C3%A7%C3%A3o+reutiliza%C3%A7%C3%A3o+e+compartilhamento+controlados+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Publica%C3%A7%C3%A3o+reutiliza%C3%A7%C3%A3o+e+compartilhamento+controlados+concurso+resumo)
- **6.5** Proteção de dados pessoais e equilíbrio entre utilidade analítica, abertura e proteção de pessoas
  - ▶️ [DIREITO DIGITAL e LGPD (Resumo) - LEI GERAL DE PROTEÇÃO DE DADOS PESSOAIS | Privacidade…](https://www.youtube.com/watch?v=So9Lhgbq2sk) — Me Julga - Cíntia Brunelli
  - ▶️ [LGPD - ANONIMIZAÇÃO DE DADOS PESSOAIS](https://www.youtube.com/watch?v=1C8SFPgA_k8) — Dra. Laura Porto
  - ▶️ [Compartilhamento de Dados Públicos e a LGPD](https://www.youtube.com/watch?v=6-v50ud5MV8) — Marcia Moreira
  - [📄 PDFs](https://www.google.com/search?q=Prote%C3%A7%C3%A3o+de+dados+pessoais+e+equil%C3%ADbrio+entre+utilidade+anal%C3%ADtica+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Prote%C3%A7%C3%A3o+de+dados+pessoais+e+equil%C3%ADbrio+entre+utilidade+anal%C3%ADtica+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Prote%C3%A7%C3%A3o+de+dados+pessoais+e+equil%C3%ADbrio+entre+utilidade+anal%C3%ADtica+concurso+resumo)
