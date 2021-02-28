import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-azuriraj-studenta',
  templateUrl: './azuriraj-studenta.component.html',
  styleUrls: ['./azuriraj-studenta.component.css'],
})
export class AzurirajStudentaComponent implements OnInit {
  constructor(private service: AdminService) {}

  ngOnInit(): void {
    this.s = JSON.parse(localStorage.getItem('student'));
  }

  azuriraj() {
    let username =
      this.s.lastname.charAt(0) +
      this.s.name.charAt(0) +
      this.s.indexNumber.charAt(2) +
      this.s.indexNumber.charAt(3) +
      +this.s.indexNumber.charAt(5) +
      +this.s.indexNumber.charAt(6) +
      +this.s.indexNumber.charAt(7) +
      +this.s.indexNumber.charAt(8) +
      this.s.type +
      '@student.etf.rs';

    let oldUsername = this.s.username;
    username = username.toLowerCase();
    console.log(username);
    this.s.username = username;
    this.service.azurirajStudenta(this.s, oldUsername).subscribe((app: any) => {});
  }

  s: User;
}
