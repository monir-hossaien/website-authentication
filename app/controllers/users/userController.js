import User from "../../../app/models/userModel.js";
import bcrypt from "bcrypt";
import passport from "passport";
const saltRounds = 10;

export const userProfile =(req, res)=>{
    if(req.isAuthenticated()){
        res.status(200).render("profile", {
            title: "profile"
        });
    }
    else{
        res.redirect("/login")
    }
}

//get method
export const userRegister = (req, res)=>{
    res.status(200).render("register", {
        title: "register"
    });
}

// post method
export const register = async(req, res)=>{
    try {
        const {username, email, password} = req.body;

        bcrypt.hash(password, saltRounds,async (err, hash)=> {
            const newUser ={
                username: username,
                email: email,
                password: hash
            }
            await User.create(newUser)
            res.status(201).redirect("/login")
        });
    }
    catch (e) {
        console.log(e.message);
    }


}

// login get method
export const userLogin = (req, res)=>{
    res.status(200).render("login", {
        title: "login"
    });
}

// Login POST route
export const login = (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/profile'
    })(req, res, next);// Immediately invoke with (req, res, next)

};


export const userLogout = (req, res)=>{
    try {
        req.logout((err)=>{
            if (err){
                return next(err)
            }else{
                res.status(200).redirect("/")
            }
        })
    }catch (e) {
        res.status(500).json(e.message)

    }
}
