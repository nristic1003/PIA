import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { LoginServiceService } from '../Services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:LoginServiceService, private router:Router) { }

  ngOnInit(): void {
   
  }

 

  username: String;
  password: String;

  message:String
  login()
  {
    this.service.login(this.username, this.password).subscribe((student:User)=>{
      if(student)
      {
        if(student.status=="neaktivan")
        { 
          localStorage.setItem('username' ,student.username)
          this.router.navigate(['/promena-loznike']);
        }else
        {
          console.log(student.username);
          localStorage.setItem('user', student.username);
          if(student.type=='d') this.router.navigate(['/student']);
          else  if(student.type=='z') this.router.navigate(['/profesor']);
        }
       
      }
      else
      {
        
       this.message = "Wrong username or password";
       console.log(this.message);
      }
      
    })
  }

}
