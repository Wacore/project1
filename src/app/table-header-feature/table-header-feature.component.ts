import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-header-feature',
  templateUrl: './table-header-feature.component.html',
  styleUrls: ['./table-header-feature.component.css'],
})
export class TableHeaderFeatureComponent implements OnInit {
  @Input('isAddFeature') isAddFeature: boolean;
  @Input('isAddRow') isAddRow: boolean;
  @Input('isAddColumn') isAddColumn: boolean;
  @Input() isSelectAllRow: boolean;
  @Input() isDeleteAllSelected: boolean;
  @Input('type') type: string;
  @Input('projectTableFeatureType') featureType: string;
  @Output() addRowEvent = new EventEmitter();
  @Output() isSelectAllRowsEvent = new EventEmitter();
  @Output() clickAddResourcesEvent = new EventEmitter();
  @Output() clcikDeleteSelectedResourcesEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onAddClick() {
    this.isAddFeature = !this.isAddFeature;
  }

  addRowHandler() {
    this.addRowEvent.emit(true);
  }

  isSelectAllRows(value: boolean) {
    // console.log(value);
    this.isSelectAllRowsEvent.emit(value);
  }

  onClickAddResources() {
    this.clickAddResourcesEvent.emit();
  }

  onClickDeleteResources() {
    console.log('Delete resource');
    this.clcikDeleteSelectedResourcesEvent.emit();
  }
}
