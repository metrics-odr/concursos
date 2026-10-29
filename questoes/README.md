# 🗂️ Banco de questões reais

Questões de provas anteriores, **uma por arquivo**, classificadas pelos tópicos do edital da CGU.
É a base que o Claude usa para gerar questões no estilo Cebraspe (skill `gerar-questoes`) e para o mapa de lacunas ([[cobertura]]).

> [!IMPORTANT]
> Compartilhado entre concursos: uma prova entra uma vez só. Os tópicos (`topicos:`) usam os IDs de
> `concursos/cgu-affc/edital/topicos.json` (ex.: `ML.3.1`); a lista completa com os textos está em [[cobertura]].

## Estrutura

```
questoes/
├── _pdf/                                  → originais intocados: <ano>-<orgao>-<cargo>-prova.pdf / -gabarito.pdf
└── <ano>-<orgao>-<cargo>/                 → ex.: 2022-petrobras-ciencia-de-dados
    ├── prova.md                           → metadados da prova (tipo: prova)
    ├── figuras/                           → figuras recortadas do caderno (png)
    ├── ceb-2022-petrobras-cd-tb01.md      → texto-base / comando compartilhado por vários itens (tipo: texto-base)
    └── ceb-2022-petrobras-cd-q051.md      → UM item por arquivo (nome = id em minúsculas)
```

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
fonte_pdf: questoes/_pdf/2022-petrobras-ciencia-de-dados-prova.pdf
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
