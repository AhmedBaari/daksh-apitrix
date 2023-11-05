const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.put("/", (req, res) => {
  const updatedSatellites = req.body.satellites;

  // Read the existing satellites from satellites.json
  fs.readFile(path.join(__dirname, "../../memory/satellites.json"), (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false });
    } else {
      let satellites = JSON.parse(data);

      // Concatenate the updated satellites with the existing satellites
      satellites = satellites.concat(updatedSatellites);

      // Convert the satellites array to a JSON string
      const newData = JSON.stringify(satellites, null, 2);

      // Write the updated data to satellites.json
      fs.writeFile(path.join(__dirname, "../../memory/satellites.json"), newData, (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ success: false });
        } else {
          res.json({ satellites: satellites, success: true });
        }
      });
    }
  });
});

module.exports = router;