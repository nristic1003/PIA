
import express from 'express';
import mongoose, { Mongoose } from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import user from './model/user';
import notification from './model/notification';
import courses from './model/courses';
import materials from './model/materials';
import plan from './model/plan';
import e from 'express';
import studentsList from './model/studentsList';



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
        const data = req.header("akronim");
        console.log(data)
        const directory = `./uploads/${data}`
        fs.exists(directory, (exist: any) =>{
            if(!exist){
                return fs.mkdir(directory , (error: any) =>cb(error , directory))
            }
            cb(null, directory)
        })
       
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


  router.route("/createList").post((req, res)=>{
  
    let data = req.body.data
    console.log(data)
    
    studentsList.collection.insertOne(data);
        
    })


  router.route("/register").post((req, res)=>{
  
    let data = req.body.data
    
    user.find({username : data.username}, (err, u)=>{
        if(err) console.log(err);

        console.log(u)
        if(u.length!=0)
        {
            console.log("nasao usera")
            return res.status(400);

        } 
        else
        {
            user.collection.insertOne(data)
            return res.json(200);
        }
        
    })
    
})
  router.route("/changePass").post((req, res)=>{
  
    user.collection.updateOne({username :req.body.username}, {$set: {password : req.body.pass , status : "aktivan"}}, (err, u)=>{
        if(err) res.status(400).json({"status" : "err"})
        else res.status(200).json({"status" : "OK"})
    })
   
    
})


  router.route("/dodajObavestenja").post((req, res)=>{
    console.log(req.body.data)
    let data = req.body.data
    let niz = req.body.niz;
    console.log(req.body.formData)
    courses.collection.updateMany({akronim : {$in :niz}}, {$push : { obavestenja: data}}) 
})

router.route("/dodajLabVezbu").post((req, res)=>{
  
    let data = req.body.data
    let akr = req.body.akronim;
    console.log(req.body.formData)
    courses.collection.updateOne({akronim : akr}, {$push : { labPodaci: data}}) 
})
router.route("/dodajProjekatVezbu").post((req, res)=>{
  
    let data = req.body.data
    let akr = req.body.akronim;
    console.log(req.body.formData)
    courses.collection.updateOne({akronim : akr}, {$push : { projekat: data}}) 
})
  
router.route("/deleteVest").post((req, res)=>{
    console.log(req.body.id)
    let idOb = req.body.id;
    courses.collection.updateOne({'obavestenja.id' : idOb}, {$pull: {obavestenja : {id : idOb }}})

})


router.route("/uploadMultiple").post(upload.array("files" , 10), function(req, res) {
    //update
    const files = req.files
    console.log(files)
    if (!files) {
        const error = new Error('No File')
        res.status(500);
      }
        res.status(200);

  });

  router.route("/deleteMaterial").post((req, res)=>{
      let name = req.body.name; //filename
      let v = req.body.value; //Array Name in collection
      let akr = req.body.akronim; //Akronim za selekciju
      materials.collection.updateOne({akronim : akr}, {$pull : {[v]: {'naziv' : name}}})
  })


  router.route("/uploads/:folder/:fileName").get((req, res)=>{
    const testFolder = './uploads';
    const folder = req.params.folder;
    const fileName = req.params.fileName;
    console.log(folder)
    const path = './uploads/' + folder + '/' + fileName;
    console.log(path)
    if (fs.existsSync(path)) {
        res.contentType("application/pdf");
        fs.createReadStream(path).pipe(res)
    } else {
        res.status(500)
        console.log('File not found')
        res.send('File not found')
    }
  })

  router.route("/download/:folder/:fileName").get((req, res)=>{
    const testFolder = './uploads';
    const folder = req.params.folder;
    const fileName = req.params.fileName;
    console.log(folder)
    const path = './uploads/' + folder + '/' + fileName;
    console.log(path)
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

  router.route('/dohvatiSpiskove/:id').get((req,res)=>{
    const param = req.params.id;
    console.log(param)
    studentsList.find( {akronim : param​​​​}, ((err,pl)=>{
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