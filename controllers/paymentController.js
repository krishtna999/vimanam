var express = require('express')
var router = express.Router()
// var stripe = require('stripe')('pk_test_TYooMQauvdEDq54NiTphI7jx');
var stripe = require("stripe")("sk_test_vK3WjxI3YeAQc8zqReKpU1ij");
var couponModel=require('../models/coupon.js')


router.post('/charge', function (req, res) {
    amt=20;
    // res.render('payment/payment',{viewTitle:"Payment"});
    stripe.customers.create({
        email: req.body.stripeEmail,
        card: req.body.stripeToken
    })
    .then(customer =>
        stripe.charges.create({
          amount,
          description: "Sample Charge",
          currency: "usd",
          customer: customer.id
        }))
      .catch(err => console.log("Error:", err))
    .then(charge => res.render("payment/charge"));
});

router.post('/:code',function(req,res){
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
        if(revisedPrice>=0){
            res.render("payment/payment",{toPay:revisedPrice});
        }
    });
});
module.exports = router;