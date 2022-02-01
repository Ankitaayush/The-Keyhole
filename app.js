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
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');
sgMail.setApiKey(process.env['SENDGRID_API_KEY']);




// const AuthController = require('./Controllers/Auth.Controller')

const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("jwthelper");
const e = require("express");
const { error } = require("console");

app.use(methodOverride("_method"));



//Setting Up mongoose
  //mongodb://127.0.0.1/keyhole
mongoose
  .connect("mongodb://127.0.0.1/keyhole", {
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


app.get("/hompage2", (req, res) => {
  res.render("homepage2");
});
app.get("/homepage2#search_tab", (req, res) => {
  res.render("hompage2#search_tab");
});


app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: true, 
  saveUninitialized: true}));
app.use(flash());
app.post("/register", async (req, res) => {

 
  
        User.findOne({ email: req.body.email }, (err, found) => {
          if (err) {
            console.log(err);
            res.statusCode = 500;
            res.json(err);
          }
          else {
            if (found) {
              res.statusCode = 409;
              res.json({ success: false, message: "Email already exists" });
            }
            else {
              var password = req.body.password;
              var name = req.body.name;
              name = name.trim();
              if (name == "") {
                res.statusCode = 400;
                res.json({ success: false, message: "Username must not be empty" })
              }
              password = password.trim();
              if (password === "") {
                res.statusCode = 400;
                res.json({ success: false, message: "Password must not be empty" })
              }
              if (password.length < 4) {
                res.statusCode = 422;
                res.json({ success: false, message: 'Password length should be greater than 4 characters' })
              }
              bcrypt.hash(req.body.password, 10, function (err, hash) {


                
                if (err) {
                  console.log(err);
                  res.statusCode = 500;
                  res.json(err);
                } else {
                  const user = {
                    email: req.body.email,
                    name: req.body.name,
                    dob:req.body.dob,
                    password: hash
                  }  
  
                 

                  const newUser = new User(user);
                  newUser.save(err => {
                    if (err) {
                      console.log(err);
                      res.statusCode = 500;
                      res.json(err);
                    } else {
                      
                      var showUser = {
                        success: true,
                        status: ' Registration Successful',
                        name: {}
                      };
                      showUser.name = name;
                     
                      res.render("homepage")

        }
      });
    }

  }
  );

  
 
}
}
});
}

);




    
    
   
    

app.post("/login", async (req, res) => {

  var email = req.body.email;
  var password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            console.log(err);
          }
          if (result) {
          
            // res.status(200).json({ success: true, status: "Logged in successfully"});
            res.render("homepage2")
          } else {
            res.status(403).json({ success: false, message: 'Incorrect userrname or password' });
          }
        });
      } else {
        res.status(404).json({ success: false, message: 'Username not found' });
      }
    });
});


//forgot password
app.post('/forget_password', (req, res) => {
  const email=req.body.email
  res.send(email)
  console.log(hii)

})


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
