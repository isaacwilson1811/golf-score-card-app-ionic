import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

interface API_Courses {courses: GolfCourse[]};
interface API_Details {data: CourseDetails};

export interface GolfCourse {
  name:string,
  id:string,
  image:string
}

export interface CourseDetails {
  id: string,
  includes: string
  courseId: number,
  statusId: number,
  status: string,
  courseTypeId: number,
  courseType: string,
  practiceAreaId: null,
  measurementTypeId: number,
  measurementType: string,
  mediaId: number,
  holeCount: number,
  lat: number,
  lng: number,
  popularityOneWeek: number,
  popularityThreeMonth: number,
  distanceFromMeKilometers: number,
  distanceFromMeMiles: number,
  localRankOneWeek: number,
  localRankThreeMonth: number,
  globalRankOneWeek: number,
  globalRankThreeMonth: number,
  localMaxRank: number,
  globalMaxRank: number,
  name: string,
  addr1: string,
  addr2: null | string,
  city: string,
  stateOrProvince: string,
  country: string,
  zipCode: string,
  phone: string,
  website: string,
  courseDesigner: null,
  courseArchitect: null,
  accomodations: null,
  hours: null,
  fax: null,
  fees: null,
  description: null,
  thumbnail: string,
  holes: Hole[]
}

export interface Hole {
  hole: number,
  courseHoleId: number,
  courseId: number,
  greenLat: number,
  greenLng: number,
  frontLat: number,
  frontLng: number,
  backLat: number,
  backLng: number
  pinLat: null,
  pinLng: null,
  pinExpires: null,
  teeBoxes: any[]
}

@Injectable({
  providedIn: 'root'
})
export class GolfCourseDataService {

  private API_URL: string = 'https://golf-courses-api.herokuapp.com/courses';
  private defaultData: object = {data: 'an error was caught, data stream was replaced with this object' };

  constructor(private httpClient: HttpClient) { }

  fetchGolfCourses(): Observable<GolfCourse[]> {
    const URL = this.API_URL;
    return this.httpClient.get<API_Courses>(URL).pipe(
      map( API_Courses => {
        const data: GolfCourse[] = API_Courses.courses
        return data
      }),
      catchError( this.handleError<any>('fetchAllData', this.defaultData) )
    );
  }

  fetchCourseDetails(courseID:string): Observable<CourseDetails> {
    const URL = `${this.API_URL}/${courseID}`;
    return this.httpClient.get<API_Details>(URL).pipe(
      map( API_Details => {
        const data: CourseDetails = API_Details.data
        // const courseDetails: CourseDetails = { holes: data.holes }
        return data
      }),
      catchError(this.handleError<any>(`fetchDataById: ${URL}`, this.defaultData))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      return of(result as T);
    };
  }

}
