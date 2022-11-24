import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import firebase from 'firebase/compat/app'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  constructor(
    private authService: AuthService
  ) {
  }

  // Method to log in with Google
  async loginWithGoogle(): Promise<firebase.User> {
    return new Promise<firebase.User>(async (resolve, rejects) => {
      await this.authService.googleLogin().then((res) => resolve(res)).catch((error) => rejects(error));
    });
  }
}
