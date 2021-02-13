import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    indexNumber:{
        type: String
    },
    type:{
        type: String
    },
    name:{
        type:String
    },
    lastname:{
        type:String
    },
    status:{
        type:String
    },
    address:{
        type:String
    },
    contact:{
        type:String
    },
    website:{
        type:String
    },
    about:{
        type:String
    },
    degree:{
        type:String
    },
    room:{
        type:Number
    },
    slika:{
        type:String
    },
    courses:{
        type:Array
    },
 
});

export default mongoose.model("User", User, 'user');
