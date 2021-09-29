import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { User } from '@firebase/auth-types'
import { Observable } from 'rxjs'

export interface SignInValues { email: string, password: string }

@Injectable({providedIn: 'root'})

export class AuthService {
  constructor( private auth: AngularFireAuth ) { }

  async getIsAuthed(): Promise<boolean> {
    const response = await this.auth.currentUser;
    return response !== null ? true: false;
  }

  getUser(): Observable<User> {
    return this.auth.user
  }

  getUserPromise(): Promise<User> | Promise<null> {
    return this.auth.currentUser;
  }

  createUser(values:SignInValues): Promise<any> {
    return new Promise<any>(( resolve, reject ) => {
      this.auth.createUserWithEmailAndPassword( values.email, values.password )
        .then( res => resolve(res), err => reject(err) )
    })
  }

  signinUser(values:SignInValues): Promise<any> {
    return new Promise<any>(( resolve, reject ) => {
      this.auth.signInWithEmailAndPassword(values.email, values.password)
        .then( res => resolve(res), err => reject(err) )
    })
  }

  signoutUser(): Promise<void> {
    return new Promise<void>(( resolve, reject ) => {
      if (this.auth.currentUser) { this.auth.signOut()
        .then( () => resolve() )
          .catch( () => reject() )
      }
    })
  }

}
