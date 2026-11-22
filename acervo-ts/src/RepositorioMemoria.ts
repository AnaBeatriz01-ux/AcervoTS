import { ItemNaoEncontradoError } from "./erros";

// Aula 7: Generics. "T" é um tipo que será escolhido por quem usa a classe.
// "extends { readonly id: number }" é uma restrição: só aceita tipos que TENHAM um id numérico.
export class RepositorioMemoria<T extends { readonly id: number }> {
  private itens: T[] = [];

  public adicionar(item: T): T {
    this.itens.push(item);
    return item;
  }

  public buscarPorId(id: number): T {
    const encontrado = this.itens.find((i) => i.id === id);
    if (encontrado === undefined) {
      throw new ItemNaoEncontradoError(id);
    }
    return encontrado;
  }

  public remover(id: number): void {
    const indice = this.itens.findIndex((i) => i.id === id);
    if (indice === -1) {
      throw new ItemNaoEncontradoError(id);
    }
    this.itens.splice(indice, 1);
  }

  public filtrar(predicado: (item: T) => boolean): T[] {
    return this.itens.filter(predicado);
  }

  // ReadonlyArray impede que quem recebe a lista faça push/pop nela por fora.
  public listar(): ReadonlyArray<T> {
    return this.itens;
  }

  public get total(): number {
    return this.itens.length;
  }
}
