const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {


  const id = req.body.id;
  const sat = satellites.find(s => s.id === id);
  if (!sat) {
    return res.status(404).send("Satellite not found");
  }

  
  
  res.send(nextPos);
});

module.exports = router;
