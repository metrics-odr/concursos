# Instruções para o Claude — Repositório de Estudos para Concursos

Este repositório é a base de conhecimento do Eduardo para estudar para **vários concursos públicos**.
O Claude atua como organizador: lê os materiais enviados, escreve notas em Markdown e mantém o contexto de cada concurso (edital, progresso, cronograma).

## Estrutura

```
concursos/                      (raiz do repo)
├── CLAUDE.md                   → este arquivo (regras e contexto permanente)
├── README.md                   → índice geral: concursos ativos e disciplinas
├── _templates/                 → modelos de nota
├── disciplinas/                → notas COMPARTILHADAS entre concursos
│   └── <disciplina>/
│       ├── README.md           → índice da disciplina
│       └── NN-<topico>.md      → uma nota por tópico
└── concursos/
    └── <sigla-cargo>/          → ex.: cgu-affc
        ├── README.md           → ficha do concurso (banca, data, vagas, salário, status)
        ├── edital/             → edital original (PDF) + edital-resumo.md + conteudo-programatico.md
        ├── PROGRESSO.md        → checklist do edital ligando cada item à nota em disciplinas/
        ├── materiais-brutos/   → material enviado ainda não processado
        └── revisao/            → flashcards, pegadinhas, questões da banca, resumos de véspera
```

**Por que as disciplinas são compartilhadas:** matérias como Português, Direito Constitucional, Administrativo e Contabilidade se repetem entre concursos. A nota é escrita **uma vez** em `disciplinas/` e cada concurso aponta para ela no seu `PROGRESSO.md`. Particularidades de um concurso (ex.: lei específica do órgão) vão em `disciplinas/` também, mas com a tag do concurso no cabeçalho.

## Convenções de nomes
- Pastas e arquivos em `kebab-case`, sem acentos: `direito-administrativo/03-atos-administrativos.md`.
- Concursos: `<orgao>-<cargo>` (ex.: `cgu-affc`, `tcu-auditor`).
- Prefixo numérico `NN-` segue a ordem do conteúdo programático do edital.

## Estilo das notas
Usar o modelo em `_templates/nota-topico.md`. Sempre que fizer sentido:
- Títulos hierárquicos (`#`, `##`, `###`) e bullet points curtos.
- Setas (→, ⇒, ↔) para relações de causa, consequência e equivalência.
- **Tabelas** para comparações (ex.: tipos de controle, prazos, competências).
- **Diagramas Mermaid** (fluxogramas, mapas mentais) — o GitHub renderiza.
- Callouts do GitHub: `> [!IMPORTANT]`, `> [!WARNING]` (pegadinhas), `> [!TIP]`.
- Citar o dispositivo legal exato (lei, artigo, inciso) e a fonte do material.
- Fechar com: pegadinhas de prova, flashcards e questões de fixação.
- Não inventar conteúdo: se algo do material estiver incompleto ou duvidoso, marcar com `> [!NOTE] Verificar:`.

## Fluxo ao receber material
1. Salvar o original em `concursos/<concurso>/materiais-brutos/` (se for adequado versionar).
2. Identificar a disciplina e o tópico do edital correspondente.
3. Criar/atualizar a nota em `disciplinas/<disciplina>/`.
4. Atualizar o `PROGRESSO.md` do concurso e os índices (`README.md`).
5. Commit com mensagem descritiva em português e push.

## Concursos ativos
| Concurso | Pasta | Status |
|---|---|---|
| CGU — Auditor Federal de Finanças e Controle (área a confirmar) | `concursos/cgu-affc/` | Aguardando edital |
