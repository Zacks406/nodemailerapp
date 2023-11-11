const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Authentication = require('../middleware/auth');
const emailRegex = require('../utils/emailRegex');

//creating new user signup
router.post('/signup', async (req, res, next) => {
  try {
    //check if email and password empty
    const { username, email, password } = req.body;
    if (!emailRegex(email) || !password)
      return res.status(500).json({
        message: 'Incorrect Email or Password',
      });

    //check if user already exists
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.status(500).json({
        message: 'Email Already Exists',
      });

    //create user with hash password
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.send(err);
      } else {
        const user = await new User({
          username,
          email,
          password: hash,
        }).save();
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: '1h',
          }
        );
        return res.json({
          user: {
            uid: user._id,
            email: user.email,
            token: token,
          },
          message: 'Registered',
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error Occured',
      error,
    });
  }
});

//get route to get all users

//user login route
router.post('/signin', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!emailRegex(email) || !password) {
      return res.status(500).json({
        message: 'Incorrect Email or Password',
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Email doesn't exists",
      });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match)
      return res.status(500).json({
        message: 'Incorrect Password',
      });
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '1h',
      }
    );
    return res.json({
      user: {
        uid: user._id,
        email: user.email,
        token: token,
      },
      message: 'Authentication Successfull',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error Occured',
      error,
    });
  }
});

module.exports = router;
