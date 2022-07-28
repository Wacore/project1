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

  constructor(
    private _resourceService: ResourceService,
    public sidebarSerive: SidebarService
  ) {}

  ngOnInit(): void {
    this._resourceService.getResourceData().subscribe((result) => {
      this.resourceData = result;

      // this.resourceData = this._resourceService.getData();
      [this.columnInfo, this.tableDetail] = [
        this.resourceData.columnInfo,
        this.resourceData.tableDetail,
      ];
      this.columnInfo = this._resourceService.uniqueColumnInfo(this.columnInfo);
      this.getColumnSet();

      // console.log(this.columnInfo, this.tableDetail);
      this._resourceService.updateColumnInfo(this.columnInfo);
      this._resourceService.updateTableDetail(this.tableDetail);
    });
  }

  getColumnSet() {
    const columnOrderArr: number[] = [];
    this.columnInfo.map((c) => columnOrderArr.push(c.id));
    this.columnOrder = columnOrderArr.sort();
  }
}
