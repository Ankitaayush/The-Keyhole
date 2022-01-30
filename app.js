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
// const AuthController = require('./Controllers/Auth.Controller')

const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("jwthelper");

app.use(methodOverride("_method"));

app.use(flash());

//Setting Up mongoose
  //mongodb://127.0.0.1/keyhole
mongoose
  .connect("mongodb://localhost:27017/keyhole", {
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

app.listen(port, () => {
  console.log("listning!" + port);
});

app.get("/", (req, res) => {
  res.render("homepage");
});

//Showing login form
app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/forget_password", function (req, res) {
  res.render("forget_password");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/explore", (req, res) => {
  res.render("explore");
});

app.get("/about", (req, res) => {
  res.render("about");
});
// app.use(session({ secret: 'key hole', resave: true, saveUninitialized: true }));

app.get("/hompage2", (req, res) => {
  res.render("homepage2");
});
app.get("/homepage2#search_tab", (req, res) => {
  res.render("hompage2#search_tab");
});

app.post("/register", async (req, res) => {
  // const salt = bcrypt.genSaltSync(saltRounds);
  //    const hash=  await bcrypt.hash(req.body.password, salt);

  const createToken = async () => {
    const token = await jwt.sign(
      { _id: "61e97b8ac37cf0238eeaad63" },
      "dzsfxgchjjj"
    );
    console.log(token);
    const userVer = await jwt.verify(token, "dzsfxgchjjj");
    console.log(userVer);
  };

  createToken();

  try {
    const hashed1 = await bcrypt.hash(req.body.password, 10);
    const newuser = new User({
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob,
      password: hashed1,
      // console.log(email1 +""+name1+"" +""+dateofbirth+""+password);
    });

    const token = await newuser.generateAuthToken();
    console.log("the token part" + token);

    console.log(newuser);
    await newuser.save((error, data) => {
      if (error) console.log(error);
      else {
        res.status(201).render("homepage");
        console.log("running");
      }
    });
  } catch (error) {
    console.log(error);
    res.redirect("/register");
    res.status(400).send("invalid email");
  }
});

app.post("/login", async (req, res) => {
  try {
    // const usermail=await User.findone({email:email});
    const email = req.body.email;
    const password = req.body.password;
    // const user={email:req.body.email ,password:}

    const useremail = await User.findOne({ email: email });

    if (useremail.password === password) {
      res.status(201).render("homepage2");
    } else {
      res.send("password are not matchig");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("invalid login");
  }

  // const newuser = new User({

  //     email: req.body.email,
  //     password: req.body.password,})

  // if(newuser.email==null){
  //     return res.status(400).send('cannot find user');
  // }

  // try{

  // if(usermail.password==password)
  // res.status(201).render("homepage2");

  // if(await bcrypt.compare(req.body.password, newuser.password)) {
  //     res.send('Success')
  //   } else {
  //     res.send('Not Allowed')
  //   }
  // } catch {
  //   res.status(500).send()
  // }

  // else{

  // res.send("invalid login");
  // }

  //     } catch (error) {
  //         console.log(error)
  //         res.status(400).send("qwertg")
  //     }
});

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
