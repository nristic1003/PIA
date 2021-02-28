import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Zaposleni } from '../model/zaposleni.model';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-azuriranje-profesora',
  templateUrl: './azuriranje-profesora.component.html',
  styleUrls: ['./azuriranje-profesora.component.css']
})
export class AzuriranjeProfesoraComponent implements OnInit {

  constructor(private service:AdminService) { }

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;


  ngOnInit(): void {
    this.z = JSON.parse(localStorage.getItem('profesor'));
  }

  azuriraj() {
 
    let oldUsername = this.z.username;
   

    this.service.azurirajProfesora(this.z, oldUsername).subscribe((app: any) => {});
  }

  z: Zaposleni;
}
