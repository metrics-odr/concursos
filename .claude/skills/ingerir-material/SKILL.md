---
name: ingerir-material
description: Processa material novo do Eduardo — PDFs de prova e gabarito, apostilas, fotos, .md soltos — classificando, movendo para o lugar certo e quebrando provas em uma questão por arquivo com tópicos do edital. Use quando ele disser "subi um PDF", "processa o inbox", "coloquei uma prova", "adiciona essa prova ao banco", ou mandar link/arquivo de prova Cebraspe.
---

# Ingerir material novo

Regras gerais do repositório (tipos de material, transcrição fiel, nada de conteúdo pago): `CLAUDE.md`.
Formato do banco de questões: `questoes/README.md` (leia antes de criar arquivos lá).

## 1. Preparar
1. Listar `_inbox/` (ignorar `_revisar/` e `README.md`). Se o Eduardo mandou um link, baixar para `_inbox/` primeiro.
2. Rodar `python3 scripts/extrair_pdf.py` → cada PDF ganha `<arquivo>.pdf.md` com o texto bruto.
3. Texto bruto embaralha colunas, fórmulas e figuras: para provas, **renderizar as páginas** (`pdftoppm -r 110 -png`) e ler as imagens para transcrever fielmente.

## 2. Classificar cada arquivo
| É… | Vai para |
|---|---|
| Caderno de prova (com ou sem gabarito) | `questoes/_pdf/prova-<banca>-<DD-MM-AAAA>-<orgao>-<cargo>.pdf` + pasta `questoes/<ano>-<orgao>-<cargo>/` |
| Gabarito oficial | `questoes/_pdf/gabarito-<banca>-<DD-MM-AAAA>-<orgao>-<cargo>-definitivo.pdf` |

Nome dos PDFs: padrão `<tipo>-<origem>-<DD-MM-AAAA>-<descricao>` (data de aplicação) — detalhes em `questoes/README.md` → “Padrão de nome”. Arquivos repetidos (mesmo conteúdo, nomes diferentes) → comparar o texto (`pdftotext` + `diff`) e manter uma cópia.
| Edital | `concursos/<concurso>/edital/` |
| Resumo/nota de conteúdo, manuscrito, áudio transcrito | `disciplinas/<disciplina>/NN-<topico>.md` (modelo `_templates/nota-topico.md`, com `topicos: [IDs]` no frontmatter) |
| Material bruto do concurso | `concursos/<concurso>/materiais-brutos/` |
| Não dá para saber com segurança | `_inbox/_revisar/` + `<arquivo>.motivo.md` explicando a dúvida |

Mover com `git mv` quando o arquivo já estiver versionado. Apagar o `.pdf.md` temporário depois de usar.

## 3. Quebrar uma prova em questões
1. Só entram os itens de assuntos do edital da CGU (ou próximos). Itens de disciplinas totalmente fora (ex.: português de outra prova) ficam de fora — registrar isso no `prova.md`.
2. Gabarito: **sempre o definitivo** oficial. Sem gabarito definitivo → não criar as questões; deixar em `_revisar/` pedindo o gabarito.
3. Para cada bloco (texto-base + comando): um arquivo `tipo: texto-base`. Para cada item: um arquivo com o frontmatter de `questoes/README.md`, nome = id em minúsculas.
4. Figuras: recortar das páginas renderizadas para `questoes/<prova>/figuras/` e descrever em texto logo abaixo (a skill de geração lê texto, não imagem).
5. Tópicos: IDs de `concursos/cgu-affc/edital/topicos.json`, preferir o subitem (`ML.3.1`). Assunto fora do edital → `topicos: []`. Na dúvida entre dois, pôr os dois.
6. `cargo_alvo: sim` só para provas da própria CGU AFFC – Ciência de Dados; o resto é `analogo`.
7. Comentário: só com fonte segura (padrão de resposta, gabarito comentado oficial); senão `> [!NOTE] Comentário pendente.`
8. Escrever um gerador temporário (Python no scratchpad) com os blocos transcritos ajuda a manter os 60–120 arquivos consistentes (ver o `prova.md` da Petrobras 2022 como exemplo de resultado).

## 4. Fechar
1. `python3 scripts/build_indices.py && python3 scripts/validar.py` — corrigir até passar.
2. Se for prova nova, acrescentar 1–2 exemplos dela em `bancas/cebraspe/perfil.md` e marcar a prova como incluída em `concursos/cgu-affc/revisao/provas-cebraspe.md`.
3. Commit em português (“Banco de questões: <prova> (N itens)”) e push, seguindo as regras de publicação do `CLAUDE.md`.
4. Responder com: o que entrou, quantos itens (válidos/anulados), tópicos cobertos e o que ficou em `_revisar/`.
