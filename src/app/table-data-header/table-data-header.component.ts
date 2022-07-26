import { ColumnInfo } from './../column';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-data-header',
  templateUrl: './table-data-header.component.html',
  styleUrls: ['./table-data-header.component.css']
})
export class TableDataHeaderComponent implements OnInit {
  @Input('header') header: ColumnInfo[];
  public sortedHeader: ColumnInfo[];

  constructor() { }

  ngOnInit(): void {
    this.sortedHeader = this.header.sort((a, b) => {
      return a.id - b.id
    })
  }

}
