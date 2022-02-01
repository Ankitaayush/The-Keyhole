const mongoose=require('mongoose')
const schema=mongoose.Schema;


const otpschema=new mongoose.schema({
    email:String,
    code:String,
    expireIn:Number
},{
    timestamps:true
}
)

