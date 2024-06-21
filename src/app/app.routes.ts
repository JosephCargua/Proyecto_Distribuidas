import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageIndexComponent } from './core/page-index/page-index.component';
import { IndexComponent } from './index/index.component';
import { HistoryAirComponent } from './history-air/history-air.component';
import { RegistrationUsersComponent } from './registration-users/registration-users.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'pages-index', component: PageIndexComponent},
    { path: 'inicio', component: IndexComponent},
    { path: 'historial', component: HistoryAirComponent},
    { path: 'register', component: RegistrationUsersComponent},
];
