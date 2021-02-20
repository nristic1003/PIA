import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Zaposleni } from '../model/zaposleni.model';
import { GetDataService } from '../Services/get-data.service';

@Component({
  selector: 'app-zaposleni',
  templateUrl: './zaposleni.component.html',
  styleUrls: ['./zaposleni.component.css']
})
export class ZaposleniComponent implements OnInit {

  constructor(private service:GetDataService) { }

  ngOnInit(): void {
    this.service.getZaposleni().subscribe((zap : Zaposleni[])=>{
      this.zaposleni = zap;

      
    });
  }


  zaposleni:Zaposleni[];
}
