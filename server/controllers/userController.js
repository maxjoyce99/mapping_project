const User = require("../models/userModel");

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
    const user = await User.findOne({ username, password })
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      })
    } else {
      res.status(200).json({
        message: "Login successful",
        user,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
  
  res.send({
      token: 'test123'
    })
}

const registerUser = async (req, res, next) => {
    const { username, password, email } = req.body
    if (password.length < 6) {
      return res.status(400).json({ message: "Password less than 6 characters" })
    }
    try {
    const user = await User.create({username,password,email});

    res.status(200).json({
      message: "User successfully created",
      user,
    })

    console.log("Adding a new user");

    } catch (err) {
      if(err.code == "11000"){
        res.status(401).json({error: "This username or email already exists, try a new one."});
        console.log("Error: " + err);
      }
      else {
        res.status(401).json({
          message: "User not successfully created",
          error: err.code,
        })
      }
    }
}

const updateUser = async(req,res) => {
  console.log("Updating User");
  res.send("Updating User");
}


module.exports = { 
    loginUser,
    registerUser,
    updateUser
}