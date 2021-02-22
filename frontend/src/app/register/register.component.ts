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


    var reg = new RegExp('^[1-2][0-9]{3}[\/][0-9]{4}$')

    let flag = reg.test(this.indexNumber)
    if(!flag){
      this.message = "Index nije u ispravnom obliku";
      return
    }
    console.log(this.lastname)
    if(this.name== undefined || this.lastname==undefined || this.password==undefined || this.type==undefined) {
      this.message = "Svi podaci moraju biti uneti";
      return
    }

    

    let username = this.lastname.charAt(0) + this.name.charAt(0) + 
    this.indexNumber.charAt(2)+this.indexNumber.charAt(3)+ +this.indexNumber.charAt(5)+ +this.indexNumber.charAt(6)+ +this.indexNumber.charAt(7)+
    +this.indexNumber.charAt(8)
    + this.type + "@student.etf.rs"

    username = username.toLowerCase()
    console.log(username)


    let data = {
      "username" : username,
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


name:string;
lastname:string;
type:string;
password:string;
indexNumber:string;
message : string;

}
