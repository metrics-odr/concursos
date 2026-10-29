---
titulo: Gabarito — Simulado Normalização (ED.1.1)
tipo: simulado
topicos: [ED.1.1]
atualizado: 2026-10-29
---
# Gabarito comentado — Normalização (ED.1.1)

| # | Gab. | Comentário |
|---|:---:|---|
| 1 | **C** | Valores múltiplos no mesmo campo = atributo multivalorado ⇒ viola a 1FN (domínio atômico, um único valor por tupla). |
| 2 | **E** | Colunas `tel1..tel3` são grupo repetitivo: limitam o modelo e mantêm o problema. Correto: tabela `Telefone(id_aluno, telefone)`. |
| 3 | **C** | `id_aluno → nome_aluno` com chave `(id_aluno, id_disciplina)` = dependência **parcial** ⇒ viola a 2FN (`nome_disciplina` também). |
| 4 | **C** | Dependência parcial só existe com chave composta; chave simples + 1FN ⇒ 2FN. |
| 5 | **E** | Transitiva é a 3FN; a 2FN elimina dependência **parcial**. |
| 6 | **C** | Gabarito oficial da questão real: definição de 2FN (não há dependência parcial). |
| 7 | **C** | `matricula → cod_depto → nome_depto` é transitiva ⇒ viola a 3FN. |
| 8 | **E** | Essa tolerância (dependente primo) é da **3FN**; na FNBC todo determinante de DF não trivial é superchave. |
| 9 | **C** | Definição de integridade referencial (FK nula ou apontando para PK existente). |
| 10 | **C** | Gabarito oficial: UNIQUE garante unicidade de chaves alternativas. |
| 11 | **E** | Conceitos distintos: formas normais (projeto de esquema, ED) × normalização de variáveis (escalonamento; EP.5.1). |
| 12 | **C** | Em DW/analítico a desnormalização é deliberada (menos junções, mais redundância). |

**Placar Cebraspe:** acerto +1, erro −1, branco 0. Itens errados → registre em `concursos/cgu-affc/revisao/questoes.md`.
