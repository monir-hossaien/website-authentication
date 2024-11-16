import User from "../../app/models/userModel.js";
import passport from "passport";
import bcrypt from "bcrypt";
import LocalStrategy from 'passport-local';

passport.use(
    new LocalStrategy( async (username, password, done) => {

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return done(null, false, {message: "unauthorized user"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
    }
    catch (e) {
        return done(e)
    }
}));


// create session id
passport.serializeUser((user, done)=>{
    done(null, user.id);
});

// find session info using session id
passport.deserializeUser(async (id, done)=>{
    try {
        const user = await User.findById(id);
        done(null, user)
    }
    catch (e) {
        done(e, false);
    }
})