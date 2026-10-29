---
id: CEB-2022-PETROBRAS-CD-Q094
tipo: certo-errado
banca: Cebraspe
ano: 2022
orgao: Petrobras
cargo: Nível Superior – Ênfase 7
especialidade: Ciência de Dados
cargo_alvo: analogo
topicos: [EP.4.1, ED.3.1]
gabarito: E
status: valida
texto_base: CEB-2022-PETROBRAS-CD-TB17
fonte_pdf: questoes/_pdf/prova-cebraspe-20-02-2022-petrobras-ciencia-de-dados.pdf
pagina: 8
---
> Texto-base / comando: [[ceb-2022-petrobras-cd-tb17]]

**94** O código abaixo permite importar apenas a última linha das duas primeiras colunas do arquivo pesquisa.csv.

```python
import os
os.chdir('D:/')
import pandas
dados=pandas.read_csv('pesquisa.csv',
header=None,usecols=[1,2],
skiprows = range(1,9))
```

## Comentário
> [!NOTE] Comentário pendente.
