const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();
const locationRoutes = require("./routes/locationRoutes")

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

app.use((req,res,next) => {
  console.log(req.path, req.method);
  next()
})

//routes
app.use("/api/locations", locationRoutes);

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


/*app.get("/api", (req, res) => {
  res.json({locationJSON});
});*/


