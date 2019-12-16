import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSeriesComponent } from './table-series.component';

describe('TableSeriesComponent', () => {
  let component: TableSeriesComponent;
  let fixture: ComponentFixture<TableSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
