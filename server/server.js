const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();
const locationRoutes = require("./routes/locationRoutes");
const pictureRoutes = require("./routes/pictureRoutes");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 3001;

//json middleware
app.use(express.json());

//prints incoming requests
app.use((req,res,next) => {
  console.log(req.path, req.method);
  next();
})

//Allows CORS for testing
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//routes
app.use("/api/locations", locationRoutes);
app.use("/api/pictures", pictureRoutes);
app.use("/api/users", userRoutes);

//static files middleware
app.use('/uploads', express.static('uploads'));

//listen for requests
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

//Connect to database(waits to connect before starting server, should probably change this)
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {

  })
  .catch((err) => {
    console.log(err);

  });


