const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
const fs = require('fs');
const path = require('path');
app.use(express.json());
app.use(cors());

app.get('/app', (req, res) => {
  res.send({ message: "hello world" });
});

/* CREATE */

//Satellites
const createSatellites = require('./routes/create/satellites');
app.use('/app/create/satellites', createSatellites);

//Ground Stations
const createGroundST = require('./routes/create/groundst');
app.use('/app/create/groundst', createGroundST);

/* GET */
// Satellites
const getSatellites = require("./routes/get/satellites");
app.use("/app/get/satellites", getSatellites);

// Ground Stations
const getGroundST = require("./routes/get/groundst");
app.use("/app/get/groundst", getGroundST);

/* UPDATE */
// Satellites
const updateSatellites = require("./routes/update/satellites");
app.use("/app/update/satellites", updateSatellites);

// Ground Stations
const updateGroundST = require("./routes/update/groundst");
app.use("/app/update/groundst", updateGroundST);

/* DELETE */
// Satellites
const deleteSatellites = require("./routes/delete/satellites");
app.use("/app/delete/satellites", deleteSatellites);

// Ground Stations
const deleteGroundST = require("./routes/delete/groundst");
app.use("/app/delete/groundst", deleteGroundST);

/* TASK */
// nextpos
const nextPos = require("./routes/task/nextpos");
app.use("/app/task/nextpos", nextPos);

// nearestgs
const nearestGS = require("./routes/task/nearestgs");
app.use("/app/task/nearestgs", nearestGS);

// mindist
const minDist = require("./routes/task/mindist");
app.use("/app/task/mindist", minDist);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});