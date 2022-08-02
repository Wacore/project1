import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ColumnInfo } from '../column';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css'],
})
export class FormulaComponent implements OnInit {
  public tableType: string = 'quantity survey';
  public projectId: number = 29;
  public projectData: any = [];
  public projectTableData: any[] = [];
  public projectColumnInfo: ColumnInfo[] = [];
  public columnOrder: any[];
  public selectedColumns: any[] = [];
  public hasParams: any;

  constructor(
    private _projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.hasParams = this.route.snapshot.queryParamMap.get('selected_columns');
    this._projectService.getProject(this.projectId).subscribe((res) => {
      this.projectData = res;
      this.projectColumnInfo = this.projectData.columnInfo;
      this.projectTableData = this.projectData.tableDetail;
      this.projectTableData.map((data: any) => {
        data.isEdit = false;
        data.isTouched = false;
      });
      if (this.hasParams) {
        this.selectedColumns = this.hasParams.split('&');
        this.projectColumnInfo = this.projectColumnInfo.filter(
          (c: ColumnInfo) => {
            return this.selectedColumns.includes(c['columnName:']);
          }
        );
      }

      this.getColumnSet();
      this.projectTableData.map((t: any) => {
        for (const key in t.content) {
          if (!this.columnOrder.includes(key)) {
            delete t.content[key];
          }
        }
        for (const key of this.columnOrder) {
          if (t.content[key] == undefined) {
            t.content[key] = 'No value';
          }
        }
      });
    });
  }

  getColumnSet() {
    const columnOrderArr: number[] = [];
    this.projectColumnInfo.map((c) => columnOrderArr.push(c.id));
    this.columnOrder = columnOrderArr.sort();
  }

  projectSelectionHandler(projectId: number) {
    this.projectId = projectId;
  }
}
