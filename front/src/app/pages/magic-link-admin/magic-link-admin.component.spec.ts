import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicLinkAdminComponent } from './magic-link-admin.component';

describe('MagicLinkAdminComponent', () => {
  let component: MagicLinkAdminComponent;
  let fixture: ComponentFixture<MagicLinkAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagicLinkAdminComponent]
    });
    fixture = TestBed.createComponent(MagicLinkAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
