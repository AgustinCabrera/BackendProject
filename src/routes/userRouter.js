    import { Router } from "express";
    import passport from "passport";
    import * as controller from "../controllers/userController.js";

    const router = Router();

    router.post(
    "/register",
    passport.authenticate("register", {
        successRedirect: "/login?registerSuccessful=true",
        failureRedirect: "/error-register",
        passReqToCallback: true,
    })
    );

    router.post(
    "/login",
    passport.authenticate("login", {
        successRedirect: "/products?loginSuccessful=true",
        failureRedirect: "/error-login",
        passReqToCallback: true,
    })
    );

    router.get(
    "/register-github",
    passport.authenticate("github", {
        scope: ["user:email"],
    })
    );

    router.get(
    "/github",
    passport.authenticate("github", {
        scope: ["user:email"],
        failureRedirect: "/error-login",
        successRedirect: "/products?loginSuccessful=true",
    })
    );

    router.get("/logout", controller.logoutUser);

    export default router;