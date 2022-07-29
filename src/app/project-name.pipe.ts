import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectName',
})
export class ProjectNamePipe implements PipeTransform {
  transform(value: any, projectId: number): string {
    return value.filter((v: any) => v.id == projectId).map((v: any) => v.name);
  }
}
