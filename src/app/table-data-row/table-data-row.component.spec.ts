import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataRowComponent } from './table-data-row.component';

describe('TableDataRowComponent', () => {
  let component: TableDataRowComponent;
  let fixture: ComponentFixture<TableDataRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDataRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDataRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
