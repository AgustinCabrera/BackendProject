import { Router } from "express";
import { loginUser, registerUser, logoutUser , githubResponse} from "../controllers/userController";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";



const router = Router();

router.get('/logout', logoutUser);

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/private',isAuth,(req,res) => res.send('route private'));

router.get('/register-github', passport.authenticate('github',{scope:['user:email']}));

router.get('/profile-github', passport.authenticate('github',{scope:['user:email']}),githubResponse);



export default router;