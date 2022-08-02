import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrls: ['./project-selector.component.css'],
})
export class ProjectSelectorComponent implements OnInit {
  public toggleProjectList: boolean = false;
  public projectList: project[] = [];
  public projectId: number = 29;
  @Output() selectProjectEvent = new EventEmitter();

  constructor(private _projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectList = this._projectService.projectList;
  }

  selectProject(projectId: number) {
    this.projectId = projectId;
    this.selectProjectEvent.emit(projectId);
  }
}
