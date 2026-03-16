function handleErrors(error, req, res, next) {
  console.log(error);

  if (error === 404) {
    return res.status(404).render("shared/404", {
      isAuth: res.locals.isAuth ?? false,
      isAdmin: res.locals.isAdmin ?? false,
      uid: res.locals.uid ?? null,
      csrfToken: res.locals.csrfToken ?? "",
    });
  }

  res.status(500).render("shared/500", {
    isAuth: res.locals.isAuth ?? false,
    isAdmin: res.locals.isAdmin ?? false,
    uid: res.locals.uid ?? null,
    csrfToken: res.locals.csrfToken ?? "",
  });
}

module.exports = handleErrors;