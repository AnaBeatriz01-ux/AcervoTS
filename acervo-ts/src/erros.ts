// Aula 7: exceções personalizadas do domínio.
// Todas herdam de ErroDominio, então dá para capturar "qualquer erro do acervo"
// com um único instanceof, ou tratar cada caso separadamente.

export class ErroDominio extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = new.target.name; // nome da classe filha (ex.: "ItemIndisponivelError")
    Object.setPrototypeOf(this, new.target.prototype); // garante o instanceof correto
  }
}

export class ValidacaoError extends ErroDominio {}

export class ItemIndisponivelError extends ErroDominio {
  constructor(public readonly idItem: number) {
    super(`O item ${idItem} não está disponível para esta operação.`);
  }
}

export class ItemNaoEncontradoError extends ErroDominio {
  constructor(public readonly idItem: number) {
    super(`Nenhum item encontrado com o id ${idItem}.`);
  }
}
