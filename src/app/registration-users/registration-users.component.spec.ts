import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationUsersComponent } from './registration-users.component';

describe('RegistrationUsersComponent', () => {
  let component: RegistrationUsersComponent;
  let fixture: ComponentFixture<RegistrationUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
