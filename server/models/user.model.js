const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "Username is required"]
        },
    fullname: {
        type:String,
        required: [true, "Fullname is required"]
    },
    email:{
        type:String,
        required: [true, "Email Address is required"]
    },
    password:{
        type:String,
        required: [true, "password is required"],
        minLength: [8, "Passwords must be at least 8 characters long"]
    }
}, {timestamps:true});

UserSchema.set('strictQuery', true)

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value);

UserSchema.pre("validate", function(next) {
    console.log('inside pre-validate');

    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords must match!");
    }
    next();
});

UserSchema.pre("save", function(next)
{
    console.log("inside pre-save");
    bcrypt.hash(this.password, 10)
    .then((hashedPassword) => {
        this.password = hashedPassword;
        next();
    })
    .catch((err) => {
        console.log("Error while hashing the password");
    })
})

const User = mongoose.model("User", UserSchema);
module.exports = User;