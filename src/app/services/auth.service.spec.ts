import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MockRouter } from '../mocks/router.mock';
import { AngularFireAuth } from 'angularfire2/auth';
import { MockFireAuth } from '../mocks/fire-auth.mock';

describe('AuthService', () => {
  let service: AuthService;
  let mockRouter: MockRouter;
  let mockFireAuth: MockFireAuth;

  beforeEach(() => {
    mockRouter = new MockRouter();
    mockFireAuth = new MockFireAuth(); 

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: mockFireAuth },
        { provide: Router, useValue: mockRouter }
      ]
    });
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('on authState update', () => {
    it('should update userDetails to be logged in', () => {
      mockFireAuth.authState.next({ foo: 'bar' });
      expect(service.isLoggedIn()).toEqual(true);
    });

    it('should call redirect if user valid', () => {
      spyOn(AuthService.prototype, 'redirectToIntendedPath').and.stub();
      mockFireAuth.authState.next({ foo: 'bar' });
      expect(AuthService.prototype.redirectToIntendedPath).toHaveBeenCalled();
    });

    it('should not call redirect if user null', () => {
      spyOn(AuthService.prototype, 'redirectToIntendedPath').and.stub();
      mockFireAuth.authState.next(null);
      expect(AuthService.prototype.redirectToIntendedPath).not.toHaveBeenCalled();
    });
  });

  describe('canActivate()', () => {
    beforeEach(() => {
      sessionStorage.removeItem('auth_redirect');
    });

    it('returns true if logged in', () => {
      spyOn(AuthService.prototype, 'isLoggedIn').and.returnValue(true);
      const result = service.canActivate(null, null);
      expect(result).toEqual(true);
    });

    describe('if not logged in', () => {
      beforeEach(() => {
        spyOn(AuthService.prototype, 'isLoggedIn').and.returnValue(false);
      });

      it ('stores state url if not \'login\' or \'/\'', () => {
        const state = { url: 'bloop', snapshot: null, root: null };
        service.canActivate(null, state);
        expect(sessionStorage.getItem('auth_redirect')).toEqual('bloop');
      });

      it ('doesn\'t store state if route is /', () => {
        const state = { url: '/', snapshot: null, root: null };
        service.canActivate(null, state);
        expect(sessionStorage.getItem('auth_redirect')).toBeFalsy();
      });

      it ('does\'t store state if route is \'login\'', () => {
        const state = { url: 'login', snapshot: null, root: null };
        service.canActivate(null, state);
        expect(sessionStorage.getItem('auth_redirect')).toBeFalsy();
      });

      it('navigates to login', () => {
        const state = { url: 'login', snapshot: null, root: null };
        spyOn(mockRouter, 'navigate').and.callThrough();
        service.canActivate(null, state);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
      });
    });

    it('signIn() should call signInWithEmailAndPassword', () => {
      spyOn(mockFireAuth.auth, 'signInWithEmailAndPassword').and.callThrough();
      service.signIn('test@test.com', '123');
      expect(mockFireAuth.auth.signInWithEmailAndPassword).toHaveBeenCalledWith('test@test.com', '123');
    });

    describe('logout', () => {
      it('should call signOut', () => {
        spyOn(mockFireAuth.auth, 'signOut').and.callThrough();
        service.logout();
        expect(mockFireAuth.auth.signOut).toHaveBeenCalled();
      });

      it('should navigate to login', fakeAsync(() => {        
        spyOn(mockRouter, 'navigate').and.callThrough();
        service.logout();
        tick();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
      }));
    });

    describe('redirectToIntendedPath()', () => {
      it('should redirect to path if in session storage', () => {
        sessionStorage.setItem('auth_redirect', 'foo');
        spyOn(mockRouter, 'navigateByUrl').and.callThrough();
        service.redirectToIntendedPath();
        expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('foo');
      });

      it('should remove item from storage if in session storage', () => {
        sessionStorage.setItem('auth_redirect', 'foo');
        service.redirectToIntendedPath();
        expect(sessionStorage.getItem('auth_redirect')).toBeFalsy();
      });

      it('should redirect to / if not in session storage', () => {
        spyOn(mockRouter, 'navigateByUrl').and.callThrough();
        service.redirectToIntendedPath();
        expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/');
      });
    });
  });
});
