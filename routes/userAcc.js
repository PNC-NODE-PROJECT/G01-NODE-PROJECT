const express = require('express');
const router = express.Router();

// Require file 
const Modelones = require('../models/data_structure');

// router.post('/login',(req, res) => {
//     let isValid = false;
//     let userdata =req.body;
//     console.log(userdata);
//     Modelones.userPlay.find(userdata)
//     // .populate("user")
//     .then((result) => {
//         console.log(result);
//         if(result.length > 0){
//             isValid = true;
//             res.send(isValid);
//             console.log(isValid);
//         }
//         else {
//             isValid = false;
//             res.send(isValid);
//         }
//     })
// });
router.post('/logins',(req, res) => {
    let userdata =req.body;
    isVaild = false;
    // console.log(userdata+"logins");
    Modelones.userPlay.find(userdata)
    .then((result) => {
        if(result.length > 0){
            isVaild = true
        }
        res.send(isVaild)
    }).catch((error)=> {
        console.log(error)
    })
});

router.post('/register',(req, res) => {
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