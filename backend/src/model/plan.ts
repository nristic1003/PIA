import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Plan = new Schema({
    akronim:{
        type:String
    },
    naziv:{
        type:String
    },
    nastavnici:{
        type:Array
    }
});

export default mongoose.model("Plan", Plan, 'plan');
