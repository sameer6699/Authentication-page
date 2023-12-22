//Importing Libraries for the app
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const {v4: uuidv4} = require('uuid');

const app = express();
const credentials = {
    email: "a@gmail.com",
    password: "1"
};

//Parsing the URL
app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret:uuidv4(),
    resave: false,
    saveUninitialized: true
}));
//Routes for the app
app.get('/home', (req, res) => {
    res.render("index.ejs");
});

app.get('/login', (req, res) => {
    res.render("login.ejs");
});
app.post('/login', (req, res) => {
    if(req.body.email == credentials.email && req.body.password == credentials.password)
    {
        req.session.user = req.body.email;
        res.redirect('/home');
        //res.render("Login Successfull");
    }else{
        res.end("Invalid Username or Password");
    }
});

app.get('/register', (req, res) => {
    res.render("register.ejs");
});
// End Routs

app.listen(3000, () => {});