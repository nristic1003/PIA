import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Courses } from '../model/courses.model';
import { Materials } from '../model/materials.model';
import { Plan } from '../model/plan.model';
import { User } from '../model/user.model';
import { Zaposleni } from '../model/zaposleni.model';
import { GetDataService } from '../Services/get-data.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  constructor(private service:GetDataService) { }

  @ViewChild('fileInput' , {static:false}) fileInput : ElementRef;
  @ViewChild('fileInput2' , {static:false}) fileInput2 : ElementRef;

  ngOnInit(): void {
    let username =  localStorage.getItem('user');
    this.service.getPlan(username).subscribe((plan:Plan[])=>{
      this.myCourses = plan;
      console.log(this.myCourses)
      this.todo(this.myCourses[0].akronim);
      this.dohvatiNastavnika(username);
   
    })
  }

  dohvatiNastavnika(username:String)
  {
    this.service.getZaposleniByUsername(username).subscribe((us:Zaposleni)=>{
      this.nastavnik = us;
      console.log(this.nastavnik)
    })
  }


  todo(value:String)
  {
    console.log(value);

    this.service.getPredmetByAkronim(value).subscribe((cr:Courses)=>{
      this.predmet = cr;
    })
    this.dohvatiMaterijale(value);
  }

  updatePodataka()
  {

    this.service.updatePredmet(this.predmet).subscribe((c:any)=>{

    });
  }

  updateInfoNastavnik()
  {
    this.service.updateInfoNastavnik(this.nastavnik).subscribe((c:any)=>{

    });
  }

  dohvatiMaterijale(value:String)
  {
    this.service.getMaterials(value).subscribe((m:Materials)=>{
     this.podaci = m;
    })
  }

  deleteMaterial(event)
  {
 
    let data = {
      "name" : event.target.id,
      "value" : event.target.value,
      "akronim" : this.predmet.akronim
    }

    console.log(data)
    this.service.deleteMaterial(data).subscribe((c:any)=>{

    })
  }

  onSubmit(event){
    console.log(event.target.value)
    let imageBlob;
    if(event.target.value==="matProjekat")
    {
       imageBlob =this.fileInput2.nativeElement.files[0];
    }else
    {
       imageBlob =this.fileInput.nativeElement.files[0];
    }
    const formData = new FormData();
    formData.set("file" , imageBlob);
    formData.set("id" , this.predmet.akronim);
    formData.set("nastavnik" , localStorage.getItem('user'));
    formData.set("arr" , event.target.value);

  this.service.sendDataToServer(formData).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
  );

  
}

  myCourses:Plan[];
  predmet: Courses;
  nastavnik:Zaposleni;
  podaci:Materials;
}
