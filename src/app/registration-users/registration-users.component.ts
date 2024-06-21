import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/api_serivices/UserService/user.service';
import { data } from 'autoprefixer';

@Component({
  selector: 'app-registration-users',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registration-users.component.html',
  styleUrl: './registration-users.component.css'
})
export class RegistrationUsersComponent {
  signUpForm: FormGroup;
  private userService = inject(UserService)

  constructor(private fb: FormBuilder, private router: Router) {
    this.signUpForm = this.fb.group({
      card: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      const signUpData = this.signUpForm.value;
      const user = {
        cedula: this.signUpForm.get('card')?.value,
        nombre: this.signUpForm.get('name')?.value,
        apellido: this.signUpForm.get('lastName')?.value,
        correo: this.signUpForm.get('email')?.value,
        contraseña: this.signUpForm.get('password')?.value
      }
      //console.log('Datos de registro:', signUpData);
      this.userService.signUpUser(user).subscribe(
        data =>{
          console.log(data);
          this.router.navigate(['/login']); 
        }
      )
      
    }
  }
  
  onLogin() {
    this.router.navigate(['/login']); 
  }
}

