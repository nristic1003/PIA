import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Courses } from '../model/courses.model';
import { Zaposleni } from '../model/zaposleni.model';
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

sendDataToServer(formData :FormData)
{
 return  this.http.post<any>(`${this.uri}/upload`, formData);
}

uploadMultiple(formData :FormData)
{
 return  this.http.post<any>(`${this.uri}/uploadMultiple`, formData);
}

dodajObavestenja(d:any, niz:any)
{
  let data = {
    "data" : d,
    "niz" : niz
  }
  return this.http.post(`${this.uri}/dodajObavestenja` , data );
}


deleteVest(id:number)
{
    let data = {
      "id" : id
    }
    return this.http.post(`${this.uri}/deleteVest/` , data);
}

dodajLabVezbu(akronim : string , d:any)
{
    let data = {
      "akronim" : akronim,
      "data" : d 
    }

    return this.http.post(`${this.uri}/dodajLabVezbu/` , data);

}

dodajProjekatVezbu(akronim : string , d:any)
{
  let data = {
    "akronim" : akronim,
    "data" : d 
  }

  return this.http.post(`${this.uri}/dodajProjekatVezbu/` , data);
}

getMaterials(data:String)
{
  return this.http.get(`${this.uri}/getMaterials/${data}` );
}

getPlan(data:String)
{
  return this.http.get(`${this.uri}/getPlan/${data}` );
}

updatePredmet(d:Courses)
{
  console.log(d);
  let data = {
    'data' : d
  }
  return this.http.post(`${this.uri}/updatePredmet`  , data);
}

updateInfoNastavnik(d:Zaposleni)
{
  console.log(d);
  let data = {
    'data' : d
  }
  return this.http.post(`${this.uri}/updateInfoNastavnik`  , data);
}

deleteMaterial(data: any)
{
  return this.http.post(`${this.uri}/deleteMaterial` , data);
}


}
