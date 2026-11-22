import { ItemAcervo } from "./ItemAcervo";
import { Livro } from "./Livro";
import { JogoEletronico } from "./JogoEletronico";
import { ehReservavel } from "./Reservavel";
import { RepositorioMemoria } from "./RepositorioMemoria";
import { EstoquePorTipo, resumir, combinaComFiltro } from "./tipos";
import { ErroDominio, ItemIndisponivelError, ItemNaoEncontradoError } from "./erros";

const DIA = 1000 * 60 * 60 * 24;
const diasAtras = (n: number): Date => new Date(Date.now() - n * DIA);

// Um repositório de ItemAcervo: aceita Livro e JogoEletronico (polimorfismo).
const acervo = new RepositorioMemoria<ItemAcervo>();

acervo.adicionar(new Livro("Clean Code", 2008, "Robert C. Martin", 464));
acervo.adicionar(new Livro("Domain-Driven Design", 2003, "Eric Evans", 560));
acervo.adicionar(new JogoEletronico("Celeste", 2018, "PC", 10));
acervo.adicionar(new JogoEletronico("Hades", 2020, "PC", 12));

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
if (ehReservavel(outro)) {
  outro.reservar("Ana");
  console.log(outro.toString());
}
console.log(`O jogo é reservável? ${ehReservavel(jogo)}`);

// ---- Exceções ----
console.log("\n=== Tratamento de erros ===");
try {
  acervo.buscarPorId(999);
} catch (e) {
  if (e instanceof ItemNaoEncontradoError) {
    console.log(`[não encontrado] ${e.message}`);
  }
}

try {
  const item = acervo.buscarPorId(4);
  item.emprestar();
  item.emprestar(); // segundo empréstimo seguido deve falhar
} catch (e) {
  if (e instanceof ItemIndisponivelError) {
    console.log(`[indisponível] ${e.message}`);
  } else if (e instanceof ErroDominio) {
    console.log(`[erro de domínio] ${e.message}`);
  } else {
    throw e; // erro inesperado: não engolir
  }
}

try {
  new Livro("", 2020, "Alguém", 100);
} catch (e) {
  if (e instanceof ErroDominio) console.log(`[validação] ${e.message}`);
}

// ---- Utility types em ação ----
console.log("\n=== Resumos e filtros ===");
console.table(acervo.listar().map(resumir));
console.log(
  "Itens de 2018:",
  acervo.filtrar((i) => combinaComFiltro(i, { anoPublicacao: 2018 })).map((i) => i.titulo)
);

const estoque: EstoquePorTipo = {};
for (const item of acervo.listar()) {
  const tipo = item.constructor.name;
  estoque[tipo] = (estoque[tipo] ?? 0) + 1;
}
console.log("Estoque por tipo:", estoque);
