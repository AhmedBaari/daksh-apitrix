const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.delete("/", (req, res) => {
  const idToDelete = req.body.id;

  // Read the existing groundst from groundst.json
  fs.readFile(
    path.join(__dirname, "../../memory/groundst.json"),
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false });
      } else {
        let groundst = JSON.parse(data);

        // Filter out the satellite with the given ID
        groundst = groundst.filter(
          (satellite) => !idToDelete.includes(satellite.id)
        );

        // Convert the groundst array to a JSON string
        const newData = JSON.stringify(groundst, null, 2);

        // Write the updated data to groundst.json
        fs.writeFile(
          path.join(__dirname, "../../memory/groundst.json"),
          newData,
          (err) => {
            if (err) {
              console.error(err);
              res.status(500).json({ success: false });
            } else {
              res.json({ ground_stations: groundst, success: true });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
