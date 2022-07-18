const path = require('path');
const express = require('express');
const app = express();
const multer = require("multer");
const fs = require('fs');
var FormData = require('form-data');

//Get a picture
const getPictures = async(req,res) => {
    var imagePaths = [];
    console.log("Getting pictures");
    var imagePath = path.join(__dirname , "../uploads/crystal1.jpg");
    //res.sendFile(imagePath);

    var folderPath = path.join(__dirname , "../uploads");

    //passing directoryPath and callback function
    var imagePaths = fs.readdirSync(folderPath, (err, files) => {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
    });
    
    console.log(imagePaths);
    res.status(200).json(imagePaths);
    
}


//multer storage variable to store images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
  
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

//post pictures function
const postPictures = async(req,res) => {
    console.log("Posting Pictures");
    console.log(req.files);
    res.send('File upload success');
    
}

module.exports = { 
    getPictures,
    postPictures,
    upload
}
  