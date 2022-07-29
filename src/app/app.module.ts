import { ResourceService } from './resource.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service';
import { ProjectService } from './project.service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { TableComponent } from './table/table.component';
import { TableDataRowComponent } from './table-data-row/table-data-row.component';
import { TableDataHeaderComponent } from './table-data-header/table-data-header.component';
import { TableHeaderFeatureComponent } from './table-header-feature/table-header-feature.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { ResourceComponent } from './resource/resource.component';
import { ProjectComponent } from './project/project.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginFormComponent,
    FormComponent,
    SignUpFormComponent,
    TableComponent,
    TableDataRowComponent,
    TableDataHeaderComponent,
    TableHeaderFeatureComponent,
    SideNavbarComponent,
    ResourceComponent,
    ProjectComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: ResourceComponent },
      { path: 'login', component: LoginFormComponent },
      { path: 'signup', component: SignUpFormComponent },
      {
        path: 'resource',
        component: ResourceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'project',
        component: ProjectComponent,
        canActivate: [AuthGuard],
      },
      { path: '**', component: NotFoundComponent },
    ]),
  ],
  providers: [ResourceService, UserService, AuthGuard, ProjectService],
  bootstrap: [AppComponent],
})
export class AppModule {}
