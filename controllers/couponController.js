var express = require('express')
var router = express.Router()
var couponModel=require('../models/coupon.js')
// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })
// define the home page route
router.get('/', function (req, res) {
    couponModel.find(function(err,docs){
        if(err)
            return console.error(err);
        
        res.render('coupon/couponList',{
            list:docs
        });

    });
  
});

router.route('/add')
    .get(function(req,res){
        res.render("coupon/couponAdd", {
            viewTitle : "Add Coupon",

          });
    })
    .post(function (req, res) {
    toAdd=new couponModel(req.body);
    console.log('Saving :'+toAdd);
    toAdd.save(function(err){
        if(err)
            return console.error(err);
    })
});

router.post('/spend/:code', function (req, res) {
    code=req.params.code;
    console.log('code:'+code)
    amount=req.body.amount;
    couponModel.findOne({code:code},function(err,doc){
        if(err){
            return console.error(err);
        }
        console.log(doc)
        revisedPrice=doc.use(amount);
        /*
        -1 Lesser than minAmount
        -2 Date expired
        -3 No More coupons
        */
        console.log(amount,revisedPrice);
        res.redirect('/coupon');
    });
    // res.send('spending Coupon')
});

module.exports = router;