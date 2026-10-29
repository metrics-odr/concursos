# 🗂️ Banco de questões reais

Questões de provas anteriores, **uma por arquivo**, classificadas pelos tópicos do edital da CGU.
É a base que o Claude usa para gerar questões no estilo Cebraspe (skill `gerar-questoes`) e para o mapa de lacunas ([[cobertura]]).

> [!IMPORTANT]
> Compartilhado entre concursos: uma prova entra uma vez só. Os tópicos (`topicos:`) usam os IDs de
> `concursos/cgu-affc/edital/topicos.json` (ex.: `ML.3.1`); a lista completa com os textos está em [[cobertura]].

## Estrutura

```
questoes/
├── _pdf/                                  → originais intocados, nomeados pelo padrão abaixo (prova-cebraspe-DD-MM-AAAA-…pdf)
└── <ano>-<orgao>-<cargo>/                 → ex.: 2022-petrobras-ciencia-de-dados
    ├── prova.md                           → metadados da prova (tipo: prova)
    ├── figuras/                           → figuras recortadas do caderno (png)
    ├── ceb-2022-petrobras-cd-tb01.md      → texto-base / comando compartilhado por vários itens (tipo: texto-base)
    └── ceb-2022-petrobras-cd-q051.md      → UM item por arquivo (nome = id em minúsculas)
```

## 📛 Padrão de nome dos arquivos de prova e gabarito

**Todo** arquivo de prova ou gabarito (PDF oficial ou gerado pelo Claude) segue:

```
<tipo>-<origem>-<DD-MM-AAAA>-<descricao>.<ext>
```

| Parte | Valores | Observação |
|---|---|---|
| `tipo` | `prova` · `gabarito` | o padrão de resposta da discursiva vai junto do gabarito |
| `origem` | a banca (`cebraspe`, `fgv`, `fcc`…) ou `claude` | `claude` = simulado/prova gerada pelo Claude, não é questão real |
| `DD-MM-AAAA` | data de **aplicação** da prova (oficial) ou de **criação** (Claude) | dia-mês-ano, com zeros: `16-02-2025` |
| `descricao` | `<orgao>-<cargo/assunto>` em kebab-case, sem acentos | gabarito oficial termina em `-definitivo` (ou `-preliminar`) |

Exemplos:

| Arquivo | Onde fica |
|---|---|
| `prova-cebraspe-16-02-2025-anm-especialista-ti-ciencia-de-dados.pdf` | `questoes/_pdf/` |
| `gabarito-cebraspe-16-02-2025-anm-todos-os-cargos-definitivo.pdf` | `questoes/_pdf/` |
| `prova-cebraspe-20-02-2022-petrobras-ciencia-de-dados.pdf` | `questoes/_pdf/` |
| `prova-claude-29-10-2026-ml-metricas-e-validacao.md` | `desafios/simulados/` |
| `gabarito-claude-29-10-2026-ml-metricas-e-validacao.md` | `desafios/simulados/` |

Regras:
- O Eduardo pode escrever o nome com espaços (`prova - cebraspe - 16-02-2025 - ANM ciência de dados`); no repositório vira **kebab-case, minúsculas, sem acentos e sem espaços** (o site e os links quebram com espaços/acentos).
- Mesma prova com nomes diferentes (ex.: baixada duas vezes) → comparar o conteúdo e manter **uma** cópia.
- Prova e gabarito da mesma aplicação têm **a mesma data e a mesma descrição** (exceto quando o gabarito cobre todos os cargos: `-todos-os-cargos-definitivo`).
- A pasta das questões continua `questoes/<ano>-<orgao>-<cargo>/` e os IDs `CEB-<ano>-<ORGAO>-<CARGO>-Q<nnn>` (o ano é o da aplicação).

## Frontmatter de cada questão

```yaml
---
id: CEB-2022-PETROBRAS-CD-Q051   # único e estável: CEB-<ano>-<ORGAO>-<CARGO>-Q<nº do item com 3 dígitos>
tipo: certo-errado               # certo-errado | multipla-escolha | discursiva
banca: Cebraspe
ano: 2022
orgao: Petrobras
cargo: Nível Superior – Ênfase 7
especialidade: Ciência de Dados
cargo_alvo: analogo              # sim = AFFC Ciência de Dados (CGU) · analogo = cargo parecido
topicos: [EP.3.1, EP.5.1]        # IDs do edital; [] se o assunto não cai na CGU
gabarito: C                      # C | E | A–E | null (anulada ou discursiva)
status: valida                   # valida | anulada | alterada (gabarito mudou do preliminar para o definitivo)
texto_base: CEB-2022-PETROBRAS-CD-TB01   # opcional: id do texto-base/comando
fonte_pdf: questoes/_pdf/prova-cebraspe-20-02-2022-petrobras-ciencia-de-dados.pdf
pagina: 5
---
Enunciado fiel ao original (fórmulas em LaTeX $...$, código em bloco, figura com ![[...]]).

## Comentário
Por que está certo/errado, com a regra e um link [[...]] para a nota em disciplinas/.
```

**Texto-base** (`tipo: texto-base`): `id`, `prova` (pasta), `itens: [51, 52]`, `pagina`; corpo = texto, figura e o comando (“julgue os itens…”), fiéis ao caderno.

**Prova** (`prova.md`, `tipo: prova`): `banca`, `ano`, `orgao`, `cargo`, `especialidade`, `cargo_alvo`, `aplicacao`, `itens`, `fonte_pdf`, `gabarito_pdf`, `gabarito: definitivo`, `anulados: [...]`.

## Regras
- Gabarito sempre do **definitivo** oficial; anulada → `status: anulada`, `gabarito: null`.
- Comentário só com fonte segura; sem comentário, deixar `> [!NOTE] Comentário pendente.` (não inventar).
- Depois de mexer aqui: `python3 scripts/build_indices.py && python3 scripts/validar.py`.

## Provas no banco
Lista gerada em `_indices/provas.json`; resumo e contagens em [[cobertura]].
