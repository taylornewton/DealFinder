import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';

export class MockAuthService {
  loggedIn = new BehaviorSubject(false);
  loggedIn$ = this.loggedIn.asObservable();
  
  completeAuthentication() {}
  signIn(): Promise<any> { return Promise.resolve(); }
  isLoggedIn(): Observable<boolean> { return of(this.loggedIn.value); }
  logout(): Observable<any> { return of({}); }
}