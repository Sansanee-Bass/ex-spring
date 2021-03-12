
const userModel = require("../models/user");

module.exports = async (req, res, next) => {
    req.auth = { loggedIn: false };

    if (req.body.user !== undefined && req.body.pass !== undefined) {
        req.auth = await userModel.authWithPass(req.body.user, req.body.pass);
        if (req.auth.loggedIn) {
            console.log(req.auth);
            res.cookie("user", req.auth.username, { maxAge: 1000 * 60 * 60 * 24 });
            res.cookie("h", req.auth.cookieHash, { maxAge: 1000 * 60 * 60 * 24 });
        }
    } else if (req.query.logout !== undefined) {
        res.clearCookie("user");
        res.clearCookie("h");
    } else if (req.cookies.user !== undefined && req.cookies.h !== undefined) {
        console.log(req.auth);
        req.auth = await userModel.authWithCookie(req.cookies.user, req.cookies.h);
    }



    next();
};