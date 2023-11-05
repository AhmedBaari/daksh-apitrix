const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
  // Read data from memory/groundst.json
  const data = fs.readFileSync(
    path.join(__dirname, "../../memory/groundst.json")
  );

  try {
    res.status(200).json({
      ground_stations: JSON.parse(data),
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
