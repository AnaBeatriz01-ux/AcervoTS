// Aula 6: contrato (interface). Diz O QUE deve existir, não COMO funciona.
export interface Reservavel {
  readonly reservadoPor: string | null;
  reservar(usuario: string): void;
  cancelarReserva(): void;
}

// Type guard: permite perguntar "este item aceita reserva?" com segurança de tipo.
export function ehReservavel(item: unknown): item is Reservavel {
  return (
    typeof item === "object" &&
    item !== null &&
    "reservar" in item &&
    "cancelarReserva" in item
  );
}
