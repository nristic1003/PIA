import { Obavestenje } from "./obavestenje";

export class Courses{
    naziv:string;
    semestar:number;
    katedra:string;
    nastavnik:Array<Object>;
    akronim:string;
    tip:string;
    fondPredavanja:number;
    fondVezbe:number;
    ESPB:number;
    terPred:string;
    terVezbe:string;
    lab:string;
    nacinPol:string;
    ispitVidljiv:boolean;
    labVidljiv:boolean;
    projekatVidljiv:boolean;
    propozicije:string;
    obavestenja:Array<Obavestenje>;
    nastIme:String;
    labPodaci:Array<Object>;
    projekat:Array<Object>;
    cilj: String;
}