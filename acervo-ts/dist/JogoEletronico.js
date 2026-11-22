"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JogoEletronico = void 0;
const ItemAcervo_1 = require("./ItemAcervo");
const erros_1 = require("./erros");
class JogoEletronico extends ItemAcervo_1.ItemAcervo {
    constructor(titulo, anoPublicacao, _plataforma, _classificacaoIndicativa) {
        super(titulo, anoPublicacao);
        this._plataforma = _plataforma;
        this._classificacaoIndicativa = _classificacaoIndicativa;
        if (_classificacaoIndicativa < 0) {
            throw new erros_1.ValidacaoError("Classificação indicativa inválida.");
        }
    }
    get plataforma() {
        return this._plataforma;
    }
    get classificacaoIndicativa() {
        return this._classificacaoIndicativa;
    }
    // Regra do jogo: 7 dias de prazo (mais curto), taxa fixa de R$ 5,00 + R$ 2,00 por dia de atraso.
    get prazoEmprestimoDias() {
        return 7;
    }
    calcularMulta(diasAtraso) {
        if (diasAtraso <= 0)
            return 0;
        return 5 + diasAtraso * 2;
    }
    toString() {
        return `${super.toString()} - Jogo de ${this._plataforma} (${this._classificacaoIndicativa}+)`;
    }
}
exports.JogoEletronico = JogoEletronico;
