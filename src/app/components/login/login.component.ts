import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  error: string;

  constructor(private _authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signIn() {
    this._authService.signIn(this.email, this.password)
      .then(() => {
        this.router.navigate(['/']);
      }).catch((err) => this.error = err);
  }
}
