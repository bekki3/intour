const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require ("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const fs = require('fs');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(session({
    secret: 'some kind of secret.',
    resave: false,
    saveUninitialized: false
  }))
app.use(passport.initialize());
app.use(passport.session());
//Connect to DB
mongoose.connect(`${process.env.MONGO_URL}`,
{ useNewUrlParser: true, useUnifiedTopology: true }, err => {
		console.log('connected')
	});

//Storage of Images
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});
var upload = multer({ storage: storage });

//Schemas
var TourModel = require('./model');
const bodyTitleSchema = new mongoose.Schema({
    bodyTitle: {
        type:Object 
    }
})

//Models
const BodyTitle = mongoose.model("bodyTitle", bodyTitleSchema);

//Server
app.get('/', (req, res)=>{
    
    BodyTitle.find((err, data)=>{
        if(err){
            console.log("Error while getting body title");
        }
        else{
            TourModel.find({}, (err, tours) =>{
                if(err){
                    console.log(err);
                    res.status(500).send('Error while getting tour details', err);
                }
                else{
                    res.render('index', {data: data, tours: tours});
                }
            })
        }
    })
})
app.get('/login', (req, res)=>{
    res.render("login")
})
app.post('/login', (req, res)=>{
    if(req.body.username==="admin")
    {
        if(req.body.password==process.env.PASSWORD)
        {
            BodyTitle.find((err, data)=>{
                //console.log(data);
                if(err){
                    console.log("Error while finding");
                }
                if(data.length==0){
                    console.log("No data in DB");
                    TourModel.find({}, (err, tours) =>{
                        if(err){
                            console.log(err);
                            res.status(500).send('Error occured', err);
                        }
                        else{
                            res.render('admin', {data: [
                                {
                                  bodyTitle: {
                                    imgSrc1: 'image source 1',
                                    imgSrc2: 'image source 2',
                                    imgSrc3: 'image source 3',
                                    header1: 'header 1',
                                    header2: 'header 2',
                                    header3: 'header 3',
                                    paragraph1: 'paragraph1',
                                    paragraph2: 'paragraph2',
                                    paragraph3: 'paragraph3',
                                    socialMediaLink1: '#',
                                    socialMediaLink2: '#',
                                    socialMediaLink3: '#',
                                  }
                                }
                              ], tours: tours});
                        }
                    })
                }else{
                    TourModel.find({}, (err, tours) =>{
                        if(err){
                            console.log(err);
                            res.status(500).send('Error occured', err);
                        }
                        else{
                            res.render('admin', {data: data, tours: tours});
                        }
                    })
                }
            })
        }
        else{
            res.send("Wrong Password");
        }
    }
    else{
        res.render("Wrong Username");
    }
    
})
app.post('/admin', (req, res)=>{
    BodyTitle.deleteMany({}, ()=>{console.log("Updated DB")})
    const bodyTitle = new BodyTitle({
         bodyTitle: req.body
    });
    bodyTitle.save((err)=>{
        if (err) {
            console.log(err);
        }else{
            res.send("<h1>Updated Successfully</h1> <h3><a href='/'>Main Page</a></h3><br><h3><a href='/login'>Login Page</a></h3>");
        }
    });
})

app.post('/addtour', upload.single('image'), (req, res, next) => {

	var obj = {
        title: req.body.tourTitle,
        location: req.body.tourLocation,
        days: req.body.tourDays,
        numOfPeople: req.body.numOfPeople,
        price: req.body.tourPrice,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		}
	}
	TourModel.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			item.save();
			res.redirect('/');
		}
	});
});

app.post('/delete', (req, res)=>{
    TourModel.findByIdAndDelete(req.body.btn, (err, docs)=> {
        if (err){
            console.log(err);
        }
        else{
            console.log(`Deleted the item with id${req.body.btn}`);
            
            res.redirect('/');
        }
    });
})

var port = process.env.PORT;
if(port == null || port == "")
{
	port=3000;
}
app.listen(port, ()=>{
    console.log("Listening on "+ port)
});