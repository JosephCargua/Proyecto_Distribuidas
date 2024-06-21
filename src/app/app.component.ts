import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from "./core/core.module";
import { LoginComponent } from './login/login.component';
import { RegistrationUsersComponent } from './registration-users/registration-users.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, CoreModule, RegistrationUsersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Aerolinea';
  isLoginRoute = false;
  isRegisterRoute = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isLoginRoute = event.urlAfterRedirects === '/login';
        this.isRegisterRoute = event.urlAfterRedirects === '/register';
      });
  }
}
