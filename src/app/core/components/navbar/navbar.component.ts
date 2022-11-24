import {Component} from '@angular/core';
import firebase from 'firebase/compat/app';
import {AuthService} from "../../../modules/auth/services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // Component variables
  user: firebase.User | null;

  constructor(
    private authService: AuthService
  ) {
    this.user = this.authService.getUser();
  }

  // Method to log out
  async doLogout(): Promise<void> {
    await this.authService.logout();
  }
}
