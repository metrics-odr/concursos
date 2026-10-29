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
├── desafios/                   → desafio diário AAAA-MM-DD.md (gerado por GitHub Actions; o Eduardo só marca)
├── index.html + app/           → Área do Concurseiro (site no GitHub Pages)
├── scripts/                    → geradores (tópicos do edital, acervo, desafio, índice, verificação de links)
├── automacoes/                 → documentação de workflows, cron-job.org, Make e rotinas
├── .github/workflows/          → pages.yml (publica o site) · desafio-diario.yml
├── disciplinas/                → notas COMPARTILHADAS entre concursos
│   └── <disciplina>/
│       ├── README.md           → índice da disciplina
│       └── NN-<topico>.md      → uma nota por tópico
└── concursos/
    └── <sigla-cargo>/          → ex.: cgu-affc
        ├── README.md           → ficha do concurso (banca, data, vagas, salário, status)
        ├── edital/             → edital original (PDF) + edital-resumo.md + conteudo-programatico.md
        ├── PROGRESSO.md        → checklist do edital ligando cada item à nota em disciplinas/
        ├── acervo/             → onde/como estudar cada disciplina (curadoria.json → gerar_acervo.py)
        ├── nivelamento/        → prova de nivelamento (20 itens C/E): estrutura.json, banco/*.json, resultados/
        ├── materiais-brutos/   → material enviado ainda não processado
        └── revisao/            → provas Cebraspe, caderno de erros (questoes.md), resumos de véspera
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
| CGU — Auditor Federal de Finanças e Controle (Cebraspe) · **Cargo 2 – TI – Ciência de Dados** | `concursos/cgu-affc/` | Edital transcrito · checklist, acervo e provas prontos · prova 13/12/2026 |

## 🖥️ Área do Concurseiro (site)
- URL: <https://metrics-odr.github.io/concursos/> — publicada pelo workflow `pages.yml` a cada push na `main`.
- O app lê o repositório inteiro: qualquer `.md` novo aparece no explorer sem mexer no app. Ao criar notas, use links relativos ou `[[wikilinks]]`.
- `PROGRESSO.md`: o checklist entre `<!-- checklist:inicio -->` e `<!-- checklist:fim -->` é gerado por `scripts/edital_topicos.py --progresso`; só os emojis ⬜🟨✅🔁 mudam (o Eduardo marca pelo app).
- Acervo: para incluir fontes, editar `concursos/cgu-affc/acervo/curadoria.json`, rodar `python3 scripts/gerar_acervo.py` e `python3 scripts/verificar_links.py`. Só incluir links verificados.
- Nivelamento (aba 📊): `concursos/cgu-affc/nivelamento/` — banco de itens C/E por disciplina; validar com `python3 scripts/validar_nivelamento.py` ao mexer no banco/estrutura. Detalhes em `nivelamento/README.md`.
- Detalhes de workflows, cron-job.org e Make: `automacoes/README.md`.

## 🚀 Publicar (regra permanente)
Toda vez que uma alteração for commitada e enviada (push) para o branch de trabalho, **terminar a resposta com o botão “Publicar”**: usar a ferramenta `AskUserQuestion` com a pergunta “Publicar as alterações na Área do Concurseiro?” e as opções **“Publicar”** (primeira, recomendada) e **“Ainda não”**.
- Se o Eduardo escolher **Publicar**: abrir o PR do branch de trabalho para a `main` e **mesclar na hora** (merge), sem esperar revisão; depois acompanhar o workflow `pages.yml` até ficar verde e responder com o link da página publicada.
- Se o PR do branch já tiver sido mesclado antes, recriar o branch a partir da `main` atual antes de novos commits (nunca reaproveitar PR mesclado).
- Escolher Publicar vale só para aquela rodada de alterações; nas próximas, perguntar de novo.
