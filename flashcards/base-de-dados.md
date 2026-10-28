# 🗄️ Base de dados dos flashcards

## Formato
- **Arquivo:** `banco/<disciplina>.csv` (UTF-8, separador vírgula, campos entre aspas).
- O GitHub mostra o CSV como **tabela pesquisável**.
- Arquivos que começam com `_` (ex.: `_exemplo.csv`) são ignorados na exportação.

## Colunas

| Coluna | Obrigatória | Descrição | Exemplo |
|---|---|---|---|
| `id` | ✅ | Sigla da disciplina + número sequencial, **nunca reutilizar** | `dadm-0001` |
| `tipo` | ✅ | `basico`, `invertido`, `cloze`, `vf`, `comparacao` | `basico` |
| `frente` | ✅ | Pergunta / afirmação / texto com `{{c1::...}}` | |
| `verso` | ✅ | Resposta (no cloze: comentário extra, opcional) | |
| `topico` | ✅ | Tópico em kebab-case (bate com a nota em `disciplinas/`) | `principios` |
| `concursos` | ✅ | Concursos onde cai, separados por espaço | `cgu-affc` |
| `fonte` | ➖ | Lei/artigo, material ou nota de origem | `CF, art. 37` |
| `criado` | ✅ | Data de criação | `2026-10-28` |

## 🏷️ Tags geradas no Anki
O script monta as tags a partir das colunas:

```
disciplina::direito-administrativo  topico::principios  concurso::cgu-affc  tipo::basico
```

→ Permite estudar **só um concurso**, **só um tópico** ou **só pegadinhas** (`tipo::vf`) com uma busca no Anki.

## 🔤 Siglas das disciplinas (prefixo do id)

| Sigla | Disciplina |
|---|---|
| `ex` | Exemplo |

*(A tabela cresce conforme as disciplinas do edital forem criadas.)*

## 📤 Exportar para o Anki

```bash
python3 flashcards/scripts/exportar_anki.py
```

Gera os arquivos em `flashcards/exportados/` (`anki-basico.txt`, `anki-invertido.txt`, `anki-cloze.txt`). Para exportar só um concurso: `python3 flashcards/scripts/exportar_anki.py cgu-affc`.

No Anki: **Arquivo → Importar** → escolher o arquivo → conferir o tipo de nota. Os cabeçalhos do arquivo já configuram separador, baralho e tags, e o `id` evita duplicar cards ao reimportar.

> [!NOTE]
> Cards `basico`, `invertido`, `vf` e `comparacao` são importados no tipo de nota **Básico** (ou **Básico (e cartão invertido)** para `invertido`); `cloze` vai para o tipo **Omissão de palavras / Cloze**. Por isso o script gera **um arquivo por tipo de nota**.
