const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.put("/", (req, res) => {
  const updatedGroundStations = req.body.ground_stations;

  // Read the existing ground_stations from groundst.json
  fs.readFile(
    path.join(__dirname, "../../memory/groundst.json"),
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false });
      } else {
        let groundstData = JSON.parse(data);

        // Concatenate the updated groundst with the existing groundst
        groundstData = groundstData.concat(updatedGroundStations);

        // Convert the groundstData array to a JSON string
        const newData = JSON.stringify(groundstData, null, 2);

        // Write the updated data to satellites.json
        fs.writeFile(
          path.join(__dirname, "../../memory/groundst.json"),
          newData,
          (err) => {
            if (err) {
              console.error(err);
              res.status(500).json({ success: false });
            } else {
              res.json({ ground_stations: groundstData, success: true });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
