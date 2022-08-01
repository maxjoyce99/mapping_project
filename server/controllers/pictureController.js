const path = require('path');
const express = require('express');
const app = express();
const multer = require("multer");
const fs = require('fs');

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

//get picture from folder
const getPictureFolder = async(req,res) => {
    const { id } = req.params; //gets id from route paramaters
    var imagePaths = [];
    console.log("Getting pictures");
    var imagePath = path.join(__dirname , "../uploads/crystal1.jpg");
    //res.sendFile(imagePath);

    var folderPathTemp = path.join(__dirname , "../uploads/");
    var folderPath = path.join(folderPathTemp, id);

    if(fs.existsSync(folderPath)){ //check if directory exists first
        //passing directoryPath and callback function
        var imagePaths = fs.readdirSync(folderPath, (err, files) => {
                //handling error
                if (err) {
                    console.log('Unable to scan directory: ' + err);
                }
        });
        
        console.log(imagePaths);
        res.status(200).json(imagePaths);
    }
    else{
        return res.status(404).json({error: 'No such folder found'});
    }
}

//Posting Pictures

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

//post pictures folder function and multer object
const postPicturesFolder = async(req,res) => {
    const { id } = req.params;
    console.log(id);
    console.log(req.files);

    fs.mkdir(path.join("./uploads", id),
    function(err) {
        if (err){
            console.log(err);
        } else{
            console.log("Directory Made");
        }
            
    });

    var i=0;
    for(i=0; i<req.files.length; i++){
        var newImagePath = path.join("./uploads", id, Date.now() + req.files[i].originalname );
        fs.rename(path.join("./uploads", req.files[i].originalname),newImagePath,
        function(err) {
            if (err){
                console.log(err);
            } else{
             console.log("File Renamed");
            }
        });
    }
    if(i==req.files.length){
    console.log("Posting Pictures to folder");

    res.status(200).json(id);
    }
}
//multer storage variable
const storage2 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
  
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload2 = multer({
    storage: storage2,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      }
});

//Delete pictures
const deletePictures = async(req,res) => {
    const { id } = req.params;
    console.log("Deleting Pictures from folder: " + id);
    
    fs.rm(path.join("./uploads", id), {recursive: true}, 
    function(err) {
        if (err){
            console.log(err);
        } else{
            console.log("Directory Deleted");
        }
    });

    res.send("Deleting Pictures" + id);
}

module.exports = { 
    getPictures,
    postPictures,
    getPictureFolder,
    postPicturesFolder,
    deletePictures,
    upload,
    upload2
}


  