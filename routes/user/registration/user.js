const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const passport = require('passport');
const router = express.Router();
const User = require("../../../models/users/User");

//@route api/users/register
//@des Register New User
//@access Public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exist" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json(newUser);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route api/users/login
//@des Login user and send token
//@access Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //match user

          //create jwt payload
          const payload = { id:user.id, name:user.name };
          //sign Token
          jwt.sign(payload, keys.secret, {expiresIn: 3600}, (err, token) => {
            res.json({
              success: true,
              token: 'Bearer '+ token
            });
           
          });
        } else {
          return res.status(400).json({ password: "Incorrect password" });
        }
      });
    }
  });
});


//@route api/users/current
//@des get the current user
//@access Private

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res)=>{

  res.json({
    id: req.user.id,
    name: req.user.name
  })
})

module.exports = router;
