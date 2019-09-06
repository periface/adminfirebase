import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { IAuthModel } from './models/auth.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  userSnapshot: firebase.User;
  /**
   *
   */
  constructor(public afa: AngularFireAuth) {
    this.user = afa.user;
    this.user.subscribe(usr => {
      if (usr) {
        this.userSnapshot = usr;
      }
    });
  }
  login(input: IAuthModel): Promise<firebase.auth.UserCredential> {
    return this.afa.auth.signInWithEmailAndPassword(
      input.email,
      input.password
    );
  }
  logout() {
    this.afa.auth.signOut();
  }
}
