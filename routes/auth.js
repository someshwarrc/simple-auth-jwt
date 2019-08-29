const router    =   require('express').Router()
const User      =   require('../models/user')
const bcrypt    =   require('bcrypt')
const jwt       =   require('jsonwebtoken')

router.post('/register', (req, res) => {

    // const emailExists   =   User.findOne({email: req.body.email})
    // if(emailExists) return res.status(400).send('Email already exists') 
    /*email should be unique; since we are returning this next part won't be executed*/

    //generate a salt and hash the password
    let saltRounds  =   10;
    let plaintextPassword   =   req.body.password;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(plaintextPassword, salt, function(err, hash) {
            // Store hash in your password DB.
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash
            }, (err, savedUser) => {
                if(err){
                    return res.status(400).send(err)
                } else {
                    res.send({savedUser: savedUser._id});
                }
            }) 
        })
    })

    
})

router.post('/login', (req, res) => {
    var id  = null;  
    User.findOne({email: req.body.email}, (err, foundUser) => {
        if(foundUser){
            //mail present in DB
            hash    =   foundUser.password;
            // Load hash from your password DB.
            bcrypt.compare(req.body.password, hash, function(err, found) {
                // found == true if correct credentials are provided
                if(found == true)
                {
                    //user has correct credentials so i allot him a jwt
                    const token = jwt.sign({ _id: foundUser._id }, process.env.TOKEN_SECRET, function(err, token) {
                        console.log(token);
                    });
                    res.header('auth-token', token).send('Welcome')
                } else {
                    res.send('Sorry you entered a wrong password')
                }
            });
        } else { 
            //mail not present in mongoDB
            res.send('Sorry you must sign up first')
        }
    })
})

module.exports  =   router;