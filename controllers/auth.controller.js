const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const userCredentialIsValid = require("../util/validation");
const sessionFlash = require("../util/session-flash");
const session = require("express-session");

function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      confirmEmail: "",
      password: "",
      fullName: "",
      street: "",
      postal: "",
      city: "",
    };
  }
  res.render("auth/signup", {
    pageTitle: "Signup",
    sessionData: sessionData,
  });
}

async function signup(req, res, next) {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body["full-name"],
    req.body.street,
    req.body.postal,
    req.body.city,
  );

  const enteredData = {
    email: user.email,
    confirmEmail: req.body["confirm-email"],
    password: user.password,
    fullName: user.fullname,
    street: user.address.street,
    postal: user.address.postal,
    city: user.address.city,
  };
  if (
    !userCredentialIsValid.userDetailsAreValid(
      user.email,
      user.password,
      user.fullname,
      user.address.street,
      user.address.postal,
      user.address.city,
    ) ||
    !userCredentialIsValid.emailIsComfirmed(
      user.email,
      req.body["confirm-email"],
    )
  ) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          "Please check your input. Password must be at least 6 characters long and email must be valid.",
        ...enteredData,
      },
      function () {
        res.redirect("/signup");
        return;
      },
    );
    return;
  }

  try {
    const existsAlready = await user.existAlready();
    if (existsAlready ) {
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: "User already exists.",
          ...enteredData,
        },
        function () {
          res.redirect("/signup");
          return;
        },
      );
      return;
    }
    await user.signup();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect("/login");
}

function getLogin(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }
  res.render("auth/login", {
    pageTitle: "Login",
    inputData: sessionData,
    errorMessage: sessionData.errorMessage,
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
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          "Invalid credentials. Please check your email and password.",
        email: user.email,
        password: user.password,
      },
      function () {
        return res.redirect("/login");
      },
    );
    return res.redirect("/login");
  }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password,
  );

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          "Invalid credentials. Please check your email and password.",
        email: user.email,
        password: user.password,
      },
      function () {
        return res.redirect("/login");
      },
    );
    return res.redirect("/login");
  }

  authUtil.createUserSession(req, existingUser, function () {
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
  logout: logout,
};
