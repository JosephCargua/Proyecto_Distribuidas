import { Component, inject } from '@angular/core';
import { MetaDataColumn } from '../shared/interfaces/metacolumn.interface';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';
import { ReservationService } from '../services/api_serivices/ReservationService/reservation.service';
import { IReservation } from '../interfaces/reservation.interface';

@Component({
  selector: 'app-history-air',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule, SharedModule],
  templateUrl: './history-air.component.html',
  styleUrls: ['./history-air.component.css']
})
export class HistoryAirComponent {
  private reservationService = inject(ReservationService);

  data: any = [];

  MetaDataColumn: MetaDataColumn[] = [
    { field: 'id', title: 'Codigo' },
    { field: 'idFlight', title: 'Vuelo' },
    { field: 'card', title: 'Cedula' },
    { field: 'numberSeats', title: 'Asientos' },
    { field: 'state', title: 'Estado' },
    { field: 'unitPrice', title: 'Precio' },
    { field: 'total', title: 'Total' },
    { field: 'actions', title: 'Actions' } 
  ];
  records: any = [];
  totalRecords = 0;

  constructor() {
    this.loadReservations();
  }

  field: any = [];

  loadReservations() {
    const card = '1728177310';
    this.reservationService.getReservation(card).subscribe(
      (data) => {
        console.log('Received data:', data);
        if (Array.isArray(data)) {
          this.records = data;
          this.records.forEach((dato: any) => {
            this.field.push({
              id: dato.id,
              idFlight: dato.idVuelo,
              card: dato.cedula,
              numberSeats: dato.cantidadAsientos,
              state: dato.estado,
              unitPrice: dato.precioUnitario,
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

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.data = this.field.slice(skip, skip + pageSize);
  }

  cancelReservation(id: number) {
    const reservation = this.field.find((res: any) => res.id === id);
    if (reservation) {
      reservation.state = 'Cancelado';
      const updatedReservation: IReservation = {
        ...reservation,
        estado: 'Cancelado'
      };
      this.reservationService.updateReservation(updatedReservation).subscribe(
        (response) => {
          console.log('Reservation cancelled successfully', response);
          const index = this.field.findIndex((res: any) => res.id === id);
          if (index !== -1) {
            this.field[index] = updatedReservation;
            this.changePage(0); 
          }
        },
        (error) => {
          console.error('Error cancelling reservation', error);
        }
      );
    }
  }

  getColumns(): string[] {
    return this.MetaDataColumn.map(c => c.field);
  }
}
