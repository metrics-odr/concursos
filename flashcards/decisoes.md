# 📝 Decisões e conversas sobre flashcards

Registro do que combinamos sobre flashcards. Entradas mais recentes no topo.

---

## 2026-10-28 — Preferências do Eduardo
| Pergunta | Resposta | Consequência |
|---|---|---|
| Usa algum app de flashcards? | Não, nunca usou | Ferramenta adotada: **Anki** → guia [`primeiros-passos-anki.md`](primeiros-passos-anki.md) |
| Cards novos por dia | **20** | Limite configurado no Anki; reavaliar se as revisões passarem de ~40 min/dia |
| Criação de cards | **Só quando o Eduardo pedir** | O Claude **não** cria cards automaticamente ao escrever notas; pode sugerir tópicos bons para cards |

- Como o Eduardo não vai rodar scripts, o Claude roda `exportar_anki.py` e envia os arquivos de `exportados/` junto com cada lote de cards.

## 2026-10-28 — Criação da pasta
- Pasta própria `flashcards/` para tudo sobre flashcards: método, banco, revisão, exportação.
- **Banco em CSV**, um arquivo por disciplina → legível no GitHub e exportável para o Anki.
- Cards **compartilhados entre concursos**; a coluna `concursos` + tags filtram o que é de cada um.
- Ferramenta de revisão sugerida: **Anki**.

### Em aberto
- [x] Você já usa Anki ou outro app? → não; adotado Anki
- [x] Quantos cards novos por dia? → 20
- [x] Criar cards automaticamente ou sob pedido? → sob pedido
