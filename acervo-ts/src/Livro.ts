import { ItemAcervo } from "./ItemAcervo";
import { Reservavel } from "./Reservavel";
import { ItemIndisponivelError, ValidacaoError } from "./erros";

// Aula 5: extends (herança)  |  Aula 6: implements (contrato)
export class Livro extends ItemAcervo implements Reservavel {
  private _reservadoPor: string | null = null;

  constructor(
    titulo: string,
    anoPublicacao: number,
    private readonly _autor: string,
    private readonly _paginas: number
  ) {
    super(titulo, anoPublicacao); // obrigatório: monta a parte da classe mãe primeiro
    if (_paginas <= 0) {
      throw new ValidacaoError("O livro precisa ter pelo menos 1 página.");
    }
  }

  public get autor(): string {
    return this._autor;
  }

  public get paginas(): number {
    return this._paginas;
  }

  // Regra do livro: 14 dias de prazo, R$ 0,50 por dia de atraso, limitado a R$ 30,00.
  public override get prazoEmprestimoDias(): number {
    return 14;
  }

  public override calcularMulta(diasAtraso: number): number {
    if (diasAtraso <= 0) return 0;
    return Math.min(diasAtraso * 0.5, 30);
  }

  // ----- Reservavel -----
  public get reservadoPor(): string | null {
    return this._reservadoPor;
  }

  public reservar(usuario: string): void {
    if (usuario.trim() === "") {
      throw new ValidacaoError("Informe o nome de quem está reservando.");
    }
    if (this._reservadoPor !== null) {
      throw new ItemIndisponivelError(this.id);
    }
    this._reservadoPor = usuario;
  }

  public cancelarReserva(): void {
    this._reservadoPor = null;
  }

  public override toString(): string {
    const reserva = this._reservadoPor ? ` | reservado por ${this._reservadoPor}` : "";
    return `${super.toString()} - Livro de ${this._autor}${reserva}`;
  }
}
