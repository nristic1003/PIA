import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../Services/login-service.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private service:LoginServiceService, private router: Router) { }

  ngOnInit(): void {
  }


  changePass()
  {

    if(this.confirmedPass!=this.newPass)
    {
      this.message="Nova lozinka i ponovljena lozinka nisu iste!"
    }else
    {
      this.service.changePass(this.newPass).subscribe((a:any)=>{
        
        if(a.status == "OK")
        {
          this.router.navigate(['/login']);
        }else
        {
          console.log(a.status)
        }
            
      })
    }

  }

  currentPass:string;
  newPass:string;
  confirmedPass:string;
  message:string;

}
