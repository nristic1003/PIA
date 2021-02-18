import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let StudentsList = new Schema({
    naziv:{
        type:String
    },
    otvoren:{
        type:Boolean
    },
    potrebanFajl:{
        type:Boolean
    },
    termina:{
        type:Date
    },
    vremeKraja:{
        type:Date
    },
    akronim:{
        type:String
    },
    mesto:{
        type:String
    },
    studenti:{
        type:Array
    },
    limit:{
        type:Number
    },
    trenutniBroj:{
        type:Number
    }
});

export default mongoose.model("StudentsList", StudentsList, 'studentsList');
