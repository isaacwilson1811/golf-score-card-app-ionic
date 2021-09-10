import { Injectable } from '@angular/core';
import { GolfCourse, GolfCourseDataService } from '../services/golf-course-data.service';
import { PersistentStorageService } from './persistent-storage.service';
import { Observable, Subscription } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedAppStateService {

  //This is the 'global store object'
  private _appState = {
    courseList: undefined,
    selectedCourseID: undefined,
    playerList: undefined
  };

  constructor(
    private APIService: GolfCourseDataService,
    private storageService: PersistentStorageService
  ){}

  // set key to value in the app state and save to local storage
  public set(key:string, value:any) {
    this._appState[key] = value;
    this.storageService.write(key, value);
  }

  // load some data
  public get(key:string): any {
    const storageValue = this.storageService.read(key);
    const stateValue = this._appState[key];

    if (!storageValue && !stateValue) {
      console.log('no key found', key);
      return undefined;
    }

    if(storageValue && stateValue){
      console.log('key found in state and storage', key)
      return stateValue;
    }

    if(storageValue && !stateValue){
      this.set(key, storageValue);
      console.log('key found in storage', key)
      return storageValue;
    }

    else if(!storageValue && stateValue){
      this.storageService.write(key, stateValue);
      console.log('key found in state', key)
      return stateValue;
    }
  }

  // This is some wierd thing I did that works
  public callAPIThenSaveDataInAppStateAndReturnResultAsCachedReplayOfObservable() {
    // I think this creates an observable that is a cached version (replay) of the api returned observable
    const courseListReplay$: Observable<GolfCourse[]> = this.APIService.fetchGolfCourses().pipe(shareReplay(1));
    // Now I'm just going to subscribe for long enough to grab the data, then save it in the global state so any component can ask for it later
    let temporarySubscription: Subscription = courseListReplay$.subscribe( data => {
      this.set("courseList", data); // got what I need, thanks
      temporarySubscription.unsubscribe(); // I have to unsubscribe now, bye
    });
    // now just pass this observable along to whoever wants to subscribe to it.
    return courseListReplay$;
  }

}
