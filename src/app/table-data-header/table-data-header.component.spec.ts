import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataHeaderComponent } from './table-data-header.component';

describe('TableDataHeaderComponent', () => {
  let component: TableDataHeaderComponent;
  let fixture: ComponentFixture<TableDataHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDataHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDataHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
