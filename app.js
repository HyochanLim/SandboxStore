const path = require("path");

const express = require("express");
const csrf = require("csurf");
const expressSession = require("express-session");

const db = require("./data/database");
const createSessionConfig = require("./config/session");

const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const checkAuthStatus = require("./middlewares/check-auth");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const protectRoutesMiddleware = require("./middlewares/protect-routes");
const cartMiddleware = require("./middlewares/cart");

const baseRoutes = require("./routes/base.routes");
const productsRoutes = require("./routes/products.routes");
const cartRoutes = require("./routes/cart.routes");

const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();
const sessionConfig = createSessionConfig(expressSession);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/product-data", express.static("product-data"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(checkAuthStatus);
app.use(addCsrfTokenMiddleware);
app.use(cartMiddleware.initializeCart);

app.use(baseRoutes);
app.use(productsRoutes);
app.use(cartRoutes);
app.use(authRoutes);

app.use(protectRoutesMiddleware);
app.use('/admin', adminRoutes);

app.use(errorHandlerMiddleware);

db
  .connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.error("Failed to connect to the database:", error);
  });
