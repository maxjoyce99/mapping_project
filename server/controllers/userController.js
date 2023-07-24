const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ReturnDocument } = require("mongodb");

//Login existing user
const loginUser = async(req, res) => {
  const { username, password } = req.body;
  // Check if username and password is provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    })
  }

  try {
    const user = await User.findOne({username})
    console.log(user);
    if (!user) {
      res.status(401).json({
        message: "Login not successful: user not found",
        error: "There is no user with that username!",
      })
    } else {
      const hash = user.password;
      const passMatch = await bcrypt.compare(password, hash);
      console.log(passMatch);

      if(passMatch){
      res.status(200).json({
        message: "Login successful",
        token: user,
      })
      }
      else{
        res.status(401).json({
          message: "Login not successful: incorrect password",
          error: "That isn't the correct password for that user!",
        })
      }

    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
}

const registerUser = async (req, res, next) => {
    var { username, password, email, friends} = req.body
    const hash = await bcrypt.hash(password, 10);

    if (password.length < 6) {
      return res.status(400).json({ message: "Password less than 6 characters" })
    }
    try {
        const user = await User.create({username,password:hash,email, friends});
        res.status(200).json({
          message: "User successfully created",
          user,
        })
   
        console.log("Adding a new user");

    } catch (err) {
      if(err.code == "11000"){
        res.status(400).json({error: "This username or email already exists, try a new one."});
        console.log("Error: " + err);
      }
      else{
        res.status(400).json({error: "Database Error"});
        console.log("Error: " + err);
    }
    }
}

const updateUser = async(req,res) => {
  console.log("Updating User");

  const { id } = req.params; //gets id from route paramaters

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user to update'});
    }
    
    try{
        const user = await User.findOneAndUpdate({_id: id}, {
            ...req.body
        });
        res.status(200).json(user);
        console.log("Updating a user");
    }catch(err) {
        if(err.code == "11000"){
            res.status(400).json({error: "This user name already exists, try a new one."});
            //console.log("Error: " + err);
        }
        else{
            res.status(400).json({error: "Database Error"});
            //console.log("Error: " + err);
        }
    }

  //res.send("Updating User");
}

const deleteUser = async(req,res) => {
  const { id } = req.params; //gets id from route paramaters

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user to delete'});
    }

    const user = await User.findOneAndDelete({_id: id});

    if(!user) { //if no user send error
        return res.status(404).json({error: 'No such user to delete'});
    }

    res.status(200).json(user);
}

const getAllUsers = async(req,res) => {
  const users = await User.find({}).sort({createdAt: -1});

    res.status(200).json(users);
}

const friendUser = async(req,res) => {
  console.log("Friend User");
  const {username, userId} = req.body;
  console.log(username);
  console.log(userId);
  const friendUser = await User.findOne({username});
  const currentUser = await User.find({_id: userId});
  console.log(friendUser)
  console.log(currentUser)
  if(friendUser){
  res.status(200).json(friendUser);
  const newFriendsList = await User.findOneAndUpdate({_id: userId}, 
    { $push: { friends: friendUser } }
  );

  }
  else{
    res.status(404).json({error: "No such user found"})
  }
}

const getFriendsList = async(req,res) => {
  console.log("getFriendsList");
  const { id } = req.params; //gets id from route paramaters
  const currentUser = await User.findOne({_id: id});
  const friendsList = currentUser.friends;
  res.status(200).json(friendsList);
}

const deleteFriend = async(req,res) => {
  console.log(req.body);
  const friendToDelete = req.body;

  const { id } = req.params; //gets id from route paramaters

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user'});
    }
    
    try{
        const user = await User.updateOne({_id: id}, {
           $pull: { friends: friendToDelete} 
        });
        res.status(200).json(friendToDelete);
        console.log("Deleting Friend");
    }catch(err) {
            res.status(400).json({error: "Database Error"});

    }

}


module.exports = { 
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
    getAllUsers,
    friendUser,
    getFriendsList,
    deleteFriend
    
}