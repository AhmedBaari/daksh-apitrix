const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/", (req, res) => {
  const groundst = req.body.ground_stations;

  // Convert the groundst array to a JSON string
  const data = JSON.stringify(groundst, null, 2);
console.log(data)
  // Write the data to groundst.json
  fs.writeFile(
    path.join(__dirname, "../../memory/groundst.json"),
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
