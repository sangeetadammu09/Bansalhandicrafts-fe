import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminprojectComponent } from './adminproject.component';

describe('AdminprojectComponent', () => {
  let component: AdminprojectComponent;
  let fixture: ComponentFixture<AdminprojectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminprojectComponent]
    });
    fixture = TestBed.createComponent(AdminprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
