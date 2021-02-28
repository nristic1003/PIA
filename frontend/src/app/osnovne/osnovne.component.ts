import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courses } from '../model/courses.model';
import { GetDataService } from '../Services/get-data.service';
import { LoginServiceService } from '../Services/login-service.service';
@Component({
  selector: 'app-osnovne',
  templateUrl: './osnovne.component.html',
  styleUrls: ['./osnovne.component.css'],
})
export class OsnovneComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private serviceGet: GetDataService,
    private loginService: LoginServiceService
  ) {}
  id: string;
  private sub: any;

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
      this.serviceGet.getPredmeti(this.id).subscribe((pred: Courses[]) => {
        this.predmeti = pred;

        this.predmeti.sort((a, b) => a.semestar - b.semestar);
        console.log(this.predmeti);
      });
      // In a real app: dispatch action to load the details here.
    });

    this.mojiPredmeti = JSON.parse(localStorage.getItem('mojiPredmeti'));
    console.log(this.mojiPredmeti[0]);
    console.log(this.mojiPredmeti);
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

  predmeti: Courses[];
  mojiPredmeti: string[];
}
