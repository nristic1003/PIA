import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Notification = new Schema({
    naziv:{
        type:String
    },
    tekst:{
        type:String
    },
    datum:{
        type: Date
    },
    type:{
        type: String
    }
});

export default mongoose.model("Notification", Notification, 'notifications');
