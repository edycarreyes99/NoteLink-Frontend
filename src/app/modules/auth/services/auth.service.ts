import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import firebase from 'firebase/compat/app'
import {CURRENT_USER_LS} from "../../../core/constants/local-storage.constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    public router: Router
  ) {
  }

  // Method to do log in with social networks
  firebaseSocialLogin(provider: firebase.auth.GoogleAuthProvider_Instance): Promise<firebase.User> {
    return new Promise<firebase.User>(async (resolve, rejects) => {
      this.angularFireAuth.signInWithPopup(provider).then((res) => {
        if (res.user) {
          localStorage.setItem(CURRENT_USER_LS, JSON.stringify(res.user));
          this.router.navigate(['']);
          resolve(res.user);
        } else {
          rejects();
        }
      }).catch((error) => {
        console.error('Error doing login with social networks', error);
      });
    });
  }

  // Method to do log in with Google
  googleLogin(): Promise<firebase.User> {
    return new Promise<firebase.User>(async (resolve, rejects) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.firebaseSocialLogin(provider).then((res) => resolve(res)).catch((error) => rejects(error));
    });
  }

  // Method to get the current user
  getUser(): firebase.auth.UserCredential {
    const userData = localStorage.getItem(CURRENT_USER_LS);
    return JSON.parse(userData ?? '');
  }

  // Method to do log out
  async logout(): Promise<void> {
    return new Promise<void>(async (resolve, rejects) => {
      await this.angularFireAuth.signOut();
      localStorage.removeItem(CURRENT_USER_LS);
      await this.router.navigate(['login']);
    })
  }
}