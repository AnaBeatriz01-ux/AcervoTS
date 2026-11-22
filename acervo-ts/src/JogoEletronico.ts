import { ItemAcervo } from "./ItemAcervo";
import { ValidacaoError } from "./erros";

export class JogoEletronico extends ItemAcervo {
  constructor(
    titulo: string,
    anoPublicacao: number,
    private readonly _plataforma: string,
    private readonly _classificacaoIndicativa: number
  ) {
    super(titulo, anoPublicacao);
    if (_classificacaoIndicativa < 0) {
      throw new ValidacaoError("Classificação indicativa inválida.");
    }
  }

  public get plataforma(): string {
    return this._plataforma;
  }

  public get classificacaoIndicativa(): number {
    return this._classificacaoIndicativa;
  }

  // Regra do jogo: 7 dias de prazo (mais curto), taxa fixa de R$ 5,00 + R$ 2,00 por dia de atraso.
  public override get prazoEmprestimoDias(): number {
    return 7;
  }

  public override calcularMulta(diasAtraso: number): number {
    if (diasAtraso <= 0) return 0;
    return 5 + diasAtraso * 2;
  }

  public override toString(): string {
    return `${super.toString()} - Jogo de ${this._plataforma} (${this._classificacaoIndicativa}+)`;
  }
}
