import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-users',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registration-users.component.html',
  styleUrl: './registration-users.component.css'
})
export class RegistrationUsersComponent {
  signUpForm: FormGroup;

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
      console.log('Datos de registro:', signUpData);
      this.router.navigate(['/login']); 
    }
  }
  onLogin() {
    this.router.navigate(['/login']); 
  }
}

