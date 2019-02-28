const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const registration = mongoose.model('Registration');
//default url
router.get('/', (req, res) => {
    res.render("registration/addOredit", {
        viewTitle : "Insert User"
    });
});

router.post('/', (req, res) => {
    inserRecord(req, res);
});

function inserRecord(req, res){
    var regUser = new registration();
    regUser.fullName = req.body.fullName;
    regUser.email = req.body.email;
    regUser.mobileNumber = req.body.mobileNumber;
    regUser.userName = req.body.userName;
    regUser.password = req.body.password;

    regUser.save((err, doc) => {
        if (!err){
            console.log('Added User :'+doc);
            res.redirect('registration/mainpage');
        }
        else
            console.log('error during record addition : ' + err);
    });
}

router.get('/mainpage', (req, res) => {
    res.json('Hello there');
});

module.exports = router;