import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NtTableGridComponent } from './nt.table.grid.component';

describe('NtTableGridComponent', () => {
  let component: NtTableGridComponent;
  let fixture: ComponentFixture<NtTableGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NtTableGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NtTableGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
