const express = require('express');
const router = express.Router();

const {
    loginUser,
    registerUser,
    updateUser
} = require("../controllers/userController");


//Register a new user
router.post('/new',registerUser);
//Get all users

//Update A user
router.post('/update',updateUser)
//Login with existing user
router.post('/existing',loginUser);

//Delete a user (and all files??)

module.exports = router;