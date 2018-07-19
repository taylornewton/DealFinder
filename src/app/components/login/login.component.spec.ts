import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MockRouter } from '../../mocks/router.mock';
import { AuthService } from '../../services/auth.service';
import { MockAuthService } from '../../mocks/auth-service.mock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuth = new MockAuthService();
  let mockRouter = new MockRouter();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuth },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('signIn()', () => {
    it('should call auth signIn with email and password', () => {
      spyOn(mockAuth, 'signIn').and.callThrough();
      component.email = 'test';
      component.password = '123';
      component.signIn();
      expect(mockAuth.signIn).toHaveBeenCalledWith('test', '123');
    });

    it('should navigate to / on success', fakeAsync(() => {
      spyOn(mockRouter, 'navigate');
      component.signIn();      
      tick();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    }));
  });
});
