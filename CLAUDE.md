# Instruções para o Claude — Repositório de Estudos para Concursos

Este repositório é a base de conhecimento do Eduardo para estudar para **vários concursos públicos**.
O Claude atua como organizador: lê os materiais enviados, escreve notas em Markdown e mantém o contexto de cada concurso (edital, progresso, cronograma).

## Estrutura

```
concursos/                      (raiz do repo)
├── CLAUDE.md                   → este arquivo (regras e contexto permanente)
├── README.md                   → índice geral: concursos ativos e disciplinas
├── _templates/                 → modelos de nota
├── conversas/                  → resumos de conversas Eduardo ↔ Claude (AAAA-MM-DD-tema.md)
├── ideias/                     → organização de pensamento, estratégia, planejamento
├── flashcards/                 → método, banco de cards (CSV por disciplina) e exportação p/ Anki
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
- **Flashcards** não ficam soltos na nota: vão para `flashcards/banco/<disciplina>.csv`, seguindo `flashcards/como-criar.md` e `flashcards/base-de-dados.md`. Decisões sobre flashcards → `flashcards/decisoes.md`.
  - **Só criar cards quando o Eduardo pedir** (pode sugerir tópicos). Limite de estudo: 20 novos/dia.
  - Ao criar cards, rodar `python3 flashcards/scripts/exportar_anki.py` e commitar `flashcards/exportados/` junto (o Eduardo não roda scripts).
- Não inventar conteúdo: se algo do material estiver incompleto ou duvidoso, marcar com `> [!NOTE] Verificar:`.

## Tipos de material e como tratar cada um

| Tipo | Como chega | O que fazer |
|---|---|---|
| ✍️ Manuscrito (PDF do tablet / foto de caderno) | PDF ou imagem | Ler página a página, **transcrever fielmente** para Markdown e depois organizar no modelo de nota. Palavras ilegíveis → `[ilegível: ?palpite]`. Desenhos/esquemas → recriar como tabela ou Mermaid. |
| 📄 PDF digitado (apostila, lei, slide) | PDF | Extrair só o que é relevante para o edital; resumir e citar a fonte (página). |
| 🖼️ Foto / print (lousa, questão, tabela) | Imagem | Transcrever o conteúdo; se for questão, ir para `revisao/questoes.md`. |
| 🎙️ Áudio / fala | Transcrição em texto (ditado do celular ou transcrição do app) | Limpar vícios de fala, manter as ideias do Eduardo, estruturar em tópicos. |
| 💬 Conversa com o Claude | Pedido "resume nossa conversa" | Salvar em `conversas/AAAA-MM-DD-<tema>.md`: dúvidas, explicações, conclusões. O conteúdo de estudo também vai para a nota da disciplina. |
| 🧠 Organização de pensamento | Texto livre / fala | Salvar em `ideias/AAAA-MM-DD-<tema>.md` (estratégia, planejamento, reflexões). Se virar decisão de estudo, refletir no `PROGRESSO.md`. |

**Regras gerais da transcrição**
- Transcrever primeiro, organizar depois: o conteúdo do Eduardo não pode se perder na reorganização.
- Marcar com `> [!NOTE] Verificar:` qualquer afirmação que pareça errada em relação à lei/doutrina — corrigir só com a fonte citada.
- Registrar na nota a origem: `Fonte: manuscrito 2026-10-28, p. 3`.

## Fluxo ao receber material
1. Salvar o original em `concursos/<concurso>/materiais-brutos/` (se for adequado versionar; nada de apostila paga com direitos autorais em repo público).
2. Identificar a disciplina e o tópico do edital correspondente.
3. Criar/atualizar a nota em `disciplinas/<disciplina>/`.
4. Atualizar o `PROGRESSO.md` do concurso e os índices (`README.md`).
5. Commit com mensagem descritiva em português e push.

## Concursos ativos
| Concurso | Pasta | Status |
|---|---|---|
| CGU — Auditor Federal de Finanças e Controle (Cebraspe; especialidade a confirmar, provável Cargo 1 – Auditoria) | `concursos/cgu-affc/` | Edital transcrito em `edital/edital-cgu-2026-12.md` · prova 13/12/2026 |
