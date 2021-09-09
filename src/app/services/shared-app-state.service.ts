import { Injectable } from '@angular/core';
import { GolfCourse, GolfCourseDataService } from '../services/golf-course-data.service';
import { Observable, Subscription } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedAppStateService {

  //This is the 'global store object'
  private _appState = {
    courseList: [],
    selectedCourseID: ''
  };

  constructor(private dataService: GolfCourseDataService){}

  // save some data
  public set(propName: string, value: any): void {
    this._appState[propName] = value;
  }

  // load some data
  public get(propName: string): any {
    return this._appState[propName];
  }

  // This is some wierd thing I did that works
  public callAPIThenSaveDataInAppStateAndReturnResultAsCachedReplayOfObservable() {
    // I think this creates an observable that is a cached version (replay) of the api returned observable
    const courseListReplay$: Observable<GolfCourse[]> = this.dataService.fetchGolfCourses().pipe(shareReplay(1));
    // Now I'm just going to subscribe for long enough to grab the data, then save it in the global state so any component can ask for it later
    let temporarySubscription: Subscription = courseListReplay$.subscribe( data => {
      this.set("courseList", data); // got what I need, thanks
      temporarySubscription.unsubscribe(); // I have to unsubscribe now, bye
    });
    // now just pass this observable along to whoever wants to subscribe to it.
    return courseListReplay$;
  }

}
