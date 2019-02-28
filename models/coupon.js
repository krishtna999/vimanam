var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/vimanam',{useNewUrlParser: true});
var db=mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:')); //incase of error
var couponSchema=new mongoose.Schema({
    // Name =>Coupon Code
    code:String,
    validFrom:Date,
    validTill:Date,
    /*
        Number of coupons available/remaining
        If coupons are unlimited, set to -1
    */
    available:Number,
    discount:Number,            //Discount percentage
    // Min amount to use coupon
    minAmount:Number,
    maxCashback:Number
});

couponSchema.methods.use=function(amount){
    if(amount<this.minAmount){
        return -1;
    }
    currDate=new Date()
    console.log(currDate>this.validTill,this.validFrom)
    if(currDate>this.validTill && currDate<this.validFrom){
        return -2;
    }
    if(this.available<=0){
        return -3;
    }
    
    discountedAmount=amount*(1-this.discount/100);
    discountedAmount=Math.min(this.maxCashback,discountedAmount);
    this.available--;
    this.save();
    return discountedAmount;
}

var coupon=mongoose.model('coupon',couponSchema);

module.exports=coupon;


