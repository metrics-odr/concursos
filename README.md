# 📚 Concursos — Base de Estudos

Repositório pessoal de estudos para concursos públicos: editais, notas por disciplina, progresso e revisão.

## 🎯 Concursos

| Concurso | Banca | Prova | Status | Progresso |
|---|---|---|---|---|
| [CGU — AFFC](concursos/cgu-affc/README.md) | Cebraspe | 13/12/2026 | 📖 Edital publicado ([ver](concursos/cgu-affc/edital/edital-cgu-2026-12.md)) | [checklist](concursos/cgu-affc/PROGRESSO.md) |

## 🏛️ Fundamentos

Biblioteca de textos de base (contexto institucional e conceitual) em [`fundamentos/`](fundamentos/README.md):

- [01 — A CGU por dentro: o que é, como atua e o papel de cada especialidade](fundamentos/01-cgu-o-que-e-e-como-atua.md)

## 📖 Disciplinas

As notas ficam em [`disciplinas/`](disciplinas/) e são **compartilhadas entre concursos**: o mesmo tópico de Direito Administrativo serve para a CGU e para qualquer outro concurso.

*(Nenhuma disciplina cadastrada ainda. Elas serão criadas a partir do edital.)*

## 🗺️ Como funciona

```mermaid
flowchart LR
    A[Material enviado] --> B[materiais-brutos/]
    B --> C[Nota em disciplinas/]
    D[Edital] --> E[PROGRESSO.md do concurso]
    C --> E
    C --> F[revisao/: flashcards e pegadinhas]
```

🃏 [`flashcards/`](flashcards/) → banco de flashcards e exportação para o Anki

📁 [`conversas/`](conversas/) → resumos das nossas conversas · [`ideias/`](ideias/) → organização de pensamento

Modelo de nota: [`_templates/nota-topico.md`](_templates/nota-topico.md)
