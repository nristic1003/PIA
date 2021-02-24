import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Courses } from '../model/courses.model';
import { StudentCourse } from '../model/studentCourse.model';
import { GetDataService } from '../Services/get-data.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  constructor(private service: GetDataService, private router: Router) {}

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('user')).username;

    console.log(this.username);
    //provera

    this.service
      .getMojePredmete(this.username)
      .subscribe((a: StudentCourse[]) => {
        this.moji = a;
        let niz = [];
        for (let index of this.moji) niz.push(index.akronim);

        localStorage.setItem('mojiPredmeti', JSON.stringify(niz));

        this.service.getMyCourses(niz).subscribe((a: Courses[]) => {
          this.predmeti = a;
          console.log(this.predmeti);
        });
      });
  }

  predmeti: Courses[];
  moji: StudentCourse[];
  username: string;
}
