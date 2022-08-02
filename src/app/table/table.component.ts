import { ResourceService } from './../resource.service';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() tableType: string;
  @Input() resourceData: any;
  @Input() columnInfo: any;
  @Input() tableDetail: any;
  @Input() projectTableType: string;
  @Input() columnOrder: number[];
  @Input() projectId: number;
  @Input() postSelectedResourceFunc: (arr: any) => void;
  @Output() selectedResourceArrEvent = new EventEmitter();
  @Output() deleteSelectedResourcesEvent = new EventEmitter();

  public renderTableDetail: any = [];
  public selectedResourceArr: any = [];
  public addedProjectResourceArr: any = [];

  public isAddFeature: boolean = false;
  public isAddRow: boolean = false;
  public isAddColumn: boolean = false;

  public newRowObject: any;
  public newRowObjectContent: any;

  public touchedFormulaRowArr: any[] = [];

  constructor(
    private _resourceService: ResourceService,
    private _projectService: ProjectService
  ) {}

  ngOnInit(): void {
    // this.renderTableDetail = this.tableDetail.slice(0);
    if (this.projectTableType == 'resource') {
      // this._resourceService.currentColumn.subscribe((column) => {
      //   this.column = column;
      //   console.log(this.column);
      // });
      console.log('resource');
    }
    console.log(this.projectId);
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['tableDetail']) {
      this.tableDetail = this.tableDetail;
      this.renderTableDetail = this.tableDetail.slice();
    }
    if (changes['columnInfo']) {
      this.columnInfo = this.columnInfo;
    }
  }

  // Methods for Resource Table
  // handle the add row event to toggle displaying the input row
  addResourceRowHandler(value: boolean) {
    this.isAddRow = value;
    const content: any = {};
    this.columnOrder.map((c) => {
      content[c] = '';
    });

    this.newRowObjectContent = content;
  }

  confirmResourceHandler() {
    this.newRowObject = {
      resourceId: Math.round(Math.random() * 100 + 1),
      content: this.newRowObjectContent,
    };

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
    });
  }

  // Methods for project table
  allRowSelectionHandler(value: boolean) {
    console.log(value);
    this.renderTableDetail.map((row: any) => (row.isSelected = value));
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
    const index = this.renderTableDetail.findIndex(
      (r: any) => r.resourceId == id
    );
    this.renderTableDetail[index]['isSelected'] = check;
    if (check) {
      if (this.projectTableType == 'resourceTable') {
        this.selectedResourceArr = this.addSelectedResource(
          this.selectedResourceArr,
          this.renderTableDetail[index]
        );
      }
      if (this.projectTableType == 'selectedTable') {
        this.addedProjectResourceArr = this.addSelectedResource(
          this.addedProjectResourceArr,
          this.renderTableDetail[index]
        );
      }
    } else {
      if (this.projectTableType == 'resourceTable') {
        this.selectedResourceArr = this.selectedResourceArr.filter(
          (r: any) => r.resourceId != id
        );
      } else {
        this.addedProjectResourceArr = this.addedProjectResourceArr.filter(
          (r: any) => r.resourceId != id
        );
      }
    }
  }

  addSelectedResource(resourceArr: any[], resource: any) {
    return [...resourceArr, resource];
  }

  sendSelectedResourceArr() {
    // console.log('Send data');
    if (this.selectedResourceArr.length > 0) {
      this.selectedResourceArrEvent.emit(this.selectedResourceArr);
      this.selectedResourceArr = [];
    }
  }

  sendSelectedDeletedResourceArr() {
    // console.log('delete row event click from header');
    if (this.addedProjectResourceArr.length > 0) {
      this.deleteSelectedResourcesEvent.emit(this.addedProjectResourceArr);
      this.addedProjectResourceArr = [];
    }
  }

  sendEditedDataFromFormulaPage(arr: any[]) {
    for (const item of arr) {
      if (item.isTouched) {
        this.touchedFormulaRowArr.push(item);
      }
    }

    console.log(this.touchedFormulaRowArr);
  }

  clickPostEditedFormulaHandler() {
    this.touchedFormulaRowArr.map((item) => {
      this._projectService
        .setEntry(item.resourceId, item.columnId, item.data)
        .subscribe((res) => console.log(res));
    });
  }
}
