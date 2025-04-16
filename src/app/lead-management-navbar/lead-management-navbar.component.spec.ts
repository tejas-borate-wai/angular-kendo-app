import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadManagementNavbarComponent } from './lead-management-navbar.component';

describe('LeadManagementNavbarComponent', () => {
  let component: LeadManagementNavbarComponent;
  let fixture: ComponentFixture<LeadManagementNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadManagementNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadManagementNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
