import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  uri = 'http://localhost:4000';

  dodajStudenta(data: any) {
    let d = {
      data: data,
    };
    return this.http.post(`${this.uri}/register`, d);
  }
  dodajProfesora(data: any) {
    let d = {
      data: data,
    };
    return this.http.post(`${this.uri}/register`, d);
  }

  dohvatiStudente() {
    return this.http.get(`${this.uri}/getStudenti`);
  }
  dohvatiZaposlene() {
    return this.http.get(`${this.uri}/getZaposleni`);
  }
  dohvatiSvePredmete() {
    return this.http.get(`${this.uri}/dohvatiSvePredmete`);
  }
  obrisiStudenta(username: string) {
    let data = {
      username: username,
    };
    return this.http.post(`${this.uri}/removeUser`, data);
  }
  kreirajPlan(data: any) {
    let d = {
      data: data,
    };
    return this.http.post(`${this.uri}/kreirajPlan`, d);
  }

  dodajKurseveProfesoru(data: any) {
    let d = {
      data: data,
    };
    return this.http.post(`${this.uri}/dodajKurseveProfesoru`, d);
  }

  kreirajPredmet(data: any) {
    let d = {
      data: data,
    };
    return this.http.post(`${this.uri}/kreirajPredmet`, d);
  }
  studentPredmet(data) {
    let d = {
      data: data,
    };
    return this.http.post(`${this.uri}/studentPredmet`, d);
  }

  azurirajStudenta(data, oldUsername) {
    let d = {
      data: data,
      oldUsername: oldUsername,
    };
    return this.http.post(`${this.uri}/azurirajStudenta`, d);
  }

  azurirajProfesora(data, oldUsername) {
    let d = {
      data: data,
      oldUsername: oldUsername,
    };
    return this.http.post(`${this.uri}/azurirajProfesora`, d);
  }

  insertFromCsv(data: any[]) {
    let d = {
      data: data,
    };
    return this.http.post(`${this.uri}/insertFromCsv`, d);
  }

  uploadImage(formData: FormData) {
    var id;
    id = formData.get('id');
    console.log('Upload');
    console.log(id);
    const headers = { akronim: id };

    return this.http.post<any>(`${this.uri}/uploadImage`, formData, {
      headers: headers,
    });
  }
}
