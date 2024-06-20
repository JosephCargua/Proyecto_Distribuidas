import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IFlight } from '../../../interfaces/flight.interface';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private http = inject(HttpClient);

  getFlights():Observable<any>{
    return this.http.get<any>(environment.URL_API_FLIGHT + `ListarVuelo`);
  }

  getFlightsByOrigin(origin: string):Observable<any>{
    return this.http.get<any>(environment.URL_API_FLIGHT + `BuscarVuelo/origen/${origin}`);
  }

  getFlightsByDestination(destination: string):Observable<any>{
    return this.http.get<any>(environment.URL_API_FLIGHT + `BuscarVuelo/destino/${destination}`);
  }

  getFlightsByDate(date: string):Observable<any>{
    return this.http.get<any>(environment.URL_API_FLIGHT + `BuscarVuelo/fecha/${date}`);
  }

  getFlightsByDateOriginDestination(origin: string, destination: string, date: string):Observable<any>{
    return this.http.get<any>(environment.URL_API_FLIGHT + `BuscarVuelo/${origin}/${destination}/${date}`);
  }

  addFlight(flight: IFlight): Observable<IFlight>{
    return this.http.post<IFlight>(environment.URL_API_FLIGHT + "RegistrarVuelo",flight);
  }

  updateFlight(flight: IFlight): Observable<IFlight>{
    return this.http.put<IFlight>(environment.URL_API_FLIGHT + "ActualizarVuelo", flight);
  }

  deleteFlight(id: string){
    return this.http.delete(environment.URL_API_FLIGHT + `EliminarVuelo/${id}`);
  }

}
