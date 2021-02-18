import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { Zaposleni } from '../model/zaposleni.model';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service:AdminService ,private router:Router) { }


  @ViewChild('fileInput' , {static:false}) fileInput : ElementRef;

  ngOnInit(): void {

    this.service.dohvatiStudente().subscribe((s:User[])=>{
      this.students = s;
      console.log(s)
    })

    this.service.dohvatiZaposlene().subscribe((z:Zaposleni[])=>{
      this.zaposleni = z;
      console.log(z)
    })


  }

  deleteStudent(event)
  {
    let name = event.target.value;
    this.service.obrisiStudenta(name).subscribe((s:any)=>{

    })
  }


  dodajStudenta()
  {
    console.log(this.username)
    let data = {
      "username" : this.username,
      "name" : this.name,
      "lastname" : this.lastname,
      "password" : this.password,
      "indexNumber" : this.indexNumber,
      "status" : "neaktivan",
      "type" : this.type
    }
    console.log(data);
    this.service.dodajStudenta(data).subscribe((a:Response)=>{
      
    })
  }


  dodajZaposlenog()
  {
    //const imageBlob =this.fileInput.nativeElement.files[0].name;
    //
    console.log(this.username)
    let data = {
      "username" : this.username,
      "name" : this.name,
      "lastname" : this.lastname,
      "password" : this.password,
      "address" : this.address,
      "about" : this.about,
      "degree" : this.degree,
      "site" : this.site,
      "status" : "aktivan",
      "contact" : this.contact,
      "type" : "z"
    }
    console.log(data);
     this.service.dodajProfesora(data).subscribe((a:Response)=>{
      
     })
  }


  dodajPredmet()
  {
      let data = {
        "akronim" : this.akronim,
        "semestar" : this.semestar,
        "katedra" : this.katedra,
        "tip" : this.tip,
        "fondPredavanja" : this.fondPredavanja,
        "fondVezbe" : this.fondVezbe,
        "ESPB" : this.ESPB,
        "naziv":this.naziv
      }
      this.service.kreirajPredmet(data).subscribe((a:any)=>{
       
      })
      this.createPlan()
     
  }

  createPlan()
  {
      let grupa = []
     let  nastavnici = []
      let i = 1;
      for( let index of this.naPredmetu )
      {
        grupa.push("P" + i)
        nastavnici.push({"predavac" : index})
        i++;
        
      }


      console.log(nastavnici)
      let data = {
        "nastavnici" : nastavnici,
        "akronim"  : this.akronim,
        "grupa" : grupa,
        "naziv" : this.naziv
      }
      this.service.kreirajPlan(data).subscribe((a:any)=>{

      })
      
  }


username:string;
name:string;
lastname:string;
type:string;
password:string;
indexNumber:string;
address:string;
site:string;
about:string;
degree:string;
contact:string;

students : User[];
zaposleni : Zaposleni[];


//Predmet
naPredmetu:string[];
akronim : string;
semestar : number;
katedra : string;
tip : string;
fondPredavanja : string;
fondVezbe : string;
ESPB : number;
naziv:string


}
