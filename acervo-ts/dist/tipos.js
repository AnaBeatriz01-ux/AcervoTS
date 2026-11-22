"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumir = resumir;
exports.combinaComFiltro = combinaComFiltro;
function resumir(item) {
    return {
        id: item.id,
        titulo: item.titulo,
        statusDisponibilidade: item.statusDisponibilidade,
    };
}
function combinaComFiltro(item, filtro) {
    if (filtro.titulo !== undefined && !item.titulo.toLowerCase().includes(filtro.titulo.toLowerCase())) {
        return false;
    }
    if (filtro.anoPublicacao !== undefined && item.anoPublicacao !== filtro.anoPublicacao) {
        return false;
    }
    return true;
}
