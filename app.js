import {config} from "dotenv";
config();
import "./app/config/passport.js";
import express from "express";
import route from "./app/routes/userRoute.js";
import MongoStore from 'connect-mongo'

import passport from "passport";
import session from "express-session"


const app = express();

// global middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//passport auth setup
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        collectionName: "sessions"
    })
}))

app.use(passport.initialize());
app.use(passport.session());

// Set up a public directory for static files like CSS
app.use(express.static('public'));

// Set EJS as the template engine
app.set('view engine', 'ejs');

// route setup
app.use(route);

//home route
app.get('/', (req, res)=>{
    res.render('index', {
        title: "Home"
    })

})

// error handling unaccepted route
app.use((req, res, next)=>{
    res.status(404).render("error")
    next()
})

// error handling server error
app.use((err, req, res, next)=>{
    console.log(err)
    next()
})

export default app;