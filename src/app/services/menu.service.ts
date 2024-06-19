import { Injectable } from '@angular/core';
export interface IMenu{
  title:String,
  url:string,
  icono:string
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  listMenu: IMenu[] = [
    {title: 'Reserva de Vuelos', url: '/login', icono: '/assets/icons/reserva.png'},
    {title: 'Historial de reservas', url: '/historial', icono: '/assets/icons/historial.png'}
]

  constructor() { }
  getMenu():IMenu[]{
    return[...this.listMenu]
  }
  getMenuByUrl(url: string):IMenu{
    return this.listMenu.find(
      (menu) =>menu.url.toLowerCase() === url.toLowerCase() 
    ) as IMenu
  }
}
