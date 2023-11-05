const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    console.log("Satellites call")
    console.log(req.body)
    const satellites = req.body.satellites;

    
    res.json({ success: true });
});

module.exports = router;