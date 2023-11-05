const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/", (req, res) => {

  const idToFind = req.body.id;

fs.readFile(
  path.join(__dirname, "../../memory/satellites.json"),
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const satellites = JSON.parse(data);
    const satellite = satellites.find((satellite) => satellite.id === idToFind);

    if (satellite) {
      console.log(satellite);
    } else {
      console.log("Satellite not found");
    }

    // Calculate the next position using the formula
    const prevLatitude = satellite.latitude;
    const prevLongitude = satellite.longitude;
    const prevAltitude = satellite.altitude_km;

    const nextLatitude =
      prevLatitude +
      prevLatitude /
        Math.sqrt(prevLatitude ** 2 + prevLongitude ** 2 + prevAltitude ** 2);
    const nextLongitude =
      prevLongitude +
      prevLongitude /
        Math.sqrt(prevLatitude ** 2 + prevLongitude ** 2 + prevAltitude ** 2);
    const nextAltitude =
      prevAltitude +
      prevAltitude /
        Math.sqrt(prevLatitude ** 2 + prevLongitude ** 2 + prevAltitude ** 2);

    const nextPos = {
      satellite: {
        id: idToFind,
        name: satellite.name,
        latitude: Number(nextLatitude.toFixed(3)),
        longitude: Number(nextLongitude.toFixed(3)),
        altitude_km: Number(nextAltitude.toFixed(3)),
        status: satellite.status,
        country: satellite.country,
      },
      success: true,
    };

    res.send(nextPos);
  }
);
});

module.exports = router;
