---
id: CEB-2022-PETROBRAS-CD-Q095
tipo: certo-errado
banca: Cebraspe
ano: 2022
orgao: Petrobras
cargo: Nível Superior – Ênfase 7
especialidade: Ciência de Dados
cargo_alvo: analogo
topicos: [ED.2.1, ED.1.1]
gabarito: null
status: anulada
texto_base: CEB-2022-PETROBRAS-CD-TB18
fonte_pdf: questoes/_pdf/2022-petrobras-ciencia-de-dados-prova.pdf
pagina: 9
---
> Texto-base / comando: [[ceb-2022-petrobras-cd-tb18]]

**95** Após a criação da tabela `Projeto`, a criação das chaves estrangeiras (FK) do relacionamento `Orienta` pode ser feita corretamente conforme a seguir.

```sql
ALTER TABLE Projeto ADD CONSTRAINT id_fk_responsavel FOREIGN
KEY(codPesquisadorResponsavel)
REFERENCES Pesquisador(codPesquisador);
```

## Comentário
> [!NOTE] Comentário pendente.
