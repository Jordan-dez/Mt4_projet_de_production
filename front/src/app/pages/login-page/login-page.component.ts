import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private Router: Router, private _Auth: AuthService) { }

  async ngOnInit() {
    // check if the url has a query param named "token"
    // if it does, then store the token in local storage, if it doesn't, then redirect to the login page
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      // try logging in with the token
      try {
        await this._Auth.loginWithToken(token);
      } catch (error) {
        console.error(error);
        this.Router.navigate(['/']);
      }
    } else {
      // redirect to HomeComponent
      this.Router.navigate(['/']);
    }
  }
}
