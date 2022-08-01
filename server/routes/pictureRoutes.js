const express = require('express');
const router = express.Router();
const multer = require("multer");

const {
    getPictures,
    getPictureFolder,
    postPicturesFolder,
    deletePictures,
    upload2
} = require("../controllers/pictureController");

//Get all pictures
router.get("/", getPictures);

//Get pictures from folder
router.get("/:id", getPictureFolder);

//post new picture(s) to specific folder, middle arguement is a multer variable to post files
router.post('/:id', upload2.array('images',30), postPicturesFolder);

//delete pictures from folder
router.delete('/:id', deletePictures)

module.exports = router;