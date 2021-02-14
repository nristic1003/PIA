import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courses } from '../model/courses.model';
import { GetDataService } from '../Services/get-data.service';
@Component({
  selector: 'app-osnovne',
  templateUrl: './osnovne.component.html',
  styleUrls: ['./osnovne.component.css']
})
export class OsnovneComponent implements OnInit {

  constructor(private route : ActivatedRoute , private serviceGet:GetDataService) { }
  id: string;
  private sub:any;

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.serviceGet.getPredmeti(this.id).subscribe((pred:Courses[])=>{
        this.predmeti = pred;
        this.predmeti.sort((a, b) => a.semestar - b.semestar)
      })
      // In a real app: dispatch action to load the details here.
   });
  }

  predmeti: Courses[];


}
