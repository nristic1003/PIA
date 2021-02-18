import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { LoginServiceService } from '../Services/login-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service:LoginServiceService, private router:Router) { }

  ngOnInit(): void {
  }

  register()
  {

    let data = {
      "username" : this.username,
      "name" : this.name,
      "lastname" : this.lastname,
      "password" : this.password,
      "indexNumber" : this.indexNumber,
      "status" : "neaktivan",
      "type" : this.type
    }
    console.log(data);
    this.service.register(data).subscribe((a:Response)=>{
      console.log(a)
      this.router.navigate(['/login']);
    })
   
    
  }


username:string;
name:string;
lastname:string;
type:string;
password:string;
indexNumber:string;

}
