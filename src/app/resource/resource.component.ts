import { Component, Input, OnInit } from '@angular/core';
import { ColumnInfo } from '../column';
import { ResourceService } from '../resource.service';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
})
export class ResourceComponent implements OnInit {
  @Input() isSideBarOpen: boolean;
  public tableType: string = 'resource';
  public resourceData: any = {};
  public columnInfo: any[] = [];
  public tableDetail: any = [];
  public columnOrder: number[];
  public isAddFeature: boolean = false;
  public isAddRow: boolean = false;
  public isAddColumn: boolean = false;
  public renderTableDetail: any = [];
  public newRowObject: any;
  public newRowObjectContent: any;
  private resourceId: number;

  constructor(
    private _resourceService: ResourceService,
    public sidebarSerive: SidebarService
  ) {}

  ngOnInit(): void {
    this._resourceService.getResourceData().subscribe((result) => {
      this.resourceData = result;
      [this.columnInfo, this.tableDetail] = [
        this.resourceData.columnInfo,
        this.resourceData.tableDetail,
      ];
      this.columnInfo = this._resourceService.uniqueColumnInfo(this.columnInfo);
      this.getColumnSet();
      this.renderTableDetail = this.tableDetail.slice();
      // this._resourceService.updateColumnInfo(this.columnInfo);
    });
  }

  getColumnSet() {
    const columnOrderArr: number[] = [];
    this.columnInfo.map((c) => columnOrderArr.push(c.id));
    this.columnOrder = columnOrderArr.sort();
  }

  addResourceRowHandler(value: boolean) {
    this.isAddRow = value;
    this._resourceService.postResource().subscribe((res) => {
      this.resourceId = res.id;
    });

    const content: any = {};
    this.columnOrder.map((c) => {
      content[c] = '';
    });

    this.newRowObjectContent = content;
  }

  confirmResourceHandler() {
    this.newRowObject = {
      resourceId: this.resourceId,
      content: this.newRowObjectContent,
    };

    this.renderTableDetail.push(this.newRowObject);

    for (const columnId in this.newRowObjectContent) {
      this._resourceService
        .setEntry(
          this.resourceId,
          parseInt(columnId),
          this.newRowObjectContent[columnId]
        )
        .subscribe((res) => console.log(res));
    }
    this.newRowObjectContent = {};
    this.isAddRow = false;
  }

  resetResourceRowHandler() {
    this.newRowObjectContent = {};
    this.isAddRow = false;
    this._resourceService.deleteResource(this.resourceId).subscribe((res) => {
      console.log(res);
      console.log('deleted row');
    });
    this.resourceId = 0;
  }

  searchResourceHandler(term: string) {
    if (!term) {
      this.renderTableDetail = this.tableDetail;
    } else {
      this.renderTableDetail = this.renderTableDetail.filter((col: any) => {
        return Object.values(col.content).includes(term);
      });
    }
  }
}
