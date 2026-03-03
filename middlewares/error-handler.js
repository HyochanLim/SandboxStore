function handleErrors(error, req, res, next) {
  if (error && error.code === "EBADCSRFTOKEN") {
    const returnPath = req.get("referer") || "/";
    return res.status(403).redirect(returnPath);
  }

  console.log(error);
  res.status(500).render("shared/500", {
    isAuth: res.locals.isAuth ?? false,
    isAdmin: res.locals.isAdmin ?? false,
    uid: res.locals.uid ?? null,
    csrfToken: res.locals.csrfToken ?? "",
  });
}

module.exports = handleErrors;