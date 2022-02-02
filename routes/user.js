const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')

// Load User model
const User = require('../models/user');


//homepage
router.get("/", (req, res) => {
    res.render("homepage",{message:"welcome to home page"});
  });

//login page
router.get("/login", function (req, res) {
    res.render("login");
  });
  
//Register page
router.get("/register", (req, res) => {
    res.render("register");
  });

//Forget Password
router.get("/forget_password", function (req, res) {
    res.render("forget_password");
  });

//Reset Password
router.get("/reset_password", function (req, res) {
    res.render("reset_password");
  });
  
//Explore Page
router.get("/explore", (req, res) => {
    res.render("explore");
  });
  
//About page 
router.get("/about", (req, res) => {
    res.render("about");
  });
  
//Hompage2
router.get("/homepage2", (req, res) => {
    res.render("homepage2");
  });


//Logout
router.get('/logout', (req, res) => {
  console.log("logged out")
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
  });

//Register
router.post("/register", async (req, res) => {

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
            res.render("homepage",{message: "Username must not be empty"})
            // req.flash("Name must not be empty");
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
                  req.flash('success_msg','you are now registred and can login')
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

//login
router.post("/login", async (req, res) => {

  passport.authenticate('local', {
   
    successRedirect: '/homepage2',
    failureRedirect: '/',
    failureFlash: true
  })(req, res);

    
  });
  
  

//forgot password
// router.post('/forget_password', (req, res) => {
//     User.findOne({email:req.body.email},async(err,found)=>{
//       if(err)
//       {
//         console.log(err)
//       }
//       else{
//         if(found)
//         {
//           const data={

//           }
//         }
//       }
//     })
// })
  module.exports = router;
  
  
