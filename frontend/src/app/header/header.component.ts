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

 checkLogged()
 {
     return this.service.isLoggedIn();
 }

 getUsername()
 {
   return localStorage.getItem('user');
 }

 logout()
 {

    this.service.logout()
    this.router.navigate(['/pocetna']);
   
    
 }
}
