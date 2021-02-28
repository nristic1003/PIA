import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Obavestenje } from '../model/obavestenje';
import { GetDataService } from '../Services/get-data.service';

@Component({
  selector: 'app-azuriranje-vesti',
  templateUrl: './azuriranje-vesti.component.html',
  styleUrls: ['./azuriranje-vesti.component.css'],
})
export class AzuriranjeVestiComponent implements OnInit {
  @ViewChild('inputMultiple', { static: false }) inputMultiple: ElementRef;
  constructor(private service: GetDataService, private router: Router) {}

  ngOnInit(): void {
    this.obavestenje = JSON.parse(localStorage.getItem('obavestenje'));
    console.log(this.obavestenje.id);
  }

  azuriraj() {
    console.log(this.obavestenje);

    const formData = new FormData();

    let niz = [];

    for (let index of this.inputMultiple.nativeElement.files) {
      niz.push(index.name);
      formData.append('files', index);
    }

    this.obavestenje.predmeti = this.niz;

    this.service
      .updateObavestenja(this.obavestenje, this.niz)
      .subscribe((a: any) => {});

    this.router.navigate(['/profesor']);
  }

  checkData(event) {
    if (event.target.checked) {
      this.niz.push(event.target.value);
      console.log('Pushed' + event.target.value);
    } else {
      this.niz.forEach((element, index) => {
        if (element == event.target.value) {
          this.niz.splice(index, 1);
          console.log('Poped at index' + index);
        }
      });
    }
  }
  niz = [];

  obavestenje: Obavestenje;
}
