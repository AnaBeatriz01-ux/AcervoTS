"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
const ItemAcervo_1 = require("./ItemAcervo");
const erros_1 = require("./erros");
// Aula 5: extends (herança)  |  Aula 6: implements (contrato)
class Livro extends ItemAcervo_1.ItemAcervo {
    constructor(titulo, anoPublicacao, _autor, _paginas) {
        super(titulo, anoPublicacao); // obrigatório: monta a parte da classe mãe primeiro
        this._autor = _autor;
        this._paginas = _paginas;
        this._reservadoPor = null;
        if (_paginas <= 0) {
            throw new erros_1.ValidacaoError("O livro precisa ter pelo menos 1 página.");
        }
    }
    get autor() {
        return this._autor;
    }
    get paginas() {
        return this._paginas;
    }
    // Regra do livro: 14 dias de prazo, R$ 0,50 por dia de atraso, limitado a R$ 30,00.
    get prazoEmprestimoDias() {
        return 14;
    }
    calcularMulta(diasAtraso) {
        if (diasAtraso <= 0)
            return 0;
        return Math.min(diasAtraso * 0.5, 30);
    }
    // ----- Reservavel -----
    get reservadoPor() {
        return this._reservadoPor;
    }
    reservar(usuario) {
        if (usuario.trim() === "") {
            throw new erros_1.ValidacaoError("Informe o nome de quem está reservando.");
        }
        if (this._reservadoPor !== null) {
            throw new erros_1.ItemIndisponivelError(this.id);
        }
        this._reservadoPor = usuario;
    }
    cancelarReserva() {
        this._reservadoPor = null;
    }
    toString() {
        const reserva = this._reservadoPor ? ` | reservado por ${this._reservadoPor}` : "";
        return `${super.toString()} - Livro de ${this._autor}${reserva}`;
    }
}
exports.Livro = Livro;
