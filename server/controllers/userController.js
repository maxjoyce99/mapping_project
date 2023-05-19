const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
        error: "User not found",
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
          error: "Incorrect password",
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
    var { username, password, email } = req.body
    const hash = await bcrypt.hash(password, 10);

    console.log("password")

    if (password.length < 6) {
      return res.status(400).json({ message: "Password less than 6 characters" })
    }
    try {
        
        console.log("Hash: " + hash);
        
        const user = await User.create({username,password:hash,email});
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


module.exports = { 
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
    getAllUsers
    
}