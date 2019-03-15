require('./models/db');


//requesting the controllers

const registrationController = require('./controllers/registrationController');
var couponController=require('./controllers/couponController.js')
var paymentController=require('./controllers/paymentController.js')

//request express
const express = require('express');
var app = express();

app.use(express.static(__dirname + '/public')); //Serves resources from public folder

//requesting express-handlebars
const exphbs = require('express-handlebars');

//requesting path
const path = require('path');

//add body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//setting the directory to render views
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'hbs');






//starting the express with the port number and callback function
app.listen(4000, () => {
    console.log('Express server started at port : 4000');
});
//configure for the Controllers
app.use('/registration', registrationController);
app.use('/coupon',couponController);
app.use('/payment',paymentController);