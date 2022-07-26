import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHeaderFeatureComponent } from './table-header-feature.component';

describe('TableHeaderFeatureComponent', () => {
  let component: TableHeaderFeatureComponent;
  let fixture: ComponentFixture<TableHeaderFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableHeaderFeatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableHeaderFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
