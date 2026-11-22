# Acervo TS

Sistema de acervo (livros e jogos eletrônicos) em TypeScript, usando POO.

## Como rodar

```bash
npm install
npm run dev     # executa direto com ts-node
npm run build   # compila src/ para dist/ com tsc
npm start       # roda o JavaScript compilado em dist/
```

## Onde cada requisito está

| Aula | Requisito | Onde |
|---|---|---|
| 1 | `src/`, `dist/`, `"strict": true`, ts-node/tsc | `tsconfig.json`, `package.json` |
| 2 | Parameter Properties, arrays de objetos | construtores em `ItemAcervo.ts`, `Livro.ts`, `JogoEletronico.ts`; array em `RepositorioMemoria.ts` |
| 3 | `private`, `readonly` no id, `emprestar()` / `devolver()` | `ItemAcervo.ts` |
| 4 | `get` calculado, `private static _contadorId` | `statusDisponibilidade`, `diasEmprestado`, `_contadorId` em `ItemAcervo.ts` |
| 5 | Classe abstrata, `calcularMulta`, `extends`, `super()`, `override` | `ItemAcervo.ts`, `Livro.ts`, `JogoEletronico.ts` |
| 6 | Interface `Reservavel` e `implements` | `Reservavel.ts`, `Livro.ts` |
| 7 | Generics, Utility Types, exceções | `RepositorioMemoria.ts`, `tipos.ts`, `erros.ts` |

## Regras de multa

- **Livro:** prazo de 14 dias, R$ 0,50 por dia de atraso, limitado a R$ 30,00.
- **Jogo:** prazo de 7 dias, taxa fixa de R$ 5,00 mais R$ 2,00 por dia de atraso.
