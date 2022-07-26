import { ResourceService } from './../resource.service';
import { Component, Input, OnInit } from '@angular/core';
import { ColumnInfo } from '../column';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() isSideBarOpen: boolean;
  public tableType: string = 'project';
  public resourceData: any = {};
  public columnInfo: ColumnInfo[] = [];
  public tableDetail: any = [];
  public columnOrder: number[];

  public resourceTableDetail: any = [];
  public selectedResourceTableDetail: any = [];

  constructor(private _resourceService: ResourceService) { }

  ngOnInit(): void {
    this.resourceData = this._resourceService.getData();
    [this.columnInfo, this.resourceTableDetail] = [this.resourceData.columnInfo, this.resourceData.tableDetail];
    this.resourceTableDetail.map((data: any) => data.isSelected = false);
    this.getColumnSet();
  }

  getColumnSet() {
    const columnOrderArr: number[] = [];
    this.columnInfo.map((c) => columnOrderArr.push(c.id));
    this.columnOrder = columnOrderArr.sort();
  }

  getSelectedResourceArr(arr: any) {
    // this.resourceTableDetail = arr;
    this.selectedResourceTableDetail = arr;
    console.log('Selected resource:', this.selectedResourceTableDetail);
  }
}
