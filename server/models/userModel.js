const Mongoose = require("mongoose")

const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  friends: {
    type: Array,
    unique: false,
    required: false
  },
  pending: {
    type: Array,
    unique: false,
    required: false
  }
})


module.exports = Mongoose.model("user", UserSchema);