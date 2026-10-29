# 📊 Prova de nivelamento — CGU AFFC · Cargo 2 (TI – Ciência de Dados)

Página: <https://metrics-odr.github.io/concursos/#/nivelamento> (aba **📊 Nivelamento** da Área do Concurseiro).

## Como funciona
- **20 itens Certo/Errado** no estilo Cebraspe: certo soma o peso, errado **subtrai** o peso, branco vale zero.
- **Estrutura fixa** (`estrutura.json`): cada disciplina tem uma cota de itens; os **pesos** são os da prova real (P1 e P2 = 1; P3 = 2).
- **Itens variam a cada execução**: dentro da cota de cada disciplina, o sorteio escolhe o **tópico menos visto** e, nele, o **item menos visto** (o histórico entra na conta). Gabaritos C/E ficam equilibrados.
- Ao finalizar, o resultado é **salvo** (neste navegador e, com o token do GitHub configurado em ⚙️, em `resultados/AAAA-MM-DD-HHMM.md`) e a página mostra o **diagnóstico**.

| Prova | Itens | Peso | Pontos | Prova real |
|---|:-:|:-:|:-:|---|
| P1 – Básicos (4 disciplinas, 1 item cada) | 4 | 1 | 4 | 40 itens · mín. 8 |
| P2 – Complementares (5 disciplinas, 1 item cada) | 5 | 1 | 5 | 40 itens · mín. 12 |
| P3 – Específicos (Estatística 2 · Engenharia 3 · ML/IA 3 · MLOps 3) | 11 | 2 | 22 | 90 itens · mín. 54 |

A P3 vale ~71% dos pontos aqui (≈69% na prova real).

## Diagnóstico
- **Pontos a recuperar** por disciplina = pontos que ela vale na prova real × (1 − aproveitamento líquido). A lista é ordenada por esse valor.
- **Situação**: 🟢 ≥ 70% · 🟡 40–70% · 🔴 < 40%. **Tempo** = divisão sugerida das horas de estudo proporcional aos pontos a recuperar.
- Por disciplina 🟡/🔴, lista os **tópicos** com erro/branco, cruzando com o status do `PROGRESSO.md` (ex.: marcado ✅ mas errou → revisar).
- **Projeção** = nota líquida extrapolada para os 170 itens reais, comparada com os mínimos do edital (P1 8 · P2 12 · P3 54 · total 78).
- Dicas automáticas: excesso de erros (chute), excesso de brancos, P3 abaixo do mínimo.

> [!WARNING]
> Com 20 itens o resultado é um **indício**, não uma medida. Refaça de tempos em tempos e compare no histórico.

## Arquivos
- `estrutura.json` — provas, pesos, cotas por disciplina e tópicos cobertos.
- `banco/<disciplina>.json` — itens (`id`, `t` tópico, `g` gabarito C/E, `q` enunciado, `j` justificativa, `f` fonte). **Todo tópico do edital tem item.**
- `resultados/` — resultados salvos (com o diagnóstico em Markdown).
- `python3 scripts/validar_nivelamento.py` — confere estrutura × edital × banco (roda no workflow `pages.yml`).

> [!NOTE] Verificar:
> Os itens foram elaborados a partir do edital e de legislação/doutrina de conhecimento geral, sem consulta a fonte no momento da escrita. Ao errar um item que pareça duvidoso, confira a lei/fonte citada e peça ao Claude para corrigir o banco.

## Ampliar o banco
Peça ao Claude para incluir itens (idealmente ≥ 2× a cota de cada disciplina, para variar mais).
