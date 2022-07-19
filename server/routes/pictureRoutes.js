const express = require('express');
const router = express.Router();
const multer = require("multer");

const {
    getPictures,
    postPictures,
    getPictureFolder,
    postPicturesFolder,
    upload,
    upload2
} = require("../controllers/pictureController");

//Get pictures
router.get("/", getPictures);

//Get pictures from folder
router.get("/:id", getPictureFolder);

//post new picture(s), middle arguement is a multer variable to post files
router.post('/', upload.array('images', 30), postPictures);

//post new picture(s) to specific folder, middle arguement is a multer variable to post files
router.post('/:id', upload2.array('images',30), postPicturesFolder);

module.exports = router;