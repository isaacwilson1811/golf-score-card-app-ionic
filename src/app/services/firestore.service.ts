import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { AuthService } from './auth.service'
import { User } from '@firebase/auth-types'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {

  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
    private router: Router
  ) { }

  async saveData(DTO:any) {
    const user:User|null = await this.auth.getUserPromise();
    if (user === null){return}
    this.db.collection('USERS').doc(user.uid).collection('GOLFDATA').doc('SCORECARD').set(DTO).then(_=>console.log('data saved'));
  }

  //get that observable data stream, then save it somewhere that behaves properly and unsubscribe asap!
  async loadData() {
    const user:User|null = await this.auth.getUserPromise();
    if (user === null){return}
    const Obs = this.db.collection('USERS').doc(user.uid).collection('GOLFDATA').doc('SCORECARD').valueChanges();
    const Sub: Subscription = Obs.subscribe((document:any) => {
      sessionStorage.setItem('holeCardList', JSON.stringify(document.holeCardList));
      sessionStorage.setItem('totalsCard', JSON.stringify(document.totalsCard));
      this.router.navigateByUrl('continue-game');
      Sub.unsubscribe();
    });
  }

}
