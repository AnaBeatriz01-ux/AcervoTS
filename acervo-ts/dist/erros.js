"use strict";
// Aula 7: exceções personalizadas do domínio.
// Todas herdam de ErroDominio, então dá para capturar "qualquer erro do acervo"
// com um único instanceof, ou tratar cada caso separadamente.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemNaoEncontradoError = exports.ItemIndisponivelError = exports.ValidacaoError = exports.ErroDominio = void 0;
class ErroDominio extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = new.target.name; // nome da classe filha (ex.: "ItemIndisponivelError")
        Object.setPrototypeOf(this, new.target.prototype); // garante o instanceof correto
    }
}
exports.ErroDominio = ErroDominio;
class ValidacaoError extends ErroDominio {
}
exports.ValidacaoError = ValidacaoError;
class ItemIndisponivelError extends ErroDominio {
    constructor(idItem) {
        super(`O item ${idItem} não está disponível para esta operação.`);
        this.idItem = idItem;
    }
}
exports.ItemIndisponivelError = ItemIndisponivelError;
class ItemNaoEncontradoError extends ErroDominio {
    constructor(idItem) {
        super(`Nenhum item encontrado com o id ${idItem}.`);
        this.idItem = idItem;
    }
}
exports.ItemNaoEncontradoError = ItemNaoEncontradoError;
