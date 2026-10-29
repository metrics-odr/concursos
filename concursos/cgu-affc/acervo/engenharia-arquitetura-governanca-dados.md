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

Atalhos de busca prontos com os termos de cada tópico.

### 1 Modelagem e arquiteturas

[▶️ YouTube](https://www.youtube.com/results?search_query=Modelagem+e+arquiteturas+concurso) · [📄 PDFs](https://www.google.com/search?q=Modelagem+e+arquiteturas+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Modelagem+e+arquiteturas+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Modelagem+e+arquiteturas+concurso+resumo)

- **1.1** Modelos relacional, documental, chave-valor, multidimensional e vetorial; normalização e integridade; transações e consistência
  - [▶️ YouTube](https://www.youtube.com/results?search_query=Modelos+relacional+documental+chave-valor+multidimensional+e+vetorial+normaliza%C3%A7%C3%A3o+e+concurso) · [📄 PDFs](https://www.google.com/search?q=Modelos+relacional+documental+chave-valor+multidimensional+e+vetorial+normaliza%C3%A7%C3%A3o+e+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Modelos+relacional+documental+chave-valor+multidimensional+e+vetorial+normaliza%C3%A7%C3%A3o+e+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Modelos+relacional+documental+chave-valor+multidimensional+e+vetorial+normaliza%C3%A7%C3%A3o+e+concurso+resumo)
- **1.2** Data warehouse, data mart, data lake e lakehouse; produtos de dados, responsabilidade por domínios, autosserviço e governança federada em data mesh
  - [▶️ YouTube](https://www.youtube.com/results?search_query=Data+warehouse+data+mart+data+lake+e+lakehouse+produtos+concurso) · [📄 PDFs](https://www.google.com/search?q=Data+warehouse+data+mart+data+lake+e+lakehouse+produtos+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Data+warehouse+data+mart+data+lake+e+lakehouse+produtos+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Data+warehouse+data+mart+data+lake+e+lakehouse+produtos+concurso+resumo)

### 2 SQL e consultas analíticas

[▶️ YouTube](https://www.youtube.com/results?search_query=SQL+e+consultas+anal%C3%ADticas+concurso) · [📄 PDFs](https://www.google.com/search?q=SQL+e+consultas+anal%C3%ADticas+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=SQL+e+consultas+anal%C3%ADticas+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=SQL+e+consultas+anal%C3%ADticas+concurso+resumo)

- **2.1** Definição e manipulação de dados, controle de acesso e transações; filtros, junções, agregações, subconsultas, expressões de tabela comuns e funções de janela
  - [▶️ YouTube](https://www.youtube.com/results?search_query=Defini%C3%A7%C3%A3o+e+manipula%C3%A7%C3%A3o+de+dados+controle+de+acesso+e+concurso) · [📄 PDFs](https://www.google.com/search?q=Defini%C3%A7%C3%A3o+e+manipula%C3%A7%C3%A3o+de+dados+controle+de+acesso+e+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Defini%C3%A7%C3%A3o+e+manipula%C3%A7%C3%A3o+de+dados+controle+de+acesso+e+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Defini%C3%A7%C3%A3o+e+manipula%C3%A7%C3%A3o+de+dados+controle+de+acesso+e+concurso+resumo)
- **2.2** Índices, planos de execução e desempenho; valores nulos, duplicações e erros de interpretação em consultas
  - [▶️ YouTube](https://www.youtube.com/results?search_query=%C3%8Dndices+planos+de+execu%C3%A7%C3%A3o+e+desempenho+valores+nulos+duplica%C3%A7%C3%B5es+concurso) · [📄 PDFs](https://www.google.com/search?q=%C3%8Dndices+planos+de+execu%C3%A7%C3%A3o+e+desempenho+valores+nulos+duplica%C3%A7%C3%B5es+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=%C3%8Dndices+planos+de+execu%C3%A7%C3%A3o+e+desempenho+valores+nulos+duplica%C3%A7%C3%B5es+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=%C3%8Dndices+planos+de+execu%C3%A7%C3%A3o+e+desempenho+valores+nulos+duplica%C3%A7%C3%B5es+concurso+resumo)

### 3 Ingestão e integração

[▶️ YouTube](https://www.youtube.com/results?search_query=Ingest%C3%A3o+e+integra%C3%A7%C3%A3o+concurso) · [📄 PDFs](https://www.google.com/search?q=Ingest%C3%A3o+e+integra%C3%A7%C3%A3o+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Ingest%C3%A3o+e+integra%C3%A7%C3%A3o+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Ingest%C3%A3o+e+integra%C3%A7%C3%A3o+concurso+resumo)

- **3.1** ETL e ELT; processamento em lote e fluxo, completo e incremental; APIs e contratos de dados; formatos CSV, JSON, XML e Parquet; interoperabilidade semântica e técnica; falhas, repetição de processamento e consistência
  - [▶️ YouTube](https://www.youtube.com/results?search_query=ETL+e+ELT+processamento+em+lote+e+fluxo+completo+concurso) · [📄 PDFs](https://www.google.com/search?q=ETL+e+ELT+processamento+em+lote+e+fluxo+completo+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=ETL+e+ELT+processamento+em+lote+e+fluxo+completo+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=ETL+e+ELT+processamento+em+lote+e+fluxo+completo+concurso+resumo)

### 4 Processamento distribuído

[▶️ YouTube](https://www.youtube.com/results?search_query=Processamento+distribu%C3%ADdo+concurso) · [📄 PDFs](https://www.google.com/search?q=Processamento+distribu%C3%ADdo+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Processamento+distribu%C3%ADdo+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Processamento+distribu%C3%ADdo+concurso+resumo)

- **4.1** Particionamento, paralelismo, movimentação de dados e execução distribuída de transformações e junções
  - [▶️ YouTube](https://www.youtube.com/results?search_query=Particionamento+paralelismo+movimenta%C3%A7%C3%A3o+de+dados+e+execu%C3%A7%C3%A3o+distribu%C3%ADda+de+concurso) · [📄 PDFs](https://www.google.com/search?q=Particionamento+paralelismo+movimenta%C3%A7%C3%A3o+de+dados+e+execu%C3%A7%C3%A3o+distribu%C3%ADda+de+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Particionamento+paralelismo+movimenta%C3%A7%C3%A3o+de+dados+e+execu%C3%A7%C3%A3o+distribu%C3%ADda+de+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Particionamento+paralelismo+movimenta%C3%A7%C3%A3o+de+dados+e+execu%C3%A7%C3%A3o+distribu%C3%ADda+de+concurso+resumo)
- **4.2** Escalabilidade, tolerância a falhas e custo
  - [▶️ YouTube](https://www.youtube.com/results?search_query=Escalabilidade+toler%C3%A2ncia+a+falhas+e+custo+concurso) · [📄 PDFs](https://www.google.com/search?q=Escalabilidade+toler%C3%A2ncia+a+falhas+e+custo+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Escalabilidade+toler%C3%A2ncia+a+falhas+e+custo+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Escalabilidade+toler%C3%A2ncia+a+falhas+e+custo+concurso+resumo)
- **4.3** Planos de execução
  - [▶️ YouTube](https://www.youtube.com/results?search_query=Planos+de+execu%C3%A7%C3%A3o+concurso) · [📄 PDFs](https://www.google.com/search?q=Planos+de+execu%C3%A7%C3%A3o+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Planos+de+execu%C3%A7%C3%A3o+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Planos+de+execu%C3%A7%C3%A3o+concurso+resumo)
- **4.4** Assimetria entre partições e resultados inconsistentes
  - [▶️ YouTube](https://www.youtube.com/results?search_query=Assimetria+entre+parti%C3%A7%C3%B5es+e+resultados+inconsistentes+concurso) · [📄 PDFs](https://www.google.com/search?q=Assimetria+entre+parti%C3%A7%C3%B5es+e+resultados+inconsistentes+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Assimetria+entre+parti%C3%A7%C3%B5es+e+resultados+inconsistentes+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Assimetria+entre+parti%C3%A7%C3%B5es+e+resultados+inconsistentes+concurso+resumo)

### 5 Qualidade e rastreabilidade

[▶️ YouTube](https://www.youtube.com/results?search_query=Qualidade+e+rastreabilidade+concurso) · [📄 PDFs](https://www.google.com/search?q=Qualidade+e+rastreabilidade+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Qualidade+e+rastreabilidade+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Qualidade+e+rastreabilidade+concurso+resumo)

- **5.1** Metadados, catálogo e linhagem
  - [▶️ YouTube](https://www.youtube.com/results?search_query=Metadados+cat%C3%A1logo+e+linhagem+concurso) · [📄 PDFs](https://www.google.com/search?q=Metadados+cat%C3%A1logo+e+linhagem+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Metadados+cat%C3%A1logo+e+linhagem+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Metadados+cat%C3%A1logo+e+linhagem+concurso+resumo)
- **5.2** Completude, consistência, validade, unicidade, acurácia e atualidade
  - [▶️ YouTube](https://www.youtube.com/results?search_query=Completude+consist%C3%AAncia+validade+unicidade+acur%C3%A1cia+e+atualidade+concurso) · [📄 PDFs](https://www.google.com/search?q=Completude+consist%C3%AAncia+validade+unicidade+acur%C3%A1cia+e+atualidade+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Completude+consist%C3%AAncia+validade+unicidade+acur%C3%A1cia+e+atualidade+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Completude+consist%C3%AAncia+validade+unicidade+acur%C3%A1cia+e+atualidade+concurso+resumo)
- **5.3** Perfilamento, deduplicação, vinculação de registros e enriquecimento
  - [▶️ YouTube](https://www.youtube.com/results?search_query=Perfilamento+deduplica%C3%A7%C3%A3o+vincula%C3%A7%C3%A3o+de+registros+e+enriquecimento+concurso) · [📄 PDFs](https://www.google.com/search?q=Perfilamento+deduplica%C3%A7%C3%A3o+vincula%C3%A7%C3%A3o+de+registros+e+enriquecimento+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Perfilamento+deduplica%C3%A7%C3%A3o+vincula%C3%A7%C3%A3o+de+registros+e+enriquecimento+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Perfilamento+deduplica%C3%A7%C3%A3o+vincula%C3%A7%C3%A3o+de+registros+e+enriquecimento+concurso+resumo)
- **5.4** Conciliação de fontes
  - [▶️ YouTube](https://www.youtube.com/results?search_query=Concilia%C3%A7%C3%A3o+de+fontes+concurso) · [📄 PDFs](https://www.google.com/search?q=Concilia%C3%A7%C3%A3o+de+fontes+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Concilia%C3%A7%C3%A3o+de+fontes+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Concilia%C3%A7%C3%A3o+de+fontes+concurso+resumo)
- **5.5** Riscos de correspondências incorretas entre pessoas ou entidades
  - [▶️ YouTube](https://www.youtube.com/results?search_query=Riscos+de+correspond%C3%AAncias+incorretas+entre+pessoas+ou+entidades+concurso) · [📄 PDFs](https://www.google.com/search?q=Riscos+de+correspond%C3%AAncias+incorretas+entre+pessoas+ou+entidades+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Riscos+de+correspond%C3%AAncias+incorretas+entre+pessoas+ou+entidades+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Riscos+de+correspond%C3%AAncias+incorretas+entre+pessoas+ou+entidades+concurso+resumo)

### 6 Compartilhamento e proteção

[▶️ YouTube](https://www.youtube.com/results?search_query=Compartilhamento+e+prote%C3%A7%C3%A3o+concurso) · [📄 PDFs](https://www.google.com/search?q=Compartilhamento+e+prote%C3%A7%C3%A3o+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Compartilhamento+e+prote%C3%A7%C3%A3o+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Compartilhamento+e+prote%C3%A7%C3%A3o+concurso+resumo)

- **6.1** Minimização, segregação de ambientes e privilégios
  - [▶️ YouTube](https://www.youtube.com/results?search_query=Minimiza%C3%A7%C3%A3o+segrega%C3%A7%C3%A3o+de+ambientes+e+privil%C3%A9gios+concurso) · [📄 PDFs](https://www.google.com/search?q=Minimiza%C3%A7%C3%A3o+segrega%C3%A7%C3%A3o+de+ambientes+e+privil%C3%A9gios+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Minimiza%C3%A7%C3%A3o+segrega%C3%A7%C3%A3o+de+ambientes+e+privil%C3%A9gios+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Minimiza%C3%A7%C3%A3o+segrega%C3%A7%C3%A3o+de+ambientes+e+privil%C3%A9gios+concurso+resumo)
- **6.2** Retenção e descarte
  - [▶️ YouTube](https://www.youtube.com/results?search_query=Reten%C3%A7%C3%A3o+e+descarte+concurso) · [📄 PDFs](https://www.google.com/search?q=Reten%C3%A7%C3%A3o+e+descarte+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Reten%C3%A7%C3%A3o+e+descarte+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Reten%C3%A7%C3%A3o+e+descarte+concurso+resumo)
- **6.3** Anonimização, pseudonimização e reidentificação
  - [▶️ YouTube](https://www.youtube.com/results?search_query=Anonimiza%C3%A7%C3%A3o+pseudonimiza%C3%A7%C3%A3o+e+reidentifica%C3%A7%C3%A3o+concurso) · [📄 PDFs](https://www.google.com/search?q=Anonimiza%C3%A7%C3%A3o+pseudonimiza%C3%A7%C3%A3o+e+reidentifica%C3%A7%C3%A3o+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Anonimiza%C3%A7%C3%A3o+pseudonimiza%C3%A7%C3%A3o+e+reidentifica%C3%A7%C3%A3o+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Anonimiza%C3%A7%C3%A3o+pseudonimiza%C3%A7%C3%A3o+e+reidentifica%C3%A7%C3%A3o+concurso+resumo)
- **6.4** Publicação, reutilização e compartilhamento controlados
  - [▶️ YouTube](https://www.youtube.com/results?search_query=Publica%C3%A7%C3%A3o+reutiliza%C3%A7%C3%A3o+e+compartilhamento+controlados+concurso) · [📄 PDFs](https://www.google.com/search?q=Publica%C3%A7%C3%A3o+reutiliza%C3%A7%C3%A3o+e+compartilhamento+controlados+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Publica%C3%A7%C3%A3o+reutiliza%C3%A7%C3%A3o+e+compartilhamento+controlados+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Publica%C3%A7%C3%A3o+reutiliza%C3%A7%C3%A3o+e+compartilhamento+controlados+concurso+resumo)
- **6.5** Proteção de dados pessoais e equilíbrio entre utilidade analítica, abertura e proteção de pessoas
  - [▶️ YouTube](https://www.youtube.com/results?search_query=Prote%C3%A7%C3%A3o+de+dados+pessoais+e+equil%C3%ADbrio+entre+utilidade+anal%C3%ADtica+concurso) · [📄 PDFs](https://www.google.com/search?q=Prote%C3%A7%C3%A3o+de+dados+pessoais+e+equil%C3%ADbrio+entre+utilidade+anal%C3%ADtica+filetype%3Apdf) · [📝 Questões Cebraspe](https://www.google.com/search?q=Prote%C3%A7%C3%A3o+de+dados+pessoais+e+equil%C3%ADbrio+entre+utilidade+anal%C3%ADtica+cebraspe+site%3Aqconcursos.com) · [📰 Artigos](https://www.google.com/search?q=Prote%C3%A7%C3%A3o+de+dados+pessoais+e+equil%C3%ADbrio+entre+utilidade+anal%C3%ADtica+concurso+resumo)
