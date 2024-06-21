import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ISignIn, ISignUp } from '../../../interfaces/userAuth.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  getUsers():Observable<any>{
    return this.http.get<any>(environment.URL_API_USERS + "ListarUsuario");
  }

  signUpUser(user: ISignUp): Observable<ISignUp>{
    return this.http.post<ISignUp>(environment.URL_API_USERS + "RegistrarUsuario",user);
  }

  signInUser(user: ISignIn): Observable<ISignIn>{
    return this.http.post<ISignIn>(environment.URL_API_USERS + `LoginUsuario/${user.correo}/${user.contraseña}`, user);
  }

  updateUser(user: ISignUp): Observable<ISignUp>{
    return this.http.put<ISignUp>(environment.URL_API_USERS + "ActualizarUsuario", user);
  }

  deleteUser(card: string){
    return this.http.delete(environment.URL_API_USERS + `EliminarUsuario/${card}`);
  }

  saveInLocalStorage(key:string, values:any){
    return localStorage.setItem(key, JSON.stringify(values));
  }

  getFromLocalStorage(key: string): any {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }
}
