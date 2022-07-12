const express = require('express');
const router = express.Router();
const Location = require("../models/locationModel");
const {
    createLocation,
    getAllLocations,
    getLocation,
    deleteLocation,
    updateLocation,
    postPictures
} = require("../controllers/locationController");
const multer = require("multer");

//get all locations
router.get("/", getAllLocations);

//get one location
router.get("/:id", getLocation);

//Post a new location
router.post('/', createLocation);

//Post new pictures
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

router.post('/pictures', upload.array('images', 9), postPictures);

//delete a location
router.delete('/:id', deleteLocation);

//Update a location
router.patch('/:id', updateLocation);



module.exports = router;