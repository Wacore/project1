import { ResourceService } from './../resource.service';
import { ColumnInfo } from './../column';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() tableType: string;
  @Input() resourceData: any;
  @Input() columnInfo: ColumnInfo[];
  @Input() tableDetail: any;
  @Input() projectTableType: string;
  @Input() columnOrder: number[];
  @Output() selectedResourceArrEvent = new EventEmitter();

  public renderTableDetail: any = [];
  public selectedResourceArr: any = [];

  public isAddFeature: boolean = false;
  public isAddRow: boolean = false;
  public isAddColumn: boolean = false;

  public newRowObject: any;
  public newRowObjectContent: any;

  constructor(private _resourceService: ResourceService) { }

  ngOnInit(): void {
    this.renderTableDetail = this.tableDetail.slice(0);
    console.log(this.tableDetail)
  }


  // Methods for Resource Table
  // handle the add row event to toggle displaying the input row
  addResourceRowHandler(value: boolean) {
    this.isAddRow = value;
    const content: any = {};
    this.columnOrder.map((c) => {
      content[c] = ""
    })

    this.newRowObjectContent = content;
  }

  confirmResourceHandler() {
    this.newRowObject = {
      resourceId: Math.round((Math.random() * 100) + 1),
      content: this.newRowObjectContent
    }

    this.renderTableDetail.push(this.newRowObject);
    this.resetResourceRowHandler();
    this.isAddRow = false;
  }

  resetResourceRowHandler() {
    this.newRowObjectContent = {};
    this.isAddRow = false;
  }

  searchResourceHandler(term: string) {
    this.renderTableDetail = this.renderTableDetail.filter((col: any) => {
      return Object.values(col.content).includes(term);
    })

  }

  // Methods for project table
  allRowSelectionHandler(value: boolean) {
    console.log(value)
    this.renderTableDetail.map((row: any) => row.isSelected = value);
    if (value) {
      this.selectedResourceArr = this.renderTableDetail;
      console.log(this.selectedResourceArr);
    } else {
      this.selectedResourceArr = [];
      console.log(this.selectedResourceArr);
    }
  }

  rowSelectionHandler(input: any) {
    const { id, check } = input;
    const index = this.renderTableDetail.findIndex((r: any) => r.resourceId == id);
    this.renderTableDetail[index]['isSelected'] = check;
    if (check) {
      this.selectedResourceArr = [...this.selectedResourceArr, this.renderTableDetail[index]];
    } else {
      this.selectedResourceArr = this.selectedResourceArr.filter((r: any) => r.resourceId != id);
    }
  }

  sendSelectedResourceArr() {
    // console.log('Send data');
    if (this.selectedResourceArr.length > 0) {
      this.selectedResourceArrEvent.emit(this.selectedResourceArr);
    }
  }

}
