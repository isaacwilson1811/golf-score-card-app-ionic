import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedAppStateService } from '../services/shared-app-state.service';
import { GolfCourse } from '../services/golf-course-data.service'; // I just need to use this interface here, not needing the service
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public courseList$!: Observable<GolfCourse[]>;

  constructor(
    private appState: SharedAppStateService,
    private router: Router
  ) {}

  ngOnInit(){
    // don't call the api service anymore, call the shared state service
    // it will call the api service for you, then it will give you a cached replay observable after it saves the data for itself
    // don't worry about it component, just keep doing your thing.
    this.courseList$ = this.appState.callAPIThenSaveDataInAppStateAndReturnResultAsCachedReplayOfObservable();
  }

  navigateToSetupPage(courseID:string): void{
    this.appState.set('selectedCourseID', courseID);
    this.router.navigate(['new'], {state: {selectedCourseID: courseID}});
  }
}

