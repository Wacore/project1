import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { ColumnInfo } from '../column';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  public projectId: any;
  public projectScopeFields: ColumnInfo[] = [];
  public surveyFields: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private _projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.queryParamMap.get('projectId');
    this._projectService
      .getProject(parseInt(this.projectId))
      .subscribe((res) => {
        this.projectScopeFields = res.columnInfo;
        this.projectScopeFields.map((field) => {
          field.isSelected = false;
        });
        this.projectScopeFields.sort((a, b) => (a.id > b.id ? 1 : -1));
        this.projectScopeFields[0]['isSelected'] = true;
      });
  }

  onClickAddField() {
    this.surveyFields.push({
      columnName: '',
      columnType: '',
      formula: '',
    });
  }

  onClickDeleteField(index: number) {
    this.surveyFields.splice(index, 1);
  }

  onClickSubmit() {
    const queryParams: any[] = [];
    this.projectScopeFields.map((field: ColumnInfo) => {
      if (field.isSelected) {
        field['columnName:']?.replace(' ', '_');
        queryParams.push(field['columnName:']);
      }
    });
    this.surveyFields.map((field: any) => {
      queryParams.push(field.columnName);

      // call http to send the data.
      this._projectService
        .addTemplate(
          this.projectId,
          field.columnName,
          field.columnType,
          field.formula
        )
        .subscribe((res) => {});
    });
    const params = queryParams.join('&');
    this.router.navigate(['/formula'], {
      queryParams: { selected_columns: params },
    });
  }
}
