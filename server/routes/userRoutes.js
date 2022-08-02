const express = require('express');
const router = express.Router();

const {
    loginUser
} = require("../controllers/userController");


//Register a new user

//Get all users

//Update A user

//Login with existing user
router.post('/login/existing',loginUser);

//Delete a user (and all files??)

module.exports = router;