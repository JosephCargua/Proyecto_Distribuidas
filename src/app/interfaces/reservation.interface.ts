export interface IReservation {
    id: number,   
    idFlight: number;
    card: string;
    numberSeats: number;
    state: string;
    unitPrice: number;
    total: number;
}
