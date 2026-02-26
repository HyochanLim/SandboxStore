function checkAuthStatus(req, res, next) {
    res.locals.isAuth = false;
    res.locals.uid = null;
    res.locals.isAdmin = false;

    const uid = req.session.uid;
    if (!uid) {
        return next();
    }

    res.locals.uid = uid;
    res.locals.isAuth = true;
    res.locals.isAdmin = req.session.isAdmin === true;
    
    next();
}
module.exports = checkAuthStatus;