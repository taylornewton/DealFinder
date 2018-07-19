import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './services/auth.service';
import { MockAuthService } from './mocks/auth-service.mock';

describe('Component: AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: any;
  let mockAuthService = new MockAuthService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ],
      imports: [
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    compiled = fixture.debugElement.nativeElement;
  });

  function detectChanges() {
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  }

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  describe(`nav`, () => {
    it(`should render`, async(() => {
      expect(compiled.querySelector('nav')).toBeTruthy();
    }));

    it('should display full nav if logged in', () => {
      app.isLoggedIn = true;
      detectChanges();
      expect(compiled.querySelectorAll('ul li').length).toEqual(5);
    });

    it('should only display logout if not logged in', () => {
      app.isLoggedIn = false;
      detectChanges();
      expect(compiled.querySelectorAll('ul li').length).toEqual(1);
    });
  });

  it('render main', async(() => {
    expect(compiled.querySelector('main')).toBeTruthy();
  }));

  it('logout should call logout', () => {
    spyOn(mockAuthService, 'logout').and.stub();
    app.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });
});
