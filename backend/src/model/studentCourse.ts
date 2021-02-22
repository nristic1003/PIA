import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let StudentCourse = new Schema({
    username:{
        type:String
    },
    akronim:{
        type:String
    },
  
});

export default mongoose.model("StudentCourse", StudentCourse, 'studentCourse');
