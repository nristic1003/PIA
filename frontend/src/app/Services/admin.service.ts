import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }


  uri ='http://localhost:4000';

  dodajStudenta(data:any)
  {
    let d = {
      "data" : data
    }
    return this.http.post(`${this.uri}/register`, d)
  }
  dodajProfesora(data:any)
  {
    let d = {
      "data" : data
    }
    return this.http.post(`${this.uri}/register`, d)
  }

  dohvatiStudente()
  {
    return this.http.get(`${this.uri}/getStudenti`)
  }
  dohvatiZaposlene()
  {
    return this.http.get(`${this.uri}/getZaposleni`)
  }
  obrisiStudenta( username : string)
  {
    let data = {
      "username" : username
    }
    return this.http.post(`${this.uri}/removeUser` , data)
  }
  kreirajPlan( data : any)
  {
    let d = {
      "data" : data
    }
    return this.http.post(`${this.uri}/kreirajPlan` , d)
  }

  dodajKurseveProfesoru(data:any)
  { 
    let d = {
      "data" : data
    }
    return this.http.post(`${this.uri}/dodajKurseveProfesoru` , d)
  }

  kreirajPredmet(data : any)
  {
    let d = {
      "data" : data
    }
    return this.http.post(`${this.uri}/kreirajPredmet` , d)
  }


}
