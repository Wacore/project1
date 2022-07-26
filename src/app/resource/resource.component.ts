import { Component, Input, OnInit } from '@angular/core';
import { ColumnInfo } from '../column';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  @Input() isSideBarOpen: boolean;
  public tableType: string = 'resource';
  public resourceData: any = {};
  public columnInfo: ColumnInfo[] = [];
  public tableDetail: any = [];
  public columnOrder: number[];

  constructor(private _resourceService: ResourceService) {

  }

  ngOnInit(): void {
    this.resourceData = this._resourceService.getData();
    [this.columnInfo, this.tableDetail] = [this.resourceData.columnInfo, this.resourceData.tableDetail];
    this.getColumnSet();
  }

  getColumnSet() {
    const columnOrderArr: number[] = [];
    this.columnInfo.map((c) => columnOrderArr.push(c.id));
    this.columnOrder = columnOrderArr.sort();
  }
}
