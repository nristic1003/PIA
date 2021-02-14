import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../Services/get-data.service';

@Component({
  selector: 'app-obavestenja',
  templateUrl: './obavestenja.component.html',
  styleUrls: ['./obavestenja.component.css']
})
export class ObavestenjaComponent implements OnInit {

  constructor(private getDataServis:GetDataService ) { }

  ngOnInit(): void {
    this.getDataServis.getObavestenja().subscribe((notif : Notification[])=>{
      this.notifications = notif;
    })
  }


  notifications:Notification[]

}
