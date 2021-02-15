import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KontaktComponent } from './kontakt/kontakt.component';
import { LoginComponent } from './login/login.component';
import { MasterStudijeComponent } from './master-studije/master-studije.component';
import { NaukaComponent } from './nauka/nauka.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';
import { OsnovneComponent } from './osnovne/osnovne.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrikazPredmetaComponent } from './prikaz-predmeta/prikaz-predmeta.component';
import { PrikazZaposlenogComponent } from './prikaz-zaposlenog/prikaz-zaposlenog.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { ProjektiComponent } from './projekti/projekti.component';
import { RegisterComponent } from './register/register.component';
import { StudentComponent } from './student/student.component';
import { ZaposleniComponent } from './zaposleni/zaposleni.component';

const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "pocetna"},
  {path: "pocetna", component:PocetnaComponent},
  {path:"zaposleni" , component:ZaposleniComponent},
  {path:"projekti" , component:ProjektiComponent},
  {path:"osnovne/:id" , component:OsnovneComponent},
  {path:"obavestenja" , component:ObavestenjaComponent},
  {path:"nauka" , component:NaukaComponent},
  {path:"master-studije" , component:MasterStudijeComponent},
  {path:"kontakt" , component:KontaktComponent},
  {path:"login" , component:LoginComponent},
  {path:"register" , component:RegisterComponent},
  {path:"student" , component:StudentComponent},
  {path:"prikaz-zaposlenog/:id" , component:PrikazZaposlenogComponent},
  {path:"prikaz-predmeta/:id" , component:PrikazPredmetaComponent},
  {path:"profesor" , component:ProfesorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
