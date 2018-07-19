import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn: boolean;

  constructor(private _authService: AuthService) {
    _authService.loggedIn$.subscribe(loggedIn => this.isLoggedIn = loggedIn);
  }

  logout() {
    this._authService.logout();
  }
}
