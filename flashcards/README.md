# 🃏 Flashcards

Central de flashcards do repositório: como criar, onde ficam guardados, como revisar e como levar para o Anki.

## 📁 O que tem aqui

| Arquivo / pasta | Para quê |
|---|---|
| [`primeiros-passos-anki.md`](primeiros-passos-anki.md) | **Comece aqui**: instalar, configurar e importar no Anki |
| [`como-criar.md`](como-criar.md) | Regras para escrever um bom card + tipos de card com exemplos |
| [`base-de-dados.md`](base-de-dados.md) | Formato do banco (colunas, tags, IDs) |
| [`revisao-espacada.md`](revisao-espacada.md) | Como e quando revisar (repetição espaçada, Anki) |
| [`decisoes.md`](decisoes.md) | Registro das nossas conversas e decisões sobre flashcards |
| [`banco/`](banco/) | **Os cards**: um arquivo `.csv` por disciplina |
| [`scripts/exportar_anki.py`](scripts/exportar_anki.py) | Gera o arquivo pronto para importar no Anki |
| `exportados/` | Saída do script (arquivos para o Anki) |

## 🔄 Fluxo

```mermaid
flowchart LR
    A[Material / nota de estudo] --> B[Claude cria cards]
    B --> C[banco/disciplina.csv]
    C --> D[exportar_anki.py]
    D --> E[exportados/anki.txt]
    E --> F[Importar no Anki]
    F --> G[Revisão diária]
    G -->|errou / card ruim| H[Ajustar card no banco]
    H --> C
```

## 🗂️ Organização

- **Um arquivo por disciplina**: `banco/direito-administrativo.csv`, `banco/contabilidade-publica.csv`…
- **Tags** separam por concurso e tópico, então um card serve para vários concursos:
  `concurso::cgu-affc disciplina::direito-administrativo topico::atos-administrativos`
- No Anki isso vira um **baralho por disciplina**, com tags hierárquicas para filtrar.

## 📊 Bancos

| Disciplina | Arquivo | Cards |
|---|---|---|
| *(exemplo)* | [`_exemplo.csv`](banco/_exemplo.csv) | 5 |

*(As disciplinas entram aqui conforme os cards forem criados.)*
