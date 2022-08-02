import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-data-row',
  templateUrl: './table-data-row.component.html',
  styleUrls: ['./table-data-row.component.css'],
})
export class TableDataRowComponent implements OnInit {
  @Input('data') data: any;
  @Input('columnOrder') columnOrder: number[];
  @Input() tableType: string;
  @Input() resourceId: number;
  @Input() isSelected: boolean;
  @Output() selectRowEvent = new EventEmitter();
  @Output() touchedFormulaRowEvent = new EventEmitter();

  public rowDatasArr: any[] = [];

  constructor() {}

  ngOnInit(): void {
    if (this.tableType == 'quantity survey') {
      for (const key in this.data) {
        const data = {
          resourceId: this.resourceId,
          columnId: key,
          data: this.data[key],
          isEdit: false,
          isTouched: false,
        };
        this.rowDatasArr.push(data);
      }
      console.log(this.rowDatasArr);
    }
  }

  selectRowHandler(check: boolean, id: string) {
    this.selectRowEvent.emit({ id, check });
  }

  touchedFormulaRowHandler() {
    this.touchedFormulaRowEvent.emit(this.rowDatasArr);
  }
}
