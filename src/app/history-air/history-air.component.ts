import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { SharedModule } from "../shared/shared.module";
import { ReservationService } from "../services/api_serivices/ReservationService/reservation.service";
import { UserService } from "../services/api_serivices/UserService/user.service";
import { FlightService } from "../services/api_serivices/FlightService/flight.service";
import { MatDialogModule,MatDialog } from "@angular/material/dialog";
import { MetaDataColumn } from "../shared/interfaces/metacolumn.interface";
import { environment } from "../../environments/environment.development";
import { IReservation } from "../interfaces/reservation.interface";
import { ReservationDetailDialogComponent } from "../reservation-detail-dialog/reservation-detail-dialog.component";
import { ISignUp } from "../interfaces/userAuth.interface";

@Component({
  selector: 'app-history-air',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule, SharedModule],
  templateUrl: './history-air.component.html',
  styleUrls: ['./history-air.component.css']
})
export class HistoryAirComponent {
  private reservationService = inject(ReservationService);
  private userService = inject(UserService); 
  private flightService = inject(FlightService); 
  private dialog = inject(MatDialog);

  data: any = [];
  field: any = [];
  field1: any = [];
  field2: any = [];

  MetaDataColumn: MetaDataColumn[] = [
    { field: 'id', title: 'Codigo' },
    { field: 'idVuelo', title: 'Vuelo' },
    { field: 'cedula', title: 'Cedula' },
    { field: 'cantidadAsientos', title: 'Asientos' },
    { field: 'estado', title: 'Estado' },
    { field: 'precioUnitario', title: 'Precio' },
    { field: 'total', title: 'Total' },
    { field: 'actions', title: 'Actions' } 
  ];

  records: any = [];
  totalRecords = 0;

  constructor() {
    this.loadReservations();
    this.loadUsers();
    this.loadFlights();
  }

  user(): ISignUp{
    return this.userService.getFromLocalStorage('user');
  }

  loadReservations() {
    this.reservationService.getReservation(this.user().cedula).subscribe(
      (data) => {
        console.log('Received reservations data:', data);
        if (Array.isArray(data)) {
          this.records = data;
          this.records.forEach((dato: any) => {
            this.field.push({
              id: dato.id,
              idVuelo: dato.idVuelo,
              cedula: dato.cedula,
              cantidadAsientos: dato.cantidadAsientos,
              estado: dato.estado,
              precioUnitario: dato.precioUnitario,
              total: dato.total
            });
          });

          this.totalRecords = this.records.length;
          this.changePage(0);
        } else {
          console.error('Data format is not as expected:', data);
        }
      },
      (error) => {
        console.error('Error fetching reservations', error);
      }
    );
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data1) => {
        if (Array.isArray(data1)) {
          console.log('Received users data:', data1);
          this.records = data1;
          this.records.forEach((dato: any) => {
            this.field1.push({
              card: dato.cedula,
              name: dato.nombre,
              lastName: dato.apellido,
              email: dato.correo,
              password: dato.contraseña
            });
          });
          this.totalRecords = this.records.length;
        } else {
          console.error('Data format is not as expected:', data1);
        }
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
  
  loadFlights() {
    this.flightService.getFlights().subscribe(
      (data2) => {
        console.log('Received flights data:', data2);
        if (Array.isArray(data2)) {
          this.records = data2;
          this.records.forEach((dato: any) => {
            this.field2.push({
              id: dato.id,
              capacity: dato.capacidad,
              destination: dato.destino,
              state: dato.estado,
              date: dato.fecha,
              origin: dato.origen,
              price: dato.precio
            });
          });
          this.totalRecords = this.records.length;
        } else {
          console.error('Data format is not as expected:', data2);
        }
      },
      (error) => {
        console.error('Error fetching flights', error);
      }
    );
  }
  
  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.data = this.field.slice(skip, skip + pageSize);
  }

  cancelReservation(id: number) {
    const reservation = this.field.find((res: any) => res.id === id);
    console.log(reservation);
    
    if (reservation) {

      const updatedReservation: IReservation = {
        id: reservation.id,   
        idVuelo: reservation.idVuelo,
        cedula: reservation.cedula,
        cantidadAsientos: reservation.cantidadAsientos,
        estado: 'Cancelado',
        precioUnitario: reservation.precioUnitario,
        total: reservation.total
      };
      this.reservationService.updateReservation(updatedReservation).subscribe(
        (response) => {
          console.log('Reservation cancelled successfully', response);
          const index = this.field.findIndex((res: any) => res.id === id);
          if (index !== -1) {
            this.field[index] = updatedReservation;
            this.changePage(0); 
          }
          this.loadReservations();
        },
        (error) => {
          console.error('Error cancelling reservation', error);
        }
      );
    }
  }



  openDetailDialog(id:number,card: string,idFlight:number) {
    const reservation = this.field.find((res: any) => res.id === id);
    const user = this.field1.find((res1: any) => res1.card === card);
    const flight = this.field2.find((res2: any) => res2.id === idFlight);
  
    if (reservation ) {
      this.dialog.open(ReservationDetailDialogComponent, {
        data: {
          reservation: reservation,
          user: user,
          flight: flight
        }
      });
    }
  }
  
  getColumns(): string[] {
    return this.MetaDataColumn.map(c => c.field);
  }
}
