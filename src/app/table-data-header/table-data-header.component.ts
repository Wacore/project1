import { ColumnInfo } from './../column';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-table-data-header',
  templateUrl: './table-data-header.component.html',
  styleUrls: ['./table-data-header.component.css'],
})
export class TableDataHeaderComponent implements OnInit {
  @Input('header') header: any[];
  public sortedHeader: any[];

  constructor(private _resourceService: ResourceService) {}

  ngOnInit(): void {
    this.sortedHeader = this.header.sort((a, b) => {
      return a.id - b.id;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['header']) {
      this.sortedHeader = this.header.sort((a, b) => {
        return a.id - b.id;
      });
    }
  }
}
