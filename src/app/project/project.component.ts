import { ResourceService } from './../resource.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ColumnInfo } from '../column';
import { SidebarService } from '../sidebar.service';
import { ProjectService } from '../project.service';
import { project } from '../project';

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
  public projectList: project[] = [];
  public toggleProjectList: boolean = false;

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

    this.projectList = this._projectService.projectList;
    console.log(this.projectList);
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

    this.resourceTableDetail = this.filterResourcesFromTable(
      this.resourceTableDetail,
      selectedIds
    );
  }

  filterResourcesFromTable(tableDetail: any[], selectedIds: string[]) {
    return tableDetail.filter((resource: any) => {
      return !selectedIds.includes(resource.resourceId);
    });
  }

  deleteSelectedResourceFromSelectedTable(arr: any) {
    const selectedIdsArr: string[] = [];
    arr.map((resource: any) => {
      resource.isSelected = false;
      selectedIdsArr.push(resource.resourceId);
      this.resourceTableDetail = [...this.resourceTableDetail, resource];
      return resource;
    });

    this.projectTableDetail = this.filterResourcesFromTable(
      this.projectTableDetail,
      selectedIdsArr
    );
  }
}
