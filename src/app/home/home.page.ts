import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { SharedAppStateService } from '../services/shared-app-state.service';
import { GolfCourse } from '../services/golf-course-data.service'; // I just need to use this interface here, not needing the service
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public currentUser$!: Observable<any>;
  public currentUserSub!: Subscription;
  public isAuthed!: boolean;
  public currentUserEmail!: string | undefined;
  public courseList$!: Observable<GolfCourse[]>;

  constructor(
    private firebase: FirebaseService,
    private appState: SharedAppStateService,
    private router: Router
  ) {}

  ngOnInit(){
    this.subscribeToCurrentUser();
    this.courseList$ = this.appState.preloadCourseList();
  }

  subscribeToCurrentUser(): void {
    this.currentUser$ = this.firebase.observableUser();
    this.currentUserSub = this.currentUser$.subscribe(( user )=>{
      console.log('subscription: ', user );
      if( user === null){ this.isAuthed = false; this.currentUserEmail = undefined; }
      else{ this.isAuthed = true; this.currentUserEmail = user.email };
    });
  }

  navigateToSetupPage(courseID:string): void{
    this.appState.set('selectedCourseID', courseID);
    this.router.navigate(['new'], {state: {selectedCourseID: courseID}});
  }

  testSignIn(){
    this.firebase.signinUser({email:'fake@fake.com', password:'123456'});
  }
  testSignOut(){
    this.firebase.signoutUser();
  }
}

