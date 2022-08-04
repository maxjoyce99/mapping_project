const Location = require("../models/locationModel");
const mongoose = require("mongoose");
const multer = require("multer");

//get all locations
const getAllLocations = async(req,res) => {
    const { userId } = req.params;
    const locations = await Location.find({'user':userId}).sort({createdAt: -1});

    res.status(200).json(locations);
}


//get one location
const getLocation = async(req,res) => {
    const { id } = req.params; //gets id from route paramaters

    if(!mongoose.Types.ObjectId.isValid(id)){ //if invalid id send error
        return res.status(404).json({error: 'No such location'});
    }

    const location = await Location.findById(id);

    if(!location) { //if not location send error
        return res.status(404).json({error: 'No such location'});
    }

    res.status(200).json(location);
}

//Post a new location
const createLocation = async(req,res) => {
    const { name, place, user } = req.body;

    //Add a document to database
    try{
        const location =  await Location.create({ name, place, user});
        res.status(200).json(location);
        console.log("Posting a new location");
    }catch(err) {
        if(err.code == "11000"){
            res.status(400).json({error: "This location name already exists, try a new one."});
            console.log("Error: " + err);
        }
        else{
            res.status(400).json({error: "Database Error"});
            console.log("Error: " + err);
        }
    }
    
}

//delete a location
const deleteLocation = async(req,res) => {
    const { id } = req.params; //gets id from route paramaters

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such location to delete'});
    }

    const location = await Location.findOneAndDelete({_id: id});

    if(!location) { //if no location send error
        return res.status(404).json({error: 'No such location to delete'});
    }

    res.status(200).json(location);


}

//Update a location 
const updateLocation = async(req,res) => {
    const { id } = req.params; //gets id from route paramaters

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such location to update'});
    }
    
    try{
        const location = await Location.findOneAndUpdate({_id: id}, {
            ...req.body
        });
        res.status(200).json(location);
        console.log("Updating a location");
    }catch(err) {
        if(err.code == "11000"){
            res.status(400).json({error: "This location name already exists, try a new one."});
            //console.log("Error: " + err);
        }
        else{
            res.status(400).json({error: "Database Error"});
            //console.log("Error: " + err);
        }
    }

    /*if(!location) { //if no location send error
        return res.status(404).json({error: 'No such location to update'});
    }*/

    

}

module.exports = {
    createLocation,
    getAllLocations,
    getLocation,
    deleteLocation,
    updateLocation,
}