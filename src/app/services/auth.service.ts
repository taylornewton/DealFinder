import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  private loggedIn = new BehaviorSubject(false);
  loggedIn$ = this.loggedIn.asObservable();

  private userDetails: firebase.User;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) { 
    const user = _firebaseAuth.authState;
    this.userDetails = null;

    user.subscribe(
      (usr) => {
        this.userDetails = usr;
        this.loggedIn.next(this.userDetails != null);
        if (usr)
          this.redirectToIntendedPath();
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isLoggedIn()) {
      return true; 
    }

    if (state.url !== '/' && state.url.indexOf('login') === -1) {
      sessionStorage.setItem('auth_redirect', state.url);
    }
    this.router.navigate(['login']);
    return false;
  }

  signIn(email: string, pwd: string) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, pwd);
  }

  isLoggedIn() {
    return this.userDetails != null;
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then(() => this.router.navigate(['login']));
  }

  redirectToIntendedPath() {
    if (sessionStorage.getItem('auth_redirect')) {
      const path = sessionStorage.getItem('auth_redirect');
      sessionStorage.removeItem('auth_redirect');
      this.router.navigateByUrl(path);
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
