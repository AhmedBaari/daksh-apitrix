const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/", (req, res) => {
  const id = req.body.id;

  fs.readFile(
    path.join(__dirname, "../../memory/satellites.json"),
    (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false });
      }

      const satellites = JSON.parse(data);
      const satellite = satellites.find((satellite) => satellite.id === id);

      if (!satellite) {
        return res.status(404).json({ success: false });
      }

      fs.readFile(
        path.join(__dirname, "../../memory/groundst.json"),
        (err, data) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ success: false });
          }

          const groundStations = JSON.parse(data);
          let nearestStation = null;
          let nearestDistance = Number.MAX_VALUE;

          groundStations.forEach((station) => {
            console.log("XX", station);
            const dx = satellite.latitude - station.latitude;
            const dy = satellite.longitude - station.longitude;
            const dz = satellite.altitude_km - 0;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < nearestDistance) {
              nearestStation = station;
              nearestDistance = distance;
            }
          });

          const response = {
            ground_station: {
              name: nearestStation.name,
              id: nearestStation.id,
                distance: Number(nearestDistance.toFixed(3)),
            },
            success: true,
          };

          res.status(200).json(response);
        }
      );
    }
  );
});

module.exports = router;
