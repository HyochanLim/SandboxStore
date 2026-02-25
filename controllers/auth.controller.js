const User = require("../models/user.model");
const authUtil = require("../util/authentication");

function getSignup(req, res) {
  res.render("auth/signup", {
    pageTitle: "Signup",
  });
}

async function signup(req, res) {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body["full-name"],
    req.body.street,
    req.body.postal,
    req.body.city,
  );

try {
  await user.signup();
} catch (error) {
  next(error);
  return;
}

  await user.signup();
  res.redirect("/login");
}

function getLogin(req, res) {
  res.render("auth/login", {
    pageTitle: "Login",
  });
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  if (!existingUser) {
    return res.redirect("/login");
  }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password,
  );

  if (!passwordIsCorrect) {
    return res.redirect("/login");
  }

  authUtil.createUserSession(req, existingUser, function() {
    res.redirect("/");
  });
}

function logout(req, res) {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout
};
