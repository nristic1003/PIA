import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Courses } from '../model/courses.model';
import { GetDataService } from '../Services/get-data.service';
import { LoginServiceService } from '../Services/login-service.service';

@Component({
  selector: 'app-master-studije',
  templateUrl: './master-studije.component.html',
  styleUrls: ['./master-studije.component.css'],
})
export class MasterStudijeComponent implements OnInit {
  constructor(
    private serviceGet: GetDataService,
    private router: Router,
    private loginService: LoginServiceService
  ) {}

  ngOnInit(): void {
    let id = '13M';
    this.serviceGet.predmetiMaster(id).subscribe((pred: Courses[]) => {
      this.predmeti = pred;
      this.predmeti.sort((a, b) => a.semestar - b.semestar);
      console.log(this.predmeti);
    });

    this.mojiPredmeti = JSON.parse(localStorage.getItem('mojiPredmeti'));
  }

  checkLogged() {
    return this.loginService.isLoggedIn();
  }

  checkPredmete(p: string) {
    var user = JSON.parse(localStorage.getItem('user'));
    if (user == undefined) return false;
    if (user.type == 'a' || user.type == 'z') return true;
    if (this.mojiPredmeti == null) return false;
    var x = this.mojiPredmeti.includes(p);
    if (x) return true;
    return false;
  }

  mojiPredmeti: string[];
  predmeti: Courses[];
}
