import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CoreModule } from "../core/core.module";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/api_serivices/UserService/user.service';
import { FlightService } from '../services/api_serivices/FlightService/flight.service';
import { ReservationService } from '../services/api_serivices/ReservationService/reservation.service';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [CoreModule,FormsModule, 
      ReactiveFormsModule,]
})
export class LoginComponent {

  users = inject(UserService);
  flight = inject(FlightService)
  reservation = inject(ReservationService);

  router = inject(Router);
  loginError = false; 
  user:any;

  login = new FormGroup({
    email: new FormControl<any>('', [Validators.required, Validators.email]),
    password: new FormControl<any>('', [Validators.required]),
  });


  onLogin(){

    console.log("All Flights");
    

    this.flight.getFlights().subscribe(
      (data) => {
        console.log(data);
        
      },
      error => {
        console.log(error);
        
      }
    )

    console.log("Flights by origin");

    this.flight.getFlightsByOrigin("Ambato").subscribe(
      data => {
        console.log(data);
        
      },
      error => {
        console.log(error);
        
      }
    )

    console.log("Flights by destinations");

    this.flight.getFlightsByDestination("Ambato").subscribe(
      data => {
        console.log(data);
        
      },
      error => {
        console.log(error);
        
      }
    )

    console.log("Reservations");
    this.reservation.getReservation("1728177310").subscribe(
      data => {
        console.log(data);
        
      },
      error =>{
        console.log(error);
        
      }
    )

    console.log("All Users");
    this.users.getUsers().subscribe(
      data => {
        console.log(data);
        
      },
      error => {
        console.log(error);
        
      }
    )
  }
  onRegister() {
    this.router.navigate(['/register']); 
  }
    
}

