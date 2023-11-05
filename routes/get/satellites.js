const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
  // Read data from memory/satellites.json
  const data = fs.readFileSync(
    path.join(__dirname, "../../memory/satellites.json")
  );

  try {
    res.status(200).json({
      satellites: JSON.parse(data),
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
