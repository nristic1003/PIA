import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Zaposleni } from '../model/zaposleni.model';
import { GetDataService } from '../Services/get-data.service';

@Component({
  selector: 'app-prikaz-zaposlenog',
  templateUrl: './prikaz-zaposlenog.component.html',
  styleUrls: ['./prikaz-zaposlenog.component.css']
})
export class PrikazZaposlenogComponent implements OnInit {

  constructor(private route : ActivatedRoute, private serviceGet:GetDataService) { }
  id: string;
  private sub:any;

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.serviceGet.getZaposleniByUsername(this.id).subscribe((zap:Zaposleni)=>{
        this.zaposleni = zap;
        console.log(this.zaposleni)
      })
      // In a real app: dispatch action to load the details here.
   });
  }

  zaposleni:Zaposleni;

}
