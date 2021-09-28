import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private db: AngularFirestore,
  ) { }

  // AUTH methods

  // getCurrentUser(): Promise<any> {
  //   return this.auth.currentUser
  // }

  // observableUser(): Observable<any> {
  //   return this.auth.user;
  // }

  // createUser(value) {
  //   return new Promise<any>((resolve, reject) => {
  //     this.auth.createUserWithEmailAndPassword(value.email, value.password)
  //       .then(
  //         res => {
  //           console.log('User Created. user ID: ', res.user.uid)
  //           resolve(res)
  //         },
  //         err => reject(err)
  //       )
  //   })
  // }

  // signinUser(value) {
  //   return new Promise<any>((resolve, reject) => {
  //     this.auth.signInWithEmailAndPassword(value.email, value.password)
  //       .then(
  //         res => {
  //           console.log('Sign In Action. user ID: ', res.user.uid);
  //           resolve(res);
  //         },
  //         err => reject(err)
  //       )
  //   })
  // }

  // signoutUser() {
  //   return new Promise<void>((resolve, reject) => {
  //     if (this.auth.currentUser) {
  //       this.auth.signOut()
  //         .then(() => {
  //           console.log("Sign out Action");
  //           resolve();
  //         }).catch(() => {
  //           reject();
  //         });
  //     }
  //   })
  // }
}
