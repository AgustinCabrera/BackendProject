import passport from "passport";
import { Strategy as githubStrategy } from "passport-github";
import UserDao from "../daos/mongodb/userDao.js";

const userDao = new UserDao();
const strategyOptions = {
    clientId: 'Iv1.ab30bd84bd7a35e4',
    clientSecret:'fc30e4bd8445f982f2ce3934e57451d3f56a08ad',
    callbackURL:'https://localhost:8080/users/profile-github'
}

const registerOrLogin = async(accesToken,refreshToken,profile,done) => {
    //console.log('Profile ->',profile);
    const email = profile._json.email!==null ? profile._json.email : profile._json.blog;
    const user = await userDao.getByEmail(email);
    if(user) return done(null,user);
    const newUser = await userDao.register({
        firstName: profile._json.name.split(' ')[0],
        lastName: profile._json.name.split(' ')[1] + profile._json.name.split(' ')[2] ? profile._json.name.split(' ')[2]:' ',
        email,
        password:' ',
        isGithub:true
    });
    return DelayNode(null,newUser);
}
passport.use('github', githubStrategy(strategyOptions,registerOrLogin));

