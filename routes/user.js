// const express = require('express');
// const router = express.Router();
// const mongoose=require('mongoose');
// const jwt = require('jsonwebtoken')
// const User=require("../models/user2");
// const sgMail = require('@sendgrid/mail');
// const crypto = require('crypto');
// const bcrypt = require("bcrypt");
// sgMail.setApiKey(process.env['SENDGRID_API_KEY']);





// router.post('/login', (req, res) => {
//     const email=req.body.email;
//     const password = req.body.password;
//     User.findOne({ username: username })
//     .then(user => {
//       if (user) {
//         bcrypt.compare(password, user.password, function (err, result) {
//           if (err) {
//             console.log(err);
//           }
//           if (result) {
//             token = jwt.sign({ username: username }, process.env.secretKey,{expiresIn:3600});
//             res.status(200).json({ success: true, status: "Logged in successfully", token });
//           } else {
//             res.status(403).json({ success: false, message: 'Incorrect userrname or password' });
//           }
//         });
//       } else {
//         res.status(404).json({ success: false, message: 'Username not found' });
//       }
//     });
// });

// // 
// // router.post("/register", (req, res, next) => {  
// //     const { name, email ,dob,password } = req.body;
// //     const newuser = new user2({ 
// //         name,
// //         email,
// //         dob,
// //         password
// //     });
// //     newuser.findOne(req.body) 
// //     .then((data)=>{
// //         if(data!==null)
// //         {// duplicate meme exists
// //             err=new Error('This Meme Already Exists!, Try new '); 
// //             err.status=409;
// //             return next(err); 
// //         }
// //         else{
// //             newuser.save((err, data) => { 
// //                 if (err) {
// //                     console.log(err);
// //                 } else {
// //                     res.statusCode=200;
// //                     res.redirect('/homepage');
// //                 }
// //             });
// //         }
// //     },(err)=>next(err))
// //     .catch((err)=>next(err));
// // });


// module.exports = router;