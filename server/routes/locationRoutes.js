const express = require('express');
const router = express.Router();
const Location = require("../models/locationModel");
const {
    createLocation,
    getAllLocations,
    getLocation,
    deleteLocation,
    updateLocation,
} = require("../controllers/locationController");
const multer = require("multer");

//get all locations
router.get("/", getAllLocations);

//get one location
router.get("/:id", getLocation);

//Post a new location
router.post('/', createLocation);

//delete a location
router.delete('/:id', deleteLocation);

//Update a location
router.patch('/:id', updateLocation);

module.exports = router;