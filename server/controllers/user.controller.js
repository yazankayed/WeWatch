const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: (req, res) => {
        console.log("in register");
        console.log(req.body);
        const user = new User(req.body);

        user.save()
        .then((newUser) => {
            console.log(newUser);
            console.log("Succesfully registered");
            res.json({
                message: "Successfully registered",
                user: newUser
            })
        })
        .catch((err) => {
            console.log("Register not successful");
            res.status(400).json(err)
        })
    },

    login: (req, res) =>{
        User.findOne({ email: req.body.email})
            .then((userRecord) => {
                if(userRecord === null){
                    res.status(400).json({message: "Invalid login attempt"});
                } else {
                    bcrypt.compare(req.body.password, userRecord.password)
                        .then((isPasswordValid) => {
                            if(isPasswordValid) {
                                console.log('Password is valid');
                                console.log(userRecord);
                                console.log(process.env.JWT_SECRET);
                                res.cookie("usertoken", 
                                    jwt.sign({
                                        user_id: userRecord._id,
                                        email: userRecord.email,
                                        name: userRecord.name                                    }, 
                                    process.env.JWT_SECRET),
                                    {
                                        httpOnly:true,
                                        expires: new Date(Date.now() + 900000)
                                    }
                                    
                                ).json({
                                    message:"Succesfly logged in",
                                    userLoggedIn: userRecord.name                              })

                            }else{
                                res.status(400).json({message: "Invalid login attempt"});
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            res.status(400).json({message: "Invalid login attempt"});
                        })
                }
            })
            .catch((err) => {
                console.log("Error with find one")
                res.status(400).json({message: "Invalid login attempt",err});
            })
    },
    logout: (req, res) => {
        console.log("Logging out!");
        res.clearCookie("Usertoken"); 
        res.json({
            message:"You have successfuly logged out"
        })
    },
    getUserByEmail: (req, res) => {
        User.findOne({ email: req.query.email }) 
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                } else {
                    res.json({ user });
                }
            })
            .catch((err) => {
                console.log("Error while getting user by email", err);
                res.status(500).json({ message: "Internal server error" });
            });
    },
}

module.exports.getUser = (request, response) => {
    User.findOne({_id:request.params.id})
        .then(user => response.json(user))
        .catch(err => response.json(err))
}

module.exports.deleteUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}


module.exports.updateUser = (request, response) => {
    User.findByIdAndUpdate(request.params.id, request.body, {new:true})
        .then(updatedUser => {response.json(updatedUser) ; console.log(request.body)})
        .catch(err => response.json(err))
}

