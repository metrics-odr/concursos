# Cursos (playlists e vídeos do YouTube)

Lista compartilhada entre todos os concursos. Aparece na aba **🎓 Cursos** da Área do Concurseiro.

Para adicionar um curso ou vídeo, edite `cursos.json` (campo `itens`):

- `tipo`: `playlist` ou `video`
- `id`: ID da playlist (`PL…`) ou do vídeo (11 caracteres)
- `titulo`, `canal`, `descricao`, `disciplina`, `topicos` (IDs do edital, opcional)
- `videos` (só playlist): lista de `{id, titulo}`
