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

  private userService = inject(UserService)

  router = inject(Router);
  loginError = false; 
  user:any;

  login = new FormGroup({
    email: new FormControl<any>('', [Validators.required, Validators.email]),
    password: new FormControl<any>('', [Validators.required]),
  });


  onLogin() {
    if (this.login.valid) {
      const user = {
        correo: this.login.get('email')?.value,
        contraseña: this.login.get('password')?.value
      }
      this.userService.signInUser(user).subscribe(
        data =>{
          console.log(data);
          if(data != null){
            //
            this.userService.saveInLocalStorage('user',data)
            this.router.navigate(['/inicio']); 
            alert("Inicio de sesion correcto");
          }else{
            alert("Credenciales incorrectas");
          }
          
        }
      )
      
    }
  }
  onRegister() {
    this.router.navigate(['/register']); 
  }
    
}

