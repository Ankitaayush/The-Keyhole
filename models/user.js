const mongoose=require('mongoose');
const schema=mongoose.Schema;
const passportLocalMongoose=require('passport-local-mongoose');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");

// const AuthController = require('../Controllers/Auth.Controller')


const userSchema= new schema({

name:{
    type:String,
   
},

email:{
type:String,

},

dob:{
type:String,

},
password:{
type:String,

},


tokens:[{
     token:{
         type:String,
         required:true
     }
}]


// resetPasswordToken: String,
// resetPasswordExpires: Date,
}
);


//  userSchema.pre('save', async function(next){


// try {
//     const salt=await bcrypt.genSalt(10)
//     const hashed=await bcrypt.hash(this.password,salt);

// this.password=hashed;
// next()

// } catch ( error )
// {
// next(error);
// }
// })

    



userSchema.methods.generateAuthToken=async function(){
    try {
        console.log(this._id);
        const token =jwt.sign({_id:this._id.toString()},"string");
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;


    } catch (error) {
        
        res.send("the error part"+ error);
        console.log("the error part"+error);
    }
}



// UserSchema.methods.isValidPassword = async function (password) {
//     try {
//       return await bcrypt.compare(password, this.password)
//     } catch (error) {
//       throw error
//     }

// } 




const User=new mongoose.model('User', userSchema);

module.exports=User;

