
    export const logoutUser = (req, res) => {
    req.session.destroy();
    res.redirect("/login");
    };