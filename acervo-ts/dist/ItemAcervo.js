"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemAcervo = void 0;
const erros_1 = require("./erros");
const MS_POR_DIA = 1000 * 60 * 60 * 24;
class ItemAcervo {
    // Aula 2: Parameter Properties. O "private" no parâmetro já declara e atribui o atributo.
    constructor(_titulo, _anoPublicacao) {
        this._titulo = _titulo;
        this._anoPublicacao = _anoPublicacao;
        // Aula 3: único estado de empréstimo. Disponibilidade é DERIVADA dele (Aula 4).
        this._emprestadoEm = null;
        if (_titulo.trim() === "") {
            throw new erros_1.ValidacaoError("O título não pode ser vazio.");
        }
        if (!Number.isInteger(_anoPublicacao) || _anoPublicacao <= 0) {
            throw new erros_1.ValidacaoError("O ano de publicação deve ser um inteiro positivo.");
        }
        this.id = ++ItemAcervo._contadorId;
    }
    // ---------- Aula 4: acessores (get) ----------
    get titulo() {
        return this._titulo;
    }
    get anoPublicacao() {
        return this._anoPublicacao;
    }
    // Propriedade calculada: não existe um atributo "disponivel" guardado, então não há risco
    // de ele ficar fora de sincronia com _emprestadoEm.
    get disponivel() {
        return this._emprestadoEm === null;
    }
    get statusDisponibilidade() {
        return this.disponivel ? "Disponível" : "Emprestado";
    }
    get diasEmprestado() {
        return this.diasDesdeEmprestimo(new Date());
    }
    // ---------- Aula 3: métodos de negócio validados ----------
    emprestar(dataEmprestimo = new Date()) {
        if (!this.disponivel) {
            throw new erros_1.ItemIndisponivelError(this.id);
        }
        this._emprestadoEm = dataEmprestimo;
    }
    /** Devolve o item e retorna o valor da multa (0 se estiver no prazo). */
    devolver(dataDevolucao = new Date()) {
        if (this._emprestadoEm === null) {
            throw new erros_1.ValidacaoError(`O item ${this.id} não está emprestado.`);
        }
        const diasAtraso = Math.max(0, this.diasDesdeEmprestimo(dataDevolucao) - this.prazoEmprestimoDias);
        this._emprestadoEm = null;
        return this.calcularMulta(diasAtraso);
    }
    renomear(novoTitulo) {
        if (novoTitulo.trim() === "") {
            throw new erros_1.ValidacaoError("O título não pode ser vazio.");
        }
        this._titulo = novoTitulo;
    }
    toString() {
        return `#${this.id} ${this._titulo} (${this._anoPublicacao}) [${this.statusDisponibilidade}]`;
    }
    diasDesdeEmprestimo(ate) {
        if (this._emprestadoEm === null)
            return 0;
        return Math.floor((ate.getTime() - this._emprestadoEm.getTime()) / MS_POR_DIA);
    }
}
exports.ItemAcervo = ItemAcervo;
// Aula 4: contador estático privado, compartilhado por TODA a hierarquia.
ItemAcervo._contadorId = 0;
