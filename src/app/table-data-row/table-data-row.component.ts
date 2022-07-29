import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-data-row',
  templateUrl: './table-data-row.component.html',
  styleUrls: ['./table-data-row.component.css'],
})
export class TableDataRowComponent implements OnInit {
  @Input('data') data: string;
  @Input('columnOrder') columnOrder: number[];
  @Input() tableType: string;
  @Input() resourceId: number;
  @Input() isSelected: boolean;
  @Output() selectRowEvent = new EventEmitter();
  public newRowObject = {};

  constructor() {}

  ngOnInit(): void {}

  selectRowHandler(check: boolean, id: string) {
    this.selectRowEvent.emit({ id, check });
  }
}
