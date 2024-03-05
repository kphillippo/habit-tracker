require("dotenv").config();
const express = require('express');
const app = express();
const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const cors = require("cors");
const mongoose = require('mongoose');

//schema
const UserModel = require('./models/User.js');
const HabitModel = require('./models/Habit.js')

//variabes for routing
const serverLink = "mongodb+srv://"+process.env.DBUSER+":"+process.env.PASSWORD+"@"+config.database.host+"/"+config.database.db;
//const mongoDB = "mongodb+srv://"+process.env.USERNAME+":"+process.env.PASSWORD+"@"+config.database.host+":"+config.database.port+"/"+config.database.db;
const PORT = process.env.PORT || 8081;
const userRoutes = require('./routes/UserRoutes.js');
const habitRoutes = require('./routes/HabitRoutes.js');

//variables for image
const bodyParser = require('body-parser');
const fs = require('fs');
var path = require('path');
app.set("view engine", "ejs");
require('dotenv').config();

app.use(express.json());
app.use(cors());

//routes
app.use('/api/user', userRoutes)
app.use('/api/habit', habitRoutes)

mongoose.connect(serverLink);

//Upload Image code starts here
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });
 
//get request for image
app.get('/', (req, res) => {
    UserModel.find({})
    .then((data, err)=>{
        if(err){
            console.log(err);
        }
        res.render('imagepage',{items: data})
    })
});
 
//post request for image
app.post('/', upload.single('image'), (req, res, next) => {
 
    var obj = {
        Username: req.body.Username,
        ProfilePicture: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgSchema.create(obj)
    .then ((err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});
 

//listening function
app.listen(PORT,function(){
    console.log(`Sever is listening at port ${PORT}`);
});

