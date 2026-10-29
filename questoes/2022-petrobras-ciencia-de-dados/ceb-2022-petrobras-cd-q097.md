---
id: CEB-2022-PETROBRAS-CD-Q097
tipo: certo-errado
banca: Cebraspe
ano: 2022
orgao: Petrobras
cargo: Nível Superior – Ênfase 7
especialidade: Ciência de Dados
cargo_alvo: analogo
topicos: [ED.2.1]
gabarito: E
status: valida
texto_base: CEB-2022-PETROBRAS-CD-TB18
fonte_pdf: questoes/_pdf/prova-cebraspe-20-02-2022-petrobras-ciencia-de-dados.pdf
pagina: 9
---
> Texto-base / comando: [[ceb-2022-petrobras-cd-tb18]]

**97** Por meio do comando SQL a seguir, é possível recuperar o nome dos pesquisadores responsáveis por projetos, seguido pelo nome de seu orientador, mas apenas os projetos orientados por `Pedro`.

```sql
select responsavel.nome nomeresponsavel,
orientador.nome nomeorientador,
tituloProjeto
from Pesquisador responsavel,
Pesquisador orientador, Projeto
where orientador.nome = 'Pedro'
andcodPesquisadorResponsavel = codPesqui
sador
and codPesquisadorOrientador =
codPesquisador;
```

## Comentário
> [!NOTE] Comentário pendente.
