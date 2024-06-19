import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CoreModule } from "../core/core.module";
import { UserService } from '../services/api_serivices/user/user.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILogin } from '../interfaces/userAuth.interface';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [CoreModule,FormsModule, 
      ReactiveFormsModule,]
})
export class LoginComponent {

  member = inject(UserService);
  router = inject(Router);
  loginError = false; 
  user:any;

  login = new FormGroup({
    email: new FormControl<any>('', [Validators.required, Validators.email]),
    password: new FormControl<any>('', [Validators.required]),
  });


  onLogin(){
    if (this.login.valid) {
      const loginData: ILogin = {
        email: this.login.get('email')?.value,
        password: this.login.get('password')?.value,
      };

      this.member.logInUserMember(loginData).subscribe(
        response => {
          this.user = response;
          alert("Inicio de sesion correcto")
          this.router.navigate(['inicio']);
        },
        error => {
          alert("Error de autenticación: " +error.error.data)
          console.error('Error de autenticación', error);
          this.loginError = true; 
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}

