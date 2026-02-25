function checkAuthStatus(req, res, next) {
    res.locals.isAuth = false;
    res.locals.uid = null;

    const uid = req.session.uid;
    if (!uid) {
        return next();
    }

    res.locals.uid = uid;
    res.locals.isAuth = true;
    
    next();
}
module.exports = checkAuthStatus;