# 🗄️ Base de dados dos flashcards

## Formato
- **Arquivo:** `banco/<slug-da-disciplina>.csv` (UTF-8, separador vírgula, campos entre aspas). O nome **tem que ser o `slug` do edital** (`concursos/cgu-affc/edital/topicos.json`) para a matéria aparecer no menu P1/P2/P3 do app.
- O GitHub mostra o CSV como **tabela pesquisável**.
- Arquivos que começam com `_` (ex.: `_exemplo.csv`) são ignorados na exportação.

## Colunas

| Coluna | Obrigatória | Descrição | Exemplo |
|---|---|---|---|
| `id` | ✅ | Sigla da disciplina + número sequencial, **nunca reutilizar** | `dadm-0001` |
| `tipo` | ✅ | **`ce`** (padrão — item Cebraspe Certo/Errado), `basico`, `invertido`, `cloze`, `vf`, `comparacao` | `ce` |
| `frente` | ✅ | No `ce`: o **item** (afirmação a julgar, sem “(C/E)”). Nos outros: pergunta / texto com `{{c1::...}}` | |
| `verso` | ✅ | No `ce`: começa com **`Certo.`** ou **`Errado.`** + justificativa curta (o app lê o gabarito daí). Nos outros: resposta | `Errado. Isso é a 3FN…` |
| `topico` | ✅ | Tópico em kebab-case (bate com a nota em `disciplinas/`) | `principios` |
| `concursos` | ✅ | Concursos onde cai, separados por espaço | `cgu-affc` |
| `fonte` | ➖ | Lei/artigo, material ou nota de origem | `CF, art. 37` |
| `criado` | ✅ | Data de criação | `2026-10-28` |

## 🏷️ Tags geradas no Anki
O script monta as tags a partir das colunas:

```
disciplina::direito-administrativo  topico::principios  concurso::cgu-affc  tipo::basico
```

→ Permite estudar **só um concurso**, **só um tópico** ou **só itens C/E** (`tipo::ce`) com uma busca no Anki.

## 🔤 Siglas das disciplinas (prefixo do id)

| Sigla | Disciplina |
|---|---|
| `cpe` | P1 · Estado, Democracia, Direitos e Ciência Política |
| `etp` | P1 · Ética Pública e Responsabilidade Profissional |
| `app` | P1 · Administração Pública e Fundamentos de Políticas Públicas |
| `gri` | P2 · Fundamentos de Governança, Riscos e Integridade Pública e Privada |
| `tops` | P2 · Fundamentos de Transparência, Ouvidoria e Participação Social |
| `dpc` | P2 · Fundamentos de Direito Público Aplicado, Controle e Responsabilização |
| `edia` | P2 · Fundamentos de Evidências, Dados e Inteligência Artificial |
| `agc` | P2 · Fundamentos de Auditoria Governamental e Atuação Integrada da CGU |
| `epad` | P3 · Estatística, Programação e Análise de Dados |
| `eagd` | P3 · Engenharia, Arquitetura e Governança de Dados |
| `amia` | P3 · Aprendizado de Máquina e Inteligência Artificial |
| `omia` | P3 · Operação, Governança e Gestão de Soluções de Dados e IA |
| `ex` | Exemplo |

*(Sociedade Brasileira ainda sem cards → sigla `sbr` reservada.)*

## 📤 Exportar para o Anki

```bash
python3 flashcards/scripts/exportar_anki.py
```

Gera os arquivos em `flashcards/exportados/` (`anki-basico.txt`, `anki-invertido.txt`, `anki-cloze.txt`). Para exportar só um concurso: `python3 flashcards/scripts/exportar_anki.py cgu-affc`.

No Anki: **Arquivo → Importar** → escolher o arquivo → conferir o tipo de nota. Os cabeçalhos do arquivo já configuram separador, baralho e tags, e o `id` evita duplicar cards ao reimportar.

> [!NOTE]
> Cards `ce`, `basico`, `invertido`, `vf` e `comparacao` são importados no tipo de nota **Básico** (ou **Básico (e cartão invertido)** para `invertido`); `cloze` vai para o tipo **Omissão de palavras / Cloze**. Por isso o script gera **um arquivo por tipo de nota**.
