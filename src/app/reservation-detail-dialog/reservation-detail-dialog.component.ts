import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReservation } from '../interfaces/reservation.interface';

@Component({
  selector: 'app-reservation-detail-dialog',
  templateUrl: './reservation-detail-dialog.component.html',
  styleUrls: ['./reservation-detail-dialog.component.css']
})
export class ReservationDetailDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ReservationDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reservation: IReservation, user: any, flight: any }
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }
}
