"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Livro_1 = require("./Livro");
const JogoEletronico_1 = require("./JogoEletronico");
const Reservavel_1 = require("./Reservavel");
const RepositorioMemoria_1 = require("./RepositorioMemoria");
const tipos_1 = require("./tipos");
const erros_1 = require("./erros");
const DIA = 1000 * 60 * 60 * 24;
const diasAtras = (n) => new Date(Date.now() - n * DIA);
// Um repositório de ItemAcervo: aceita Livro e JogoEletronico (polimorfismo).
const acervo = new RepositorioMemoria_1.RepositorioMemoria();
acervo.adicionar(new Livro_1.Livro("Clean Code", 2008, "Robert C. Martin", 464));
acervo.adicionar(new Livro_1.Livro("Domain-Driven Design", 2003, "Eric Evans", 560));
acervo.adicionar(new JogoEletronico_1.JogoEletronico("Celeste", 2018, "PC", 10));
acervo.adicionar(new JogoEletronico_1.JogoEletronico("Hades", 2020, "PC", 12));
console.log("=== Acervo inicial ===");
acervo.listar().forEach((i) => console.log(i.toString()));
// ---- Empréstimo e multa (cada subclasse aplica a sua regra) ----
console.log("\n=== Empréstimos ===");
const livro = acervo.buscarPorId(1);
const jogo = acervo.buscarPorId(3);
livro.emprestar(diasAtras(20)); // prazo 14 -> 6 dias de atraso
jogo.emprestar(diasAtras(10)); // prazo 7  -> 3 dias de atraso
console.log(livro.toString());
console.log(jogo.toString());
console.log(`Dias emprestado (livro): ${livro.diasEmprestado}`);
console.log("\n=== Devoluções ===");
console.log(`Multa do livro: R$ ${livro.devolver().toFixed(2)}`); // 6 * 0,50 = 3,00
console.log(`Multa do jogo:  R$ ${jogo.devolver().toFixed(2)}`); // 5 + 3 * 2 = 11,00
// ---- Reserva (interface Reservavel) ----
console.log("\n=== Reservas ===");
const outro = acervo.buscarPorId(2);
if ((0, Reservavel_1.ehReservavel)(outro)) {
    outro.reservar("Ana");
    console.log(outro.toString());
}
console.log(`O jogo é reservável? ${(0, Reservavel_1.ehReservavel)(jogo)}`);
// ---- Exceções ----
console.log("\n=== Tratamento de erros ===");
try {
    acervo.buscarPorId(999);
}
catch (e) {
    if (e instanceof erros_1.ItemNaoEncontradoError) {
        console.log(`[não encontrado] ${e.message}`);
    }
}
try {
    const item = acervo.buscarPorId(4);
    item.emprestar();
    item.emprestar(); // segundo empréstimo seguido deve falhar
}
catch (e) {
    if (e instanceof erros_1.ItemIndisponivelError) {
        console.log(`[indisponível] ${e.message}`);
    }
    else if (e instanceof erros_1.ErroDominio) {
        console.log(`[erro de domínio] ${e.message}`);
    }
    else {
        throw e; // erro inesperado: não engolir
    }
}
try {
    new Livro_1.Livro("", 2020, "Alguém", 100);
}
catch (e) {
    if (e instanceof erros_1.ErroDominio)
        console.log(`[validação] ${e.message}`);
}
// ---- Utility types em ação ----
console.log("\n=== Resumos e filtros ===");
console.table(acervo.listar().map(tipos_1.resumir));
console.log("Itens de 2018:", acervo.filtrar((i) => (0, tipos_1.combinaComFiltro)(i, { anoPublicacao: 2018 })).map((i) => i.titulo));
const estoque = {};
for (const item of acervo.listar()) {
    const tipo = item.constructor.name;
    estoque[tipo] = (estoque[tipo] ?? 0) + 1;
}
console.log("Estoque por tipo:", estoque);
