const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const ejsmate = require("ejs-mate");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const flash = require("connect-flash");
const cookieParser = require('cookie-parser')


// const cors = require("cors")
// app.use(
//   cors({
//     origin: "http://localhost:3000/",
//   })
// )


// Passport Config
require('./config/passport')(passport);

//Setting Up mongoose
  //mongodb://127.0.0.1/keyhole  -- localhost:27010
mongoose
  .connect("mongodb+srv://uraj212001:63186318@uzibytes.rmw8i.mongodb.net/users_keyhole?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((error) => {
    console.log(error);
    console.log(`no connection`);
  });

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());


// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


app.listen(port, () => {
  console.log("listning!" + port);
});

app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: true, 
  saveUninitialized: true}));


app.use(flash());

//Routes
app.use('/', require('./routes/user.js'));


app.engine("ejs", ejsmate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "/public")));

app.use(methodOverride("_method"));

app.use((err, req, res, next) => {
  let { status = 500, message = "Error Occurred!" } = err;
  console.log(err);
  res.status(status).send(message);
});

app.get("*", (req, res) => {
  res.status(404).send("404 Not Found!");
});
