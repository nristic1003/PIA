import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courses } from '../model/courses.model';
import { GetDataService } from '../Services/get-data.service';

@Component({
  selector: 'app-prikaz-predmeta',
  templateUrl: './prikaz-predmeta.component.html',
  styleUrls: ['./prikaz-predmeta.component.css']
})
export class PrikazPredmetaComponent implements OnInit {

  constructor(private route : ActivatedRoute, private serviceGet:GetDataService) { }
  id: string;
  private sub:any;

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
    
      this.serviceGet.getPredmetByAkronim(this.id).subscribe((zap:Courses)=>{
        this.predmet = zap;
       
        this.obavestenja = this.predmet.obavestenja;
        
        
      })
      // In a real app: dispatch action to load the details here.
   });
  }

  predmet:Courses;
  obavestenja:Array<Object>;
}
