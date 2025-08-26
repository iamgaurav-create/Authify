import mongoose, { Schema }  from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please enter your username"]
    },

    email:{
        type:String,
        required:[true, "Please enter your email"],
        unique:true
    },

    password:{
        type: String,
        required: [true, "Please enter your password"]
    },
     isVerified:{
        type: Boolean,
        default: false
    },
     otp: {
    type: String
   },

   otpExpiry: {
    type: Date
   },
   resetPasswordToken: {
    type: String
   },
   
   resetPasswordExpiry:{
    type: Date
   }

},
{
    timestamps: true
})

const User = mongoose.model("User", userSchema);
export default User;