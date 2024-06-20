import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IReservation } from '../../../interfaces/reservation.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private http = inject(HttpClient);

  getReservation(card: string):Observable<any>{
    return this.http.get<any>(environment.URL_API_RESERVATIONS + `ListarReservacion/${card}`);
  }

  addReservation(reservation: IReservation): Observable<IReservation>{
    return this.http.post<IReservation>(environment.URL_API_RESERVATIONS + "RegistrarReservacion",reservation);
  }

  updateReservation(reservation: IReservation): Observable<IReservation>{
    return this.http.put<IReservation>(environment.URL_API_RESERVATIONS + "ActualizarReservacion", reservation);
  }

  deleteReservation(id: string){
    return this.http.delete(environment.URL_API_RESERVATIONS + `EliminarReservacion/${id}`);
  }
}
