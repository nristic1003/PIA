import { Predavanja } from "./predavanja.model";

export class Materials{
    akronim:string;
    matPred: Array<Predavanja>;
    matVezbe: Array<Object>;
    ispitnaPitanja: Array<Object>;
    matLaboratorija: Array<Object>;
    matProjekat: Array<Object>;
}