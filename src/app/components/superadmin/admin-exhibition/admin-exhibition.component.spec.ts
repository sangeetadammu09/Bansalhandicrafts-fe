import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExhibitionComponent } from './admin-exhibition.component';

describe('AdminExhibitionComponent', () => {
  let component: AdminExhibitionComponent;
  let fixture: ComponentFixture<AdminExhibitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminExhibitionComponent]
    });
    fixture = TestBed.createComponent(AdminExhibitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
