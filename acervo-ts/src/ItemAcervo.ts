import { ItemIndisponivelError, ValidacaoError } from "./erros";

const MS_POR_DIA = 1000 * 60 * 60 * 24;

export abstract class ItemAcervo {
  // Aula 4: contador estático privado, compartilhado por TODA a hierarquia.
  private static _contadorId = 0;

  // Aula 3: o id nunca muda depois de criado (readonly).
  public readonly id: number;

  // Aula 3: único estado de empréstimo. Disponibilidade é DERIVADA dele (Aula 4).
  private _emprestadoEm: Date | null = null;

  // Aula 2: Parameter Properties. O "private" no parâmetro já declara e atribui o atributo.
  constructor(
    private _titulo: string,
    private readonly _anoPublicacao: number
  ) {
    if (_titulo.trim() === "") {
      throw new ValidacaoError("O título não pode ser vazio.");
    }
    if (!Number.isInteger(_anoPublicacao) || _anoPublicacao <= 0) {
      throw new ValidacaoError("O ano de publicação deve ser um inteiro positivo.");
    }
    this.id = ++ItemAcervo._contadorId;
  }

  // ---------- Aula 5: parte abstrata (cada subclasse define a sua regra) ----------
  public abstract calcularMulta(diasAtraso: number): number;
  public abstract get prazoEmprestimoDias(): number;

  // ---------- Aula 4: acessores (get) ----------
  public get titulo(): string {
    return this._titulo;
  }

  public get anoPublicacao(): number {
    return this._anoPublicacao;
  }

  // Propriedade calculada: não existe um atributo "disponivel" guardado, então não há risco
  // de ele ficar fora de sincronia com _emprestadoEm.
  public get disponivel(): boolean {
    return this._emprestadoEm === null;
  }

  public get statusDisponibilidade(): "Disponível" | "Emprestado" {
    return this.disponivel ? "Disponível" : "Emprestado";
  }

  public get diasEmprestado(): number {
    return this.diasDesdeEmprestimo(new Date());
  }

  // ---------- Aula 3: métodos de negócio validados ----------
  public emprestar(dataEmprestimo: Date = new Date()): void {
    if (!this.disponivel) {
      throw new ItemIndisponivelError(this.id);
    }
    this._emprestadoEm = dataEmprestimo;
  }

  /** Devolve o item e retorna o valor da multa (0 se estiver no prazo). */
  public devolver(dataDevolucao: Date = new Date()): number {
    if (this._emprestadoEm === null) {
      throw new ValidacaoError(`O item ${this.id} não está emprestado.`);
    }
    const diasAtraso = Math.max(
      0,
      this.diasDesdeEmprestimo(dataDevolucao) - this.prazoEmprestimoDias
    );
    this._emprestadoEm = null;
    return this.calcularMulta(diasAtraso);
  }

  public renomear(novoTitulo: string): void {
    if (novoTitulo.trim() === "") {
      throw new ValidacaoError("O título não pode ser vazio.");
    }
    this._titulo = novoTitulo;
  }

  public toString(): string {
    return `#${this.id} ${this._titulo} (${this._anoPublicacao}) [${this.statusDisponibilidade}]`;
  }

  private diasDesdeEmprestimo(ate: Date): number {
    if (this._emprestadoEm === null) return 0;
    return Math.floor((ate.getTime() - this._emprestadoEm.getTime()) / MS_POR_DIA);
  }
}
