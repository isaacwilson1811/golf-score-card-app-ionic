import { Component, OnInit } from '@angular/core';
import { GolfCourse, GolfCourseDataService } from '../services/golf-course-data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public courseList$!: Observable<GolfCourse[]>;

  constructor(
    private dataService: GolfCourseDataService,
    private router: Router
  ) {}

  ngOnInit(){
    this.getCourseList$();
  }

  getCourseList$(): void {
    this.courseList$ = this.dataService.fetchGolfCourses()
  }

  onStartSetup(courseID:string): void{
    this.router.navigate(['new'], {
      state: {selectedCourseID: courseID}
    });

  }

}

