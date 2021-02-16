
import express from 'express';
import mongoose, { Mongoose } from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import user from './model/user';
import notification from './model/notification';
import courses from './model/courses';
import materials from './model/materials';
import plan from './model/plan';



const app = express();

const multer = require('multer');

const conn = mongoose.connection;
const fs = require('fs');

const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

mongoose.connect('mongodb://localhost:27017/pia');


conn.once('open', ()=>{
    console.log("Uspesna konekcija");
})

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: (arg0: any, arg1: string) => void) {
        cb(null, './uploads/')
    },
    
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname)
    }
});

const upload = multer({storage:storage})

const router = express.Router();

router.route("/upload").post(upload.single("file"), function(req, res) {
    //update
    let data = {
        naziv : req.file.filename,
        nastavnik : req.body.nastavnik,
        datum : Date.now(),
        size : req.file.size / 1000,
        redosled : 0,
        type : path.extname(req.file.filename)
    }

    let arr = req.body.arr;

    console.log(arr)

    materials.findOne({akronim : req.body.id}, (err, mat) =>{
        if(err) console.log(err)
        if(mat)
        {
            //update
            materials.collection.updateOne({akronim: req.body.id} , {$push : {[arr]: data} })
        }else{
            
            materials.insertMany({akronim : req.body.id , [arr] : new mongoose.Types.Array(data)})  
        }
    })

  });

  router.route("/deleteMaterial").post((req, res)=>{
      let name = req.body.name; //filename
      let v = req.body.value; //Array Name in collection
      let akr = req.body.akronim; //Akronim za selekciju
      materials.collection.updateOne({akronim : akr}, {$pull : {[v]: {'naziv' : name}}})
  })


  router.route("/uploads/:id").get((req, res)=>{
    const testFolder = './uploads';
    const param = req.params.id;
    const path = './uploads/' + param;
    if (fs.existsSync(path)) {
        res.contentType("application/pdf");
        fs.createReadStream(path).pipe(res)
    } else {
        res.status(500)
        console.log('File not found')
        res.send('File not found')
    }
  })

  router.route("/download/:id").get((req, res)=>{
    const testFolder = './uploads';
    const param = req.params.id;
    const path = './uploads/' + param;
    if (fs.existsSync(path)) {
        res.contentType("application/pdf");
        res.download(path);
    } else {
        res.status(500)
        console.log('File not found')
        res.send('File not found')
    }
  })


  router.route('/getPlan/:id').get((req,res)=>{
    const param = req.params.id;
    plan.find( {'nastavnici.predavac': {​​​​$in : [param]}​​​​}, ((err,pl)=>{
        if(err) console.log(err);
        else res.json(pl);
    })​)
  })

  

router.route('/getMaterials/:id').get((req, res) =>{
    const param = req.params.id;
    materials.findOne({akronim : param} , ((err, mar)=>{
        if(err) console.log(err);
        else res.json(mar);
    }))

  
})


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

    router.route('/updatePredmet').post((req, res)=>{  
        let data = req.body.data;
        console.log(data)
        courses.updateOne({akronim : data.akronim}, data, (err, courses)=>{
            if(err) console.log(err);
            else res.status(200);
        })
})

router.route('/updateInfoNastavnik').post((req, res)=>{  
    let data = req.body.data;
    user.updateOne({username : data.username}, data, (err, courses)=>{
        if(err) console.log(err);
        else res.status(200);
    })
})





app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));