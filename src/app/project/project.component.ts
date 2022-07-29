import { ResourceService } from './../resource.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ColumnInfo } from '../column';
import { SidebarService } from '../sidebar.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @Input() isSideBarOpen: boolean;
  public tableType: string = 'project';
  public resourceData: any = {};
  public projectData: any = {};
  public columnOrder: number[];
  public projectId: number = 29;

  public resourceTableDetail: any = [];
  public resouceColumnInfo: ColumnInfo[] = [];
  public projectTableDetail: any = [];
  public projectColumnInfo: ColumnInfo[] = [];

  constructor(
    private _resourceService: ResourceService,
    private _projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.resourceData = this._resourceService
      .getResourceData()
      .subscribe((res) => {
        this.resourceData = res;
        [this.resouceColumnInfo, this.resourceTableDetail] = [
          this.resourceData.columnInfo,
          this.resourceData.tableDetail,
        ];
        this.resourceTableDetail.map((data: any) => (data.isSelected = false));
        this.resouceColumnInfo = this._resourceService.uniqueColumnInfo(
          this.resouceColumnInfo
        );
        this.getColumnSet();
      });

    this._projectService.getProject(this.projectId).subscribe((res) => {
      this.projectData = res;
      [this.projectTableDetail, this.projectColumnInfo] = [
        this.projectData.tableDetail,
        this.projectData.columnInfo,
      ];
    });
  }

  ngOnChange(changes: SimpleChanges) {}

  getColumnSet() {
    const columnOrderArr: number[] = [];
    this.resouceColumnInfo.map((c) => columnOrderArr.push(c.id));
    this.columnOrder = columnOrderArr.sort();
  }

  getSelectedResourceArr(arr: any) {
    // this.resourceTableDetail = arr;
    const selectedIds: string[] = [];
    this.projectTableDetail = arr.map((resource: any) => {
      resource.isSelected = false;
      selectedIds.push(resource.resourceId);
      return resource;
    });

    this.resourceTableDetail =
      this.filterResourcesFromResourceDetailTable(selectedIds);
    // console.log('Selected resource:', this.selectedResourceTableDetail);
    console.log(selectedIds);
  }

  filterResourcesFromResourceDetailTable(selectedIds: string[]) {
    return this.resourceTableDetail.filter((resource: any) => {
      return !selectedIds.includes(resource.resourceId);
    });
  }
}
