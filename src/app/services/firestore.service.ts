import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { AuthService } from './auth.service'
import { User } from '@firebase/auth-types'
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {

  constructor(
    private db: AngularFirestore,
    private auth: AuthService
  ) { }

  async saveData(DTO:any) {
    const user:User|null = await this.auth.getUserPromise();
    if (user === null){return}
    this.db.collection('USERS').doc(user.uid).collection('GOLFDATA').doc('SCORECARD').set(DTO).then(_=>console.log('data saved'));
  }

}
