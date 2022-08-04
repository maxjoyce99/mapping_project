const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name: {
        type: String,
        required: false,
        unique: false
    },
    place:{
        type: Array,
        required: true,
        unique: false,
        items: {
            type: Number
           }
    },
    user: {
        type: String,
        required: true,
        unique: false
    }
    
}, {timestamps:true});

module.exports = mongoose.model('Location' , locationSchema);