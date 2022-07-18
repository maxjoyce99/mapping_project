const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();
const locationRoutes = require("./routes/locationRoutes");
const pictureRoutes = require("./routes/pictureRoutes");

const PORT = process.env.PORT || 3001;

var locationJSON = {
    coordinates: [
        [46.9233,-121.4760],
        [40.758701, -111.876183],
        [42.271389, -71.798889]
    ]
    
}

//middleware
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

app.use('/uploads', express.static('uploads'));

//Connect to database
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);

  });

//Get a picture
/*app.get('/api/pictures', (req,res) => {
  console.log("Getting pictures");
  res.status(200);
  res.send({message: "Cuck"});
});*/


/*app.get("/api", (req, res) => {
  res.json({locationJSON});
});*/


