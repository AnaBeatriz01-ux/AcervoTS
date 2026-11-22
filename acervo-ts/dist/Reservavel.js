"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ehReservavel = ehReservavel;
// Type guard: permite perguntar "este item aceita reserva?" com segurança de tipo.
function ehReservavel(item) {
    return (typeof item === "object" &&
        item !== null &&
        "reservar" in item &&
        "cancelarReserva" in item);
}
