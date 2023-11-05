const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.delete("/", (req, res) => {
  const idToDelete = req.body.id;

  // Read the existing satellites from satellites.json
  fs.readFile(path.join(__dirname, "../../memory/satellites.json"), (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false });
    } else {
      let satellites = JSON.parse(data);

      // Filter out the satellite with the given ID
      satellites = satellites.filter((satellite) => !idToDelete.includes(satellite.id));

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