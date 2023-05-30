const express = require('express');
const router = express.Router();

const {
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
    getAllUsers,
    friendUser,
    getFriendsList
} = require("../controllers/userController");


//Register a new user
router.post('/new',registerUser);

//Get all users
router.get('/userlist', getAllUsers);

//Get friends list
router.get('/friendslist/:id', getFriendsList);

//Get Single user
router.post('/frienduser', friendUser);

//Update A user
router.patch('/update/:id',updateUser);

//Login with existing user
router.post('/existing',loginUser);

//Delete a user (and all files??)
router.delete('/delete/:id', deleteUser);

module.exports = router;