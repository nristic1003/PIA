import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Courses } from '../model/courses.model';
import { Materials } from '../model/materials.model';
import { Plan } from '../model/plan.model';
import { StudentsList } from '../model/studentsList.model';
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
  @ViewChild('fileInput3' , {static:false}) fileInput3 : ElementRef;
  @ViewChild('fileInput4' , {static:false}) fileInput4 : ElementRef;
  @ViewChild('fileInput5' , {static:false}) fileInput5 : ElementRef;
  @ViewChild('inputMultiple' , {static:false}) inputMultiple : ElementRef;

  ngOnInit(): void {
    let username =  localStorage.getItem('user');
    this.service.getPlan(username).subscribe((plan:Plan[])=>{
      this.myCourses = plan;
      for (let index of this.myCourses)
        console.log(index)
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
    console.log( " Vrednost je: " +  value);

    this.service.getPredmetByAkronim(value).subscribe((cr:Courses)=>{
      this.predmet = cr;
     console.log(this.predmet)
    })
    this.dohvatiMaterijale(value);
  }

  updatePodataka()
  {
    console.log("Update predmeta")
    console.log(this.predmet)
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
     console.log("My materials" +m )
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

  uploadMultiple()
  {
      const formData = new FormData();

      let niz = []

      for(let index of this.inputMultiple.nativeElement.files)
      {
        niz.push(index.name)
        formData.append("files" , index)
      }

      formData.append("id" , this.predmet.akronim)
         
     let  date = Date.now().toString()
     console.log(date)

         let data = {
           "id" :  date,
           "naziv": this.naslovVesti,
           "tekst" : this.tekstVesti,
           "datum" : this.datumObjave,
           "nazivFajla" : niz,
           "kreator" : localStorage.getItem('user')
           
         }
         
         
      this.service.uploadMultiple(formData).subscribe((r:any)=>{
        console.log(r)
      }) 

         this.service.dodajObavestenja(data, this.niz).subscribe((s:any)=>{

         })

  }

  azurirajVest(event)
  {

  }

  onSubmit(event){
    console.log(event.target.value)
    let imageBlob;
    let folder;
    switch(event.target.value)
    {
      case "matPred":{
        imageBlob =this.fileInput3.nativeElement.files[0];
        folder = "Predavanja"
        break;
      }
      case "matVezbe":{
        imageBlob =this.fileInput4.nativeElement.files[0];
        folder = "Vezbe"
        break;
      }
      case "ispitnaPitanja":{
        imageBlob =this.fileInput5.nativeElement.files[0];
        folder = "Ipit"
        break;
      }
      case "matProjekat":{
        imageBlob =this.fileInput2.nativeElement.files[0];
        folder = "Projekat"
        break;
      }
      case "matLaboratorija":{
        imageBlob =this.fileInput.nativeElement.files[0];
        folder = "Laboratorija"
        break;
      }
    }


    const formData = new FormData();
    formData.set("file" , imageBlob);
    formData.set("id" , this.predmet.akronim);
    formData.set("nastavnik" , localStorage.getItem('user'));
    formData.set("arr" , event.target.value);
    formData.set("folderName", folder);

  this.service.sendDataToServer(formData).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
  );

  
}


deleteVest(event)
{
  
   let id = event.target.value
  console.log(id)
   this.service.deleteVest(id).subscribe((a:any)=>{

   })
}

objaviLabVest()
{
    let d = {
      "naslovLab" : this.naslovLab,
      "tekstLab" : this.tekstLab,
      "vrednost" : this.vrednostLab
    }

   this.service.dodajLabVezbu(this.predmet.akronim , d).subscribe((a:any)=>{

   })

}

objaviProjekatVest()
{
  let d = {
    "nazivVezbe" : this.naslovProjekat,
    "opis" : this.tekstProjekat,
    "vrednost" : this.vrednostProjekat
  }

 this.service.dodajProjekatVezbu(this.predmet.akronim , d).subscribe((a:any)=>{

 })

}

createList()
{
  console.log(this.datumOdrzavanja)

  let data = {
    "akronim" : this.predmet.akronim,
    "naziv" : this.nazivSpiska,
    "otvoren" : this.otvorenaPrijava,
    "termin" : this.datumOdrzavanja,
    "vremeKraja" : this.datumKraja,
    "mesto" : this.mestoOdrzavanja,
    "limit" : this.limit,
    "potrebanFajl" :this.potrebanFajl,
    "studenti" : [],
    "trenutniBroj" : 0
  }

  this.service.createList(data).subscribe((a:any)=>{
    
  })


}


checkData(event)
{
 

  if(event.target.checked)
  { 
    this.niz.push(event.target.value)
    console.log("Pushed" + event.target.value)

  }else
  {
    this.niz.forEach((element,index)=>{
      if(element==event.target.value) {
        this.niz.splice(index,1);
        console.log("Poped at index" + index)
      }
   });
  
  }


 //uradi ovo
}
  myCourses:Plan[];
  predmet: Courses;
  nastavnik:Zaposleni;
  podaci:Materials;
  naslovVesti:string;
  tekstVesti:string;
  datumObjave:string;
  naslovLab:string;
  tekstLab:string;
  vrednostLab:number
  naslovProjekat:string;
  vrednostProjekat:number;
  tekstProjekat:string
  niz = [];
  profesor = localStorage.getItem('user');
  spisak:StudentsList;

  nazivSpiska:string;
  datumOdrzavanja:Date;
  otvorenaPrijava:boolean;
  potrebanFajl:boolean;
  datumKraja:Date;
  mestoOdrzavanja:String;
  limit:number;



  
}
