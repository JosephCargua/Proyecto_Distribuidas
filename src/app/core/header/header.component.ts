import { Component } from '@angular/core';
import { IMenu, MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-header',

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  listMenu:IMenu[]
  expanded=true
  constructor(private menuService:MenuService){
    this.listMenu = menuService.getMenu()
  }
}
