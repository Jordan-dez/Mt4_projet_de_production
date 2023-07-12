import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicLinkStudentComponent } from './magic-link-student.component';

describe('MagicLinkStudentComponent', () => {
  let component: MagicLinkStudentComponent;
  let fixture: ComponentFixture<MagicLinkStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagicLinkStudentComponent]
    });
    fixture = TestBed.createComponent(MagicLinkStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
