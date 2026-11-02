# 🔎 Garimpo de provas Cebraspe — itens dos temas da CGU (Cargos 2 e 3)

> Levantamento de 2026-11-02. **🏛️ Banca: Cebraspe** em todas as provas. PDFs baixados e lidos nesta data.

> [!WARNING]
> **Gabarito NÃO oficial.** Não consegui localizar o gabarito definitivo de nenhuma destas provas (o Cebraspe só o publica na área do candidato). As respostas abaixo foram **resolvidas e interpretadas por mim** — onde a resposta depende de interpretação, marquei com `~`. Confira com o gabarito oficial quando o tiver.

## Provas

| Ano | Banca | Concurso | PDF | Formato | Foco |
|:--:|---|---|---|---|---|
| 2026 (edital 2025) | Cebraspe | TCU – Auditor Federal de Controle Externo, Auditoria de TI (AUFC) | [PDF](https://arquivos.qconcursos.com/prova/arquivo_prova/146630/cespe-cebraspe-2026-tcu-auditor-federal-de-controle-externo-area-de-controle-externo-orientacao-auditoria-de-tecnologia-da-informacao-prova.pdf) | C/E, itens 101–200 específicos | ⭐ Cargo 3 e Cargo 2 |
| 2025 | Cebraspe | SEFAZ-SE – Auditor, Análise de Dados (P3) | [PDF](https://cdn.cebraspe.org.br/concursos/sefaz_se_25_auditor/arquivos/624881901E6864718BBE688CD40C2860CE6B13F1EE789221EFF7404DDB66E40C.pdf) | múltipla escolha, questões 91–110 | Cargo 2 |
| 2024 | Cebraspe | Funpresp-Exe – Analista (conhecimentos específicos) | [PDF](https://cdn.cebraspe.org.br/concursos/funpresp_24_exe/arquivos/040_FUNPRESPEXE_008_01.PDF) | C/E, itens 56–90 | Cargo 2 |
| 2023 | Cebraspe | CTI Renato Archer – Tecnologista Pleno | [PDF](https://arquivos.qconcursos.com/prova/arquivo_prova/103025/cespe-cebraspe-2024-cti-tecnologista-pleno-2-i-especialidade-tecnologias-habilitadoras-area-de-atuacao-inteligencia-artificial-e-ciencias-de-dados-prova.pdf) | C/E | o PDF traz só trecho (específicos a partir do item 51; só vi 51–54) |

Baixados mas **não processados** (ficam para a próxima rodada): [TCE-MS 2025 TI](https://cdn.cebraspe.org.br/concursos/tce_ms_25/arquivos/91F14B9C2E9EA64EC21D23D16A19FB81C245FEFA0C5A0A5AB4D5D231A5BC83DA.pdf), [SEFAZ-SE 2025 TI](https://cdn.cebraspe.org.br/concursos/sefaz_se_25_auditor/arquivos/F2DF078E18C57C4C205666B52B19C8FA823D2A4ACC43B1A0E31C0C05D6C7F3D0.pdf), [SEFA-PR 2025](https://cdn.cebraspe.org.br/concursos/sefa_pr_25/arquivos/34B92116AFD6A45F9DBF6735630F19C6A93B48B83D62DDF91F810C9C102F79E8.pdf), [SERPRO 2021 Ciência de Dados](https://arquivos.qconcursos.com/prova/arquivo_prova/81870/cespe-cebraspe-2021-serpro-analista-especializacao-ciencia-de-dados-prova.pdf).

---

## 1. TCU/AUFC 2026 — Auditoria de TI (itens C/E, números do caderno)

### Cargo 3 — Redes, sistemas e plataformas de dados
| Item | Assunto | Gab.~ | Porquê |
|:--:|---|:--:|---|
| 101 | ARP stateless, IP→MAC, mesmo domínio de broadcast | C | descrição correta |
| 102 | Hiperconvergência com "controlador centralizado" | E | arquitetura distribuída |
| 103 | LFS: escritas como anexações sequenciais ao log | C | |
| 104 | Hardening de controladores de domínio (MFA, remover serviços) | C | |
| 105 | OSPF com "mais flooding de LSA" com IPv6 em topologia estável | E | OSPFv3 suporta IPv6; flooding não aumenta em topologia estável |
| 106 | Wi-Fi 6 OFDMA "ideal para alta latência" | E | |
| 107 | IPv6 na camada de transporte | E | camada de rede |
| 113 | CSV representa tabelas com rótulos | C | |
| 114 | REST exige servidor guardar estado da sessão | E | REST é stateless |
| 115 | MongoDB em JSON ou XML | E | BSON/JSON |
| 116 | PolyBase consulta fontes externas | C | |
| 122 | S3 usa buckets | C | |
| 158 | Armazenamento em objeto, com metadados | C | |

### Cargo 3 — Nuvem, virtualização e automação
| Item | Assunto | Gab.~ | Porquê |
|:--:|---|:--:|---|
| 124 | PaaS: provedor responde por SO **e aplicações** | E | aplicações são do cliente |
| 125 | Serverless Framework, branch deployments | C | |
| 126 | ProcessPoolExecutor: tempo total ≈ 8 s | E | o log do próprio item mostra ~13 s |
| 127 | Service mesh: CCC a cargo de cada microsserviço | E | ficam nos proxies |
| 130 | Dockerfile multi-stage `COPY --from=builder` | C | |
| 133 | Workflow GitHub Actions (`label`/`page_build`) | E | gatilhos errados |
| 136 | SonarQube/Jenkins `abortPipeline: true` não interrompe | E | interrompe |
| 151 | Docker e Kubernetes intercambiáveis | E | |
| 152 | Serverless abstrai a infraestrutura | C | |
| 155 | FinOps | C | |
| 156 | CI/CD | C | |
| 157 | Alta disponibilidade só com várias AZ no mesmo data center | E | exige replicação geográfica |
| 160 | Multicloud reduz dependência | C | |
| 161 | Lift and shift = reescrita completa | E | é migração sem reescrita |
| 119 | CI/CD em "duas etapas sequenciais" | E | |

### Cargo 3 — Cibersegurança e privacidade
| Item | Assunto | Gab.~ | Porquê |
|:--:|---|:--:|---|
| 128 | JWT: header/payload legíveis sem chave | C | |
| 137 | Backdoor em malware fileless | C | |
| 138 | SAML com authorization server OAuth2 emitindo assertions | E | quem emite é o IdP |
| 139 | Privacidade por padrão com coleta ampliada | E | |
| 140 | Keylogger fileless depende de rootkit | E | |
| 141 | Proxy + SIEM para detecção | C | |
| 142 | Validação no cliente basta contra injeção | E | |
| 143 | Senha + app autenticador = MFA | C | |
| 144 | SIEM elimina IPS | E | |
| 145 | ATT&CK: táticas substituem técnicas | E | |
| 146 | NIST CSF Identify ↔ CIS inventário | C | |
| 147 | Contenção por isolamento | C | |
| 148 | Privilégio mínimo reduz superfície | C | |
| 149 | TLS em trânsito + simétrica em repouso | C | |
| 150 | ARP spoofing depende de IP spoofing | E | |
| 153 | Zero Trust confia em VPN | E | |
| 154 | RBAC ineficaz p/ menor privilégio | E | |
| 162 | Nuvem no governo e LGPD | C | |

### Cargo 3 — Operação, governança e gestão de serviços
| Item | Assunto | Gab.~ | Porquê |
|:--:|---|:--:|---|
| 108 | ITIL 4: propósito do gerenciamento de incidente | E | descreve gerenciamento de problema |
| 109 | CMDB, mais ICs = análise de impacto exata | E | |
| 110 | Federação de dados no CMDB | E~ | a justificativa dada é incoerente |
| 111, 112 | SVC não linear; SVS configurável | C, C | |
| 183 | SLA mede desempenho de contratos | C | |
| 191 | ITIL 4: dimensão parceiros e fornecedores | E | |
| 192 | "Progredir iterativamente" ↔ SVC | C~ | |
| 193, 194 | COBIT 2019: 40 objetivos/5 domínios; conceito de governança | C, C | |
| 195 | COBIT: papéis de gestão e governança invertidos | E | |
| 198 | Daily scrum: SM define tarefas | E | |
| 200 | Kanban: lead time medido do commitment | E | isso é cycle time |

### Cargo 2 — Engenharia/governança de dados
| Item | Assunto | Gab.~ | Porquê |
|:--:|---|:--:|---|
| 117 | DW não volátil ⇒ ETL faz todos os tratamentos | E | |
| 118 | Data mesh: propriedade de domínio | C | |
| 120 | Data lake acessa bases externas, DW não | E | |
| 121 | Governança de dados previne riscos | C | |
| 123 | Governança de dados: equipe×alta administração invertidos | E | |

### Cargo 2 — ML/IA
| Item | Assunto | Gab.~ | Porquê |
|:--:|---|:--:|---|
| 163 | Explicabilidade/interpretabilidade e caixa-preta | C | |
| 164 | Discriminação algorítmica | C | |
| 165 | Explicabilidade = propriedades internas | E~ | isso é interpretabilidade |
| 166 | Emergência intencionalmente projetada | E | |
| 167 | NER supervisionado precisa de texto anotado | C | |
| 168 | Transformers dispensam pré-processamento | E | |
| 169 | Sistemas multiagentes | C | |
| 170 | Word2Vec com atenção e várias camadas | E | |
| 174 | Reforço = não supervisionado | E | |
| 175 | Reforço × supervisionado | C | |
| 176 | Dispensar validação em conjunto separado | E | |

### Cargo 2 — Operação/MLOps e contratação
| Item | Assunto | Gab.~ | Porquê |
|:--:|---|:--:|---|
| 171 | Orquestração MLOps só no treino | E | |
| 172 | Definição de MLOps | C | |
| 173 | Versionamento de modelos, rollback | C | |
| 177 | ETP substitui TR | E | |
| 178 | Etapa inicial = TR | E | |
| 179 | Fábrica de software por ponto de função | C | |
| 180 | Cessão de direitos patrimoniais do código | C | |
| 181 | SaaS: contratante gerencia infra/SO | E | |
| 189 | LGPD em contratos de TI: registro de operações | C | |
| 190 | Requisitos técnicos e não funcionais no TR | C | |

---

## 2. SEFAZ-SE 2025 — Análise de Dados (múltipla escolha, Q91–108)

| Q | Assunto | Gab.~ |
|:--:|---|:--:|
| 91 | Dados estruturados e esquemas rígidos | E |
| 92 | Dados abertos | C |
| 93 | Integração: modelo unificado e dicionário de dados | D |
| 94 | Bancos relacionais, integridade referencial | A |
| 95 | Metadados | E |
| 96 | Tabela como materialização de relação | D~ (as demais são claramente erradas) |
| 97 | View como restrição de acesso | C |
| 98 | Índice composto e ordem das colunas | B |
| 99 | Chave estrangeira | D |
| 100 | Modelagem dimensional | D |
| 101 | Discretização por histograma | B |
| 102 | Sobreajuste | E |
| 103 | Árvore de decisão: percurso da raiz à folha | E |
| 104 | Apriori: confiança | B |
| 105 | Limitação do k-means: definir k antes | E |
| 106 | Big Data jurídico, 5 Vs | A~ ou C~ (ambígua) |
| 107 | Média 16,12 > mediana 15,2 (assimetria positiva) | A |
| 108 | Dispersão p/ duas variáveis quantitativas | D |

(Q109–110, SQL de auditorias, não revisados.)

## 3. Funpresp-Exe 2024 — itens C/E

| Item | Assunto | Gab.~ |
|:--:|---|:--:|
| 56 | Relacional "com medidas e dimensões" | E |
| 57 | Árvore de decisão p/ resposta binária | C~ |
| 58 | ARIMA / séries temporais | C |
| 59 | Cinco etapas de modelagem estatística | E |
| 60 | Pandas DataFrame | C |
| 61 | Spyder genérica, sem foco | E |
| 62 | `x==y` após `sorted` e `sort` → False | C |
| 63 | Pingouin | C |
| 68 | `LIMIT 5, 10` | C |
| 69–71 | DCL, DML, CRUD | C, C, C |
| 72 | `GROUP BY` conta pessoas por país | C |
| 73 | Tabela fato × dimensão | C |
| 74 | Normalização excessiva "sempre evitada" | E |
| 75 | Chave primária | C |
| 76 | Forma normal de Boyce-Codd | C |
| 78 | Regressão linear sensível a outliers | C |
| 79 | Árvores de decisão | C |
| 80 | Scikit-learn | C |
| 81 | Amostra maior, estimativa mais precisa | C |
| 84 | Local outlier factor | C |
| 85 | Normalização e escala | C~ |
| 86 | One-hot "sempre reduz" dimensionalidade | E |
| 87 | Cor tem pouca influência | E |
| 88, 89 | Dashboards; barras | C, C |
| 90 | Pizza p/ grandes conjuntos | E |

## 4. CTI 2023 — trecho
Itens 51–54 (redes neurais/IA): só foram lidos 4 itens; gabarito não resolvido.

---

> [!NOTE] Verificar:
> Itens com `~` dependem de interpretação do enunciado. O Cargo 3 (Infraestrutura) ainda não tem IDs de tópico no repositório; o agrupamento acima foi feito pelo assunto do item.
