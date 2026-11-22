import { ItemAcervo } from "./ItemAcervo";

// Aula 7: Utility Types. Cada um deriva um tipo novo a partir de um existente,
// sem reescrever campos à mão.

// Pick: escolhe só alguns campos.
export type ResumoItem = Readonly<Pick<ItemAcervo, "id" | "titulo" | "statusDisponibilidade">>;

// Partial: todos os campos viram opcionais (ótimo para filtros).
export type FiltroItens = Partial<Pick<ItemAcervo, "titulo" | "anoPublicacao">>;

// Record: dicionário com chave -> valor.
export type EstoquePorTipo = Record<string, number>;

// Omit: tudo, menos os campos indicados.
export type DadosBaseItem = Omit<ResumoItem, "statusDisponibilidade">;

export function resumir(item: ItemAcervo): ResumoItem {
  return {
    id: item.id,
    titulo: item.titulo,
    statusDisponibilidade: item.statusDisponibilidade,
  };
}

export function combinaComFiltro(item: ItemAcervo, filtro: FiltroItens): boolean {
  if (filtro.titulo !== undefined && !item.titulo.toLowerCase().includes(filtro.titulo.toLowerCase())) {
    return false;
  }
  if (filtro.anoPublicacao !== undefined && item.anoPublicacao !== filtro.anoPublicacao) {
    return false;
  }
  return true;
}
