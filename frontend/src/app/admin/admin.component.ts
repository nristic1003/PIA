import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { Courses } from '../model/courses.model';
import { User } from '../model/user.model';
import { Zaposleni } from '../model/zaposleni.model';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    private service: AdminService,
    private router: Router,
    private ngxCsvParser: NgxCsvParser
  ) {}

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  csvRecords: any[] = [];

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  // Your applications input change listener for the CSV File
  fileChangeListener($event: any): void {
    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser
      .parse(files[0], { header: true, delimiter: ',' })
      .pipe()
      .subscribe(
        (result: Array<any>) => {
          console.log('Result', result);
          this.csvRecords = result;
          this.insertCSV();
        },
        (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      );
  }

  insertCSV() {
    console.log(this.csvRecords);

    for (let i = 0; i < this.csvRecords.length; i++) {
      this.csvRecords[i]['status'] = 'aktivan';
    }

    console.log(this.csvRecords);

    this.service.insertFromCsv(this.csvRecords).subscribe(() => {});
  }

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('user'));
    if (data === null || data.type != 'a') {
      console.log('usao');
      this.router.navigate(['/pocetna']);
    }

    this.service.dohvatiStudente().subscribe((s: User[]) => {
      this.students = s;
    });

    this.service.dohvatiZaposlene().subscribe((z: Zaposleni[]) => {
      this.zaposleni = z;
    });

    this.service.dohvatiSvePredmete().subscribe((a: Courses[]) => {
      this.sviPredmeti = a;
    });
  }

  deleteStudent(event) {
    let name = event.target.value;
    this.service.obrisiStudenta(name).subscribe((s: any) => {});
  }

  dodajStudenta() {
    var reg = new RegExp('^[1-2][0-9]{3}[/][0-9]{4}$');

    let flag = reg.test(this.indexNumber);
    if (!flag) {
      this.message = 'Index nije u ispravnom obliku';
      return;
    }
    console.log(this.lastname);
    if (
      this.name == undefined ||
      this.lastname == undefined ||
      this.password == undefined ||
      this.type == undefined
    ) {
      this.message = 'Svi podaci moraju biti uneti';
      return;
    }

    let username =
      this.lastname.charAt(0) +
      this.name.charAt(0) +
      this.indexNumber.charAt(2) +
      this.indexNumber.charAt(3) +
      +this.indexNumber.charAt(5) +
      +this.indexNumber.charAt(6) +
      +this.indexNumber.charAt(7) +
      +this.indexNumber.charAt(8) +
      this.type +
      '@student.etf.rs';

    username = username.toLowerCase();
    console.log(username);

    console.log(this.username);
    let data = {
      username: username,
      name: this.name,
      lastname: this.lastname,
      password: this.password,
      indexNumber: this.indexNumber,
      status: 'neaktivan',
      type: this.type,
    };
    console.log(data);
    this.service.dodajStudenta(data).subscribe((a: Response) => {});
  }

  azuriranjeStudenta(s: User) {
    console.log(s);
    localStorage.setItem('student', JSON.stringify(s));
    this.router.navigate(['/azuriraj-studenta']);
  }

  azurirajNastavnika(z: Zaposleni)
  {
    console.log(z);
    localStorage.setItem('profesor', JSON.stringify(z));
    this.router.navigate(['/azuriranje-profesora']);
  }

  dodajZaposlenog() {
    const imageBlob = this.fileInput.nativeElement.files[0];

    const formData = new FormData();
    // var img = new Image();

    // var flag = false;
    // img.src = URL.createObjectURL(imageBlob);
    // img.onload = (e: any) => {
    //   const height = e.path[0].height;
    //   const width = e.path[0].width;

    //   if (height > 300 || width > 300) {
    //     this.message =
    //       'Maksimalna velicina slike je 300x300 px. Trenutna velicina je: ' +
    //       height +
    //       'x' +
    //       width +
    //       ' px';
    //     flag = true;
    //   } else {
    //     this.message = '';
    //   }
    //   console.log(height, width);
    // };

    // console.log(flag);
    // if (flag) {
    //   return;
    // } else {
    //   console.log('neene');
    // }
    // console.log(img);

    formData.set('file', imageBlob);
    formData.set('id', 'profesori');

    var imageName;

    if (imageBlob == undefined) imageName = 'about.jpg';
    else imageName = imageBlob.name;

    let data = {
      username: this.username,
      name: this.name,
      lastname: this.lastname,
      password: this.password,
      address: this.address,
      about: this.about,
      degree: this.degree,
      site: this.site,
      status: 'aktivan',
      contact: this.contact,
      type: 'z',
      courses: [],
      image: imageName,
    };
    console.log(data);
    this.service.dodajProfesora(data).subscribe((a: Response) => {});

    if (imageBlob != undefined)
      this.service.uploadImage(formData).subscribe((a: Response) => {});
  }

  dodajPredmet() {
    let data = {
      akronim: this.akronim,
      semestar: this.semestar,
      katedra: this.katedra,
      tip: this.tip,
      fondPredavanja: this.fondPredavanja,
      fondVezbe: this.fondVezbe,
      ESPB: this.ESPB,
      naziv: this.naziv,
      nastavnik: [],
    };
    this.service.kreirajPredmet(data).subscribe((a: any) => {});
    this.createPlan();
  }

  createPlan() {
    let grupa = [];
    let nastavnici = [];

    let i = 1;
    for (let index of this.naPredmetu) {
      grupa.push('P' + i);
      nastavnici.push({ predavac: index });
      i++;
    }

    let materials = {
      matPred: [],
      matVezbe: [],
      ispitnaPitanja: [],
      matLaboratorija: [],
      akronim: this.akronim,
    };

    //kuresevi
    let d = {
      profesori: this.naPredmetu,
      akronim: this.akronim,
      nastavnici: nastavnici,
      materijali: materials,
    };

    this.service.dodajKurseveProfesoru(d).subscribe((a: any) => {});

    // console.log(nastavnici)
    let data = {
      nastavnici: nastavnici,
      akronim: this.akronim,
      grupa: grupa,
      naziv: this.naziv,
    };

    this.service.kreirajPlan(data).subscribe((a: any) => {});
  }

  checkData(event) {
    if (event.target.checked) {
      this.nizStudenata.push(event.target.value);
      console.log(' Pushed ' + event.target.value);
    } else {
      this.nizStudenata.forEach((element, index) => {
        if (element == event.target.value) {
          this.nizStudenata.splice(index, 1);
          console.log(' Poped at index ' + index);
        }
      });
    }
  }

  studentPredmet() {
    console.log(this.izabranPredmet);
    console.log(this.nizStudenata);

    let dataArray = [];

    for (let predmet of this.izabranPredmet) {
      for (let student of this.nizStudenata) {
        let d = {
          username: student,
          akronim: predmet,
        };

        dataArray.push(d);
      }
    }

    console.log(dataArray);

    this.service.studentPredmet(dataArray).subscribe((a: any) => {});
  }

  sviPredmeti: Courses[];
  izabranPredmet: string[];

  nizStudenata = [];

  message: string;

  username: string;
  name: string;
  lastname: string;
  type: string;
  password: string;
  indexNumber: string;
  address: string;
  site: string;
  about: string;
  degree: string;
  contact: string;

  students: User[];
  zaposleni: Zaposleni[];

  //Predmet
  naPredmetu: string[];
  akronim: string;
  semestar: number;
  katedra: string;
  tip: string;
  fondPredavanja: string;
  fondVezbe: string;
  ESPB: number;
  naziv: string;
  flag = false;
}
