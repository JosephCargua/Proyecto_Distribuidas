export interface IReservation {
    id?: number,   
    idVuelo: number;
    cedula: string;
    cantidadAsientos: number;
    estado: string;
    precioUnitario: number;
    total: number;
}
