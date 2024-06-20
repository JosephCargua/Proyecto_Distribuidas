import { Component, inject } from '@angular/core';
import { MetaDataColumn } from '../shared/interfaces/metacolumn.interface';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-history-air',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, SharedModule],
  templateUrl: './history-air.component.html',
  styleUrl: './history-air.component.css'
})
export class HistoryAirComponent {
  
  //private projectsService = inject(ProjectsService);

  data:any = []

  
  MetaDataColumn: MetaDataColumn[] = [
    {field:'id', title:'Codigo'},
    {field:'name', title:'Nombre'},
    {field:'description', title:'Descripcion'},
    {field:'dateStart', title:'Fecha Inicio'},
    {field:'dateEnd', title:'Fecha FIn'},
    {field:'club', title:'Club'},
  ]
  records:any =[]
  totalRecords = this.records.length
  constructor(){
    //this.loadProjects()
  }
  
  field: any=[];
  
  loadProjects(){
    /*
    this.projectsService.getProjects().subscribe(
      (data) =>{
        this.records = data.data;
        console.log(this.records);
        this.records.forEach((dato:any) => {
          
          this.field.push({
            id: dato.id,
            name: dato.Nombre,
            description: dato.Descripcion,
            dateStart: dato.Fecha_Ini,
            dateEnd: dato.Fecha_Fin,
            club: dato.Id_Club.Nombre
          });
        })

        this.totalRecords = this.records.length
        this.changePage(0)
      }
    )
    */
  }
  changePage(page:number){
    const pageSize = environment.PAGE_SIZE
    const skip = pageSize * page
    this.data = this.field.slice(skip, skip + pageSize)
  }
    
 
}
