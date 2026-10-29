# 📥 Caixa de entrada

Jogue aqui **qualquer material novo** (PDF de prova, gabarito, apostila, foto, .md solto) e peça ao Claude:
“**processa o inbox**”.

O Claude (skill `ingerir-material`):
1. roda `python3 scripts/extrair_pdf.py` (texto de cada PDF ao lado, em `<arquivo>.pdf.md`);
2. identifica o que é cada arquivo e move para o lugar certo (`questoes/`, `disciplinas/`, `concursos/<concurso>/materiais-brutos/`…);
3. quebra provas em uma questão por arquivo, com gabarito definitivo e tópicos do edital;
4. roda `build_indices.py` e `validar.py` e faz o commit.

O que não der para classificar com segurança vai para `_revisar/`, com um `.md` explicando a dúvida. Nada é chutado.

> [!WARNING]
> Repositório público: nada de apostila paga ou material com direitos autorais. Provas e gabaritos oficiais podem.
