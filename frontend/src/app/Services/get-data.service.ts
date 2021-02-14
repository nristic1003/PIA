import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http:HttpClient) { }

  uri ='http://localhost:4000';

  getObavestenja()
  {
     return this.http.get(`${this.uri}/notification`); 
  }
  getZaposleni()
  {
     return this.http.get(`${this.uri}/getZaposleni`); 
  }

getZaposleniByUsername(username : String)
{
  const data = {
    username: username
  };
  return this.http.post(`${this.uri}/getZaposleniByUsername`, data);
}


getPredmeti(katedra: String)
{
  const data = {
    katedra: katedra
  };
  return this.http.post(`${this.uri}/getPredmeti`, data);
}


getPredmetByAkronim(akronim: String)
{
  const data = {
    akronim: akronim
  };
  return this.http.post(`${this.uri}/getPredmetByAkronim`, data);
}

}
