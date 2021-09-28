import { Injectable } from '@angular/core';
import { GolfCourse, GolfCourseDataService } from '../services/golf-course-data.service';
import { PersistentStorageService } from './persistent-storage.service';
import { Observable, forkJoin, of } from 'rxjs';
import { shareReplay, first } from 'rxjs/operators';

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

  public preloadCourseList(): Observable<GolfCourse[]> {
    const storage_courseList= this.storageService.read('courseList');
    // check if the data is already in local storage, return it
    if (storage_courseList != null){
      console.log('data is already in storage');
      return of(storage_courseList).pipe(shareReplay(1));
    }
    // if not, call api and compile date, then return it
    const courseListReplay$: Observable<GolfCourse[]> = this.APIService.fetchGolfCourses().pipe(shareReplay(1));
    courseListReplay$.pipe(first()).subscribe((data:GolfCourse[]) => {
      this.set("courseList", data);
      this.joinCourseDetails();
    });
    return courseListReplay$;
  }

  private joinCourseDetails() {
    let requestIDList = [];
    this._appState.courseList.forEach( course => {
      requestIDList.push(course.id)
    });
    forkJoin({
      req0: this.APIService.fetchCourseDetails(requestIDList[0]), // you can pipe and map here
      req1: this.APIService.fetchCourseDetails(requestIDList[1]),
      req2: this.APIService.fetchCourseDetails(requestIDList[2])
    }).subscribe( ({req0,req1,req2}) => {
      this._appState.courseList[0].details = req0;
      this._appState.courseList[1].details = req1;
      this._appState.courseList[2].details = req2;
      this.storageService.write('courseList', this._appState.courseList);
    });
  }
}