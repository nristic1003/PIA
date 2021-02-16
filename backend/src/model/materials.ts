import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Materials = new Schema({
    akronim:{
        type:String
    },
    matPred:{
        type:Array
    },
    matVezbe:{
        type:Array
    },
    ispitnaPitanja:{
        type:Array
    },
    matLaboratorija:{
        type:Array
    },
    matProjekat:{
        type:Array
    }
});

export default mongoose.model("Materials", Materials, 'materials');
