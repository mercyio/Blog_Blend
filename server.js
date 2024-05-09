require ('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
// const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');


const connectDb = require('./app/config/database')

const app = express()
const PORT = process.env.PORT || 5000;

// connect to db
connectDb();

// i used it so that i can get the searchTerm
app.use(express.urlencoded ( { extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  }));

// static folder
app.use(express.static('public')); 

// template engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

  
// Routes 
app.use('/', require('./app/routes/main'))
app.use('/', require('./app/routes/admin'))


app.listen(PORT, ()=> {
    console.log(`app listening on port ${PORT}`);
}) 