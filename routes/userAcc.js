const express = require('express');
const router = express.Router();

// Require file 
const Modelones = require('../models/data_structure');

router.post('/',(req, res) => {
    let userdata =req.body;
    console.log(userdata);
    Modelones.userPlay.create(userdata)
    // .populate("user")
    .then((result) => {
        console.log(result);
        res.send(result);
        console.log(result);
    })
});


module.exports = router;