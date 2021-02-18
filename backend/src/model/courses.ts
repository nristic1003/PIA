import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Courses = new Schema({
    naziv:{
        type:String
    },
    semestar:{
        type:Number
    },
    katedra:{
        type: String
    },
    nastavnik:{
        type: String
    },
    
    akronim:{
        type: String
    },
    tip:{
        type: String
    },
    fondPredavanja:{
        type: Number
    },
    fondVezbe:{
        type: Number
    },
    ESPB:{
        type: Number
    },
    terPred:{
        type: String
    },
    terVezbe:{
        type: String
    },
    lab:{
        type: String
    },
    nacinPol:{
        type: String
    },
    propozicije:{
        type: String
    },
    obavestenja:{
        type:Array
    },
    nastIme:{
        type:String
    },
    cilj:{
        type:String
    },
    ispitVidljiv:{
        type:Boolean
    },
    labVidljiv:{
        type:Boolean
    },
    projekatVidljiv:{
        type:Boolean
    },
    labPodaci:{
        type:Array
    },
    projekat:{
        type:Array
    }
    
});

export default mongoose.model("Courses", Courses, 'courses');
