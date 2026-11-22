"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioMemoria = void 0;
const erros_1 = require("./erros");
// Aula 7: Generics. "T" é um tipo que será escolhido por quem usa a classe.
// "extends { readonly id: number }" é uma restrição: só aceita tipos que TENHAM um id numérico.
class RepositorioMemoria {
    constructor() {
        this.itens = [];
    }
    adicionar(item) {
        this.itens.push(item);
        return item;
    }
    buscarPorId(id) {
        const encontrado = this.itens.find((i) => i.id === id);
        if (encontrado === undefined) {
            throw new erros_1.ItemNaoEncontradoError(id);
        }
        return encontrado;
    }
    remover(id) {
        const indice = this.itens.findIndex((i) => i.id === id);
        if (indice === -1) {
            throw new erros_1.ItemNaoEncontradoError(id);
        }
        this.itens.splice(indice, 1);
    }
    filtrar(predicado) {
        return this.itens.filter(predicado);
    }
    // ReadonlyArray impede que quem recebe a lista faça push/pop nela por fora.
    listar() {
        return this.itens;
    }
    get total() {
        return this.itens.length;
    }
}
exports.RepositorioMemoria = RepositorioMemoria;
