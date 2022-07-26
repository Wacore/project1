import { ResourceService } from './resource.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [ResourceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
