function protectRoutes(req, res, next) {
    if (!res.locals.isAuth) {
        return res.status(401).render("shared/401", {
            isAuth: res.locals.isAuth ?? false,
            isAdmin: res.locals.isAdmin ?? false,
            uid: res.locals.uid ?? null,
            csrfToken: res.locals.csrfToken ?? "",
        });
    }

    if (req.path.startsWith("/admin") && !res.locals.isAdmin) {
        return res.status(403).render("shared/403", {
            isAuth: res.locals.isAuth ?? false,
            isAdmin: res.locals.isAdmin ?? false,
            uid: res.locals.uid ?? null,
            csrfToken: res.locals.csrfToken ?? "",
        });
    }

    next();
}

module.exports = protectRoutes;