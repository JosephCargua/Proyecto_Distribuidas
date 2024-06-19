import { Component, ContentChildren, Input, QueryList, SimpleChanges, ViewChild, contentChildren, viewChild } from '@angular/core';
import { MetaDataColumn } from '../interfaces/metacolumn.interface';
import { MatColumnDef, MatTable } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
@Input() data:any
@Input() metaDataColumns!:MetaDataColumn[]

@ContentChildren(MatColumnDef,{descendants:true}) columnDef!:QueryList<MatColumnDef>
columns:string[] = []

ngOnChanges(changes:SimpleChanges)
{
  if(changes['metaDataColumns']){
    this.columns = this.metaDataColumns.map((x)=> x.field)
  }
}
ngAfterContentInit(){
  if(!this.columnDef){return}
  this.columnDef.forEach(column =>{
    this.columns.push(column.name)
  }
  )
}

}
