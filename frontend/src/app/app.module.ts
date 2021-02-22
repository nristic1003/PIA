import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ZaposleniComponent } from './zaposleni/zaposleni.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';
import { OsnovneComponent } from './osnovne/osnovne.component';
import { MasterStudijeComponent } from './master-studije/master-studije.component';
import { ProjektiComponent } from './projekti/projekti.component';
import { NaukaComponent } from './nauka/nauka.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentComponent } from './student/student.component';
import { PrikazZaposlenogComponent } from './prikaz-zaposlenog/prikaz-zaposlenog.component';
import { PrikazPredmetaComponent } from './prikaz-predmeta/prikaz-predmeta.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { ProfesorComponent } from './profesor/profesor.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { AdminComponent } from './admin/admin.component';
import { IstrazivanjaComponent } from './istrazivanja/istrazivanja.component';
import { ProjektiKatedraComponent } from './projekti-katedra/projekti-katedra.component';
import { AzuriranjeVestiComponent } from './azuriranje-vesti/azuriranje-vesti.component';



@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    ZaposleniComponent,
    HeaderComponent,
    FooterComponent,
    ObavestenjaComponent,
    OsnovneComponent,
    MasterStudijeComponent,
    ProjektiComponent,
    NaukaComponent,
    KontaktComponent,
    LoginComponent,
    RegisterComponent,
    StudentComponent,
    PrikazZaposlenogComponent,
    PrikazPredmetaComponent,
    ProfesorComponent,
    PromenaLozinkeComponent,
    AdminComponent,
    IstrazivanjaComponent,
    ProjektiKatedraComponent,
    AzuriranjeVestiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
