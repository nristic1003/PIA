import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient) { }


  uri ='http://localhost:4000'

  loggedIn:boolean= false;
  login(username, password)
  {
    const data = {
      username: username,
      password:password
    };
    return this.http.post(`${this.uri}/login`, data);
  }

  logout()
  {
    localStorage.removeItem('user');
  }

  userName:string;
  isLoggedIn()
  {
    this.userName = localStorage.getItem('user');
    if(this.userName) return true;
    return false;
  }
}
