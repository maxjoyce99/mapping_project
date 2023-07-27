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

const friendUser = async(req,res) => { //add to eachtohers friends list
  console.log("Friend User");
  const {userRequesting, currentUserId} = req.body;
  //console.log(userRequesting);
  //console.log(currentUserId);
  const requestingUser = await User.findOne({userRequesting});
  const currentUser = await User.findOne({_id: currentUserId});
  const requestingUserAdd = {username: requestingUser.username, id:requestingUser._id};
  const currentUserAdd = {username: currentUser.username, id:currentUser._id};
  console.log(requestingUser.username)
  console.log(currentUser.username)
    

    //add 
    const newFriendsList = await User.findOneAndUpdate({_id: currentUserId}, 
      { $push: { friends: requestingUserAdd } }
    );


    const newFriendsList2 = await User.findOneAndUpdate({_id: requestingUser._id}, 
      { $push: { friends: currentUserAdd } }
    );

  if(newFriendsList && newFriendsList2){

    res.status(200).json(requestingUser.username + " is now friends with " + currentUser.username);

  }
  else{
    res.status(404).json({error: "No such users found"})
  }
}

const requestUser = async(req,res) => { 
  console.log("Follow User");
  const {username, userId} = req.body;
  console.log(username);
  console.log(userId);
  const friendUser = await User.findOne({username});
  const currentUser = await User.findOne({_id: userId});
  const currentUserAdd = {username: currentUser.username, id:currentUser._id}
  console.log(friendUser)
  console.log(currentUser)
  console.log(currentUserAdd);
  if(friendUser){
  
  const newFriendsList = await User.findOneAndUpdate({_id: friendUser._id}, 
    { $push: { pending: currentUserAdd } }
  );

  res.status(200).json(friendUser);

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

const unFriend = async(req,res) => {
  console.log(req.body);
  const {friendToDelete,currentUserId} = req.body;

  const otherUser = await User.findOne({friendToDelete});
  const currentUser = await User.findOne({_id: currentUserId});


  const newFriendsList = await User.findOneAndUpdate({_id: currentUserId}, 
    { $pull: { friends: {username: otherUser.username} }});

  const newFriendsList2 = await User.findOneAndUpdate({_id: otherUser._id},
    { $pull: { friends: {username: currentUser.username}} });


  if(newFriendsList && newFriendsList2){
        res.status(200).json(otherUser.username + " is no longer friends with " + currentUser.username);
        console.log("Deleting Friend");
  }
  else {
    res.status(404).json({error: "Failed to unfriend these users"})
  }


}

const getPendingList = async(req,res) => {
  console.log("getFriendsList");
  const { id } = req.params; //gets id from route paramaters
  const currentUser = await User.findOne({_id: id});
  const pendingList = currentUser.pending;
  res.status(200).json(pendingList);
}


module.exports = { 
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
    getAllUsers,
    friendUser,
    getFriendsList,
    unFriend,
    requestUser,
    getPendingList
    
}