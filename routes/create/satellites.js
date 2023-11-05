const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/", (req, res) => {
  const satellites = req.body.satellites;

  // Convert the satellites array to a JSON string
  const data = JSON.stringify(satellites, null, 2);

  // Write the data to satellites.json
  fs.writeFile(
    path.join(__dirname, "../../memory/satellites.json"),
    data,
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false });
      } else {
        res.json({ success: true });
      }
    }
  );
});

module.exports = router;
