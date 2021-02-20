import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courses } from '../model/courses.model';
import { Materials } from '../model/materials.model';
import { StudentsList } from '../model/studentsList.model';
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

 @ViewChild('fileInput' , {static:false}) fileInput : ElementRef;

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
    
      this.serviceGet.getPredmetByAkronim(this.id).subscribe((zap:Courses)=>{
        this.predmet = zap;
       console.log(this.predmet)
        this.obavestenja = this.predmet.obavestenja;
      })
      this.dohvatiPredavanja();
      this.dohvatiSpisakStudenata();
      // In a real app: dispatch action to load the details here.
   });
  }


  dohvatiSpisakStudenata()
  {
    this.serviceGet.dohvatiSpisakStudenata(this.id).subscribe((s:StudentsList[])=>{
      this.students = s;
      
      for(let index of s)
        if(index.potrebanFajl)
        {
          this.potrebanFajl = true
          return;
        }
      
        this.potrebanFajl = false;
     })
  }

  dohvatiPredavanja()
  {
    this.serviceGet.getMaterials(this.id).subscribe((m:Materials)=>{
     this.podaci = m;
    })
  }
  dodajMe(event)
  {
    let naziv = event.target.value;
    let student = localStorage.getItem('user');
    console.log("Naziv je  : " + naziv)
    console.log("Student je "  + student)

    this.serviceGet.dodajNaSpisak(naziv, student).subscribe((a:any)=>{
      
    })

  }


  onSubmit(){

      const imageBlob =this.fileInput.nativeElement.files[0];
      const formData = new FormData();

      // TODO ubacvi proveru za ZIP, 7z
      
      formData.set("file" , imageBlob);
      formData.set("id" , this.id);
      formData.set("studentName" , localStorage.getItem('user'))
    this.serviceGet.uploadSpisak(formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );

  
    
  }

  message:string;
  putanja : String;
  predmet:Courses;
  podaci:Materials;
  students: StudentsList[];
  potrebanFajl : boolean


  obavestenja:Array<Object>;
}
