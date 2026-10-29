---
titulo: Simulado — Normalização e integridade (ED.1.1)
tipo: simulado
banca: Cebraspe
topicos: [ED.1.1]
atualizado: 2026-10-29
---
# Simulado — Normalização e integridade (ED.1.1)

🏛️ **Banca: Cebraspe** · itens Certo/Errado (cada errado anula um certo)

Gabarito: `gabarito-claude-29-10-2026-ed-normalizacao.md` (só abra depois de responder).

**Texto-base.** Uma tabela `Matricula(id_aluno, id_disciplina, nome_aluno, nome_disciplina, nota, telefones)` armazena, em `telefones`, vários números separados por vírgula. A chave primária é composta por `id_aluno` e `id_disciplina`.

Considerando o texto-base e os conceitos de normalização e integridade em bancos relacionais, julgue os itens a seguir.

1. A tabela viola a 1FN, pois o atributo `telefones` armazena mais de um valor por tupla.   [INÉDITA · Banca Cebraspe]
2. Substituir `telefones` por três colunas (`tel1`, `tel2`, `tel3`) resolve integralmente a violação da 1FN.   [INÉDITA · Banca Cebraspe]
3. O atributo `nome_aluno`, que depende apenas de `id_aluno`, caracteriza dependência parcial da chave e impede que a tabela esteja na 2FN.   [INÉDITA · Banca Cebraspe]
4. Uma tabela em 1FN cuja chave primária é formada por um único atributo não pode violar a 2FN.   [INÉDITA · Banca Cebraspe]
5. A eliminação de dependências transitivas entre atributos não chave é o objetivo da 2FN.   [ADAPTADA de flashcard eagd-0002 · Banca Cebraspe]
6. Quando todas as colunas não chave de uma tabela dependem de toda a chave composta, essa tabela está na segunda forma normal (2FN).   [REPRODUZIDA de CEB-2025-ANM-CD-Q104 · Banca Cebraspe]
7. Na tabela `Funcionario(matricula, cod_depto, nome_depto)`, com `matricula → cod_depto` e `cod_depto → nome_depto`, há dependência transitiva, o que viola a 3FN.   [INÉDITA · Banca Cebraspe]
8. Uma tabela na FNBC pode possuir dependência funcional não trivial cujo determinante não seja superchave, desde que o dependente seja atributo primo.   [INÉDITA · Banca Cebraspe]
9. A integridade referencial garante que o valor de uma chave estrangeira seja nulo ou corresponda a uma chave existente na tabela referenciada.   [INÉDITA · Banca Cebraspe]
10. A cláusula UNIQUE deve ser aplicada a chaves alternativas, que não a chave primária, para garantir a não duplicidade da chave alternativa.   [REPRODUZIDA de CEB-2025-ANM-CD-Q102 · Banca Cebraspe]
11. A normalização em bancos relacionais e a normalização de variáveis numéricas em preparação de dados para aprendizado de máquina referem-se ao mesmo procedimento.   [INÉDITA · Banca Cebraspe]
12. Em um data warehouse com esquema estrela, é comum desnormalizar dimensões para reduzir junções, aceitando maior redundância.   [INÉDITA · Banca Cebraspe]
