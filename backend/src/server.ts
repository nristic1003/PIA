
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import user from './model/user';
import notification from './model/notification';
import courses from './model/courses';


const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/pia');

const conn = mongoose.connection;

conn.once('open', ()=>{
    console.log("Uspesna konekcija");
})

const router = express.Router();

router.route('/login').post((req,res)=>{
    let username = req.body.username;
    let password = req.body.password;

    user.findOne({'username':username, 'password':password}, (err, user)=>{
        if(err) console.log(err);
        else res.json(user);
    })
})

router.route('/notification').get((req,res)=>{
    notification.find({}, (err,notification)=>{
        if(err) console.log(err);
        else res.json(notification);
     }
    );
  })

  router.route('/getZaposleni').get((req,res)=>{
    user.find({type : 'z'}, (err,user)=>{
        if(err) console.log(err);
        else res.json(user);
     }
    );
  })

router.route('/getZaposleniByUsername').post((req, res)=>{
    let username = req.body.username;
    user.findOne({username : username}, (err, user)=>{
        if(err) console.log(err);
        else res.json(user);
    })
})

router.route('/getPredmeti').post((req, res)=>{
    let katedra = req.body.katedra;
    const userRegex = new RegExp(katedra, 'i')
    courses.find({katedra: userRegex}, (err, courses)=>{
        if(err) console.log(err);
        else res.json(courses);
    })
})

router.route('/getPredmetByAkronim').post((req, res)=>{
    let akronim = req.body.akronim;
    const userRegex = new RegExp(akronim, 'i');
    courses.findOne({akronim: userRegex}, (err, courses)=>{
        if(err) console.log(err);
        else res.json(courses);
    })
})





app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));