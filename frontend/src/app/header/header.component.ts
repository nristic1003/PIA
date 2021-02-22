import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../Services/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service : LoginServiceService, private router:Router) { }

  ngOnInit(): void {

  }
 

 userLoggedIn:boolean = false;


 checkStudent()
 {
  let data = JSON.parse(localStorage.getItem('user'));
  if(data==null || (data.type!='d' && data!='p' && data!='m')) return false;
  return true
 }
 checkAdmin()
 {
  let data = JSON.parse(localStorage.getItem('user'));
  if(data==null || data.type!='a') return false;
  return true
 }

 checkLogged()
 {
     return this.service.isLoggedIn();
 }

 checkType()
 {
    let data = JSON.parse(localStorage.getItem('user'));
    if(data==null || data.type!='z') return false;
    return true
 }

 getUsername()
 {
   return  JSON.parse(localStorage.getItem('user')).username;
 }

 logout()
 {

    this.service.logout()
    this.router.navigate(['/pocetna']);
   
    
 }
}
