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
    // console.log(regUser.email);
    regUser.mobileNumber = req.body.mobileNumber;
    regUser.userName = req.body.userName;
    regUser.password = req.body.password;
    registration.deleteOne({email:regUser.email},function(err){
        // if(err){
        //     console.log(err)
        // }
        regUser.save((err, doc) => {
            if (!err){
                console.log('Added User :'+doc);
                
                res.redirect('registration/list');
            }
            else
                console.log('error during record addition : ' + err);
        });
    });
}

router.get('/list', (req, res) => {
    registration.find((err, docs) => {
        if (!err){
            res.render("registration/list", {
                list: docs
            });
        }
        else
            console.log('error in getting the values');
    });
});

router.get('/:id', (req, res) => {
    registration.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("registration/addOredit", {
                viewTitle: "Update User Details",
                registration : doc            
            });
        }
    });
});

module.exports = router;