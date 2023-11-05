const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post("/", (req, res) => {
  const id1 = req.body.id1;
  const id2 = req.body.id2;

  fs.readFile(
    path.join(__dirname, "../../memory/satellites.json"),
    (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false });
      }

      const satellites = JSON.parse(data);
      const satellite1 = satellites.find((satellite) => satellite.id === id1);
      const satellite2 = satellites.find((satellite) => satellite.id === id2);

      if (!satellite1 || !satellite2) {
        return res.status(404).json({ success: false });
      }

      let minDistance = Number.MAX_VALUE;

      for (let t = 0; t <= 30; t++) {
        

        function calculatePosition(satellite, time) {
          let { latitude, longitude, altitude_km } = satellite;

          for (let t = 0; t < time; t++) {
            const denominator = Math.sqrt(latitude * latitude + longitude * longitude + altitude_km * altitude_km);

            latitude += latitude / denominator;
            longitude += longitude / denominator;
            altitude_km += altitude_km / denominator;
          }

          return { x: latitude, y: longitude, z: altitude_km };
        }

        const position1 = calculatePosition(satellite1, t);
        const position2 = calculatePosition(satellite2, t);

        const dx = position1.x - position2.x;
        const dy = position1.y - position2.y;
        const dz = position1.z - position2.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < minDistance) {
          minDistance = distance;
        }
      }

      const response = {
        min_distance: Number(minDistance.toFixed(3)),
        success: true,
      };

      res.status(200).json(response);
    }
  );
});

module.exports = router;