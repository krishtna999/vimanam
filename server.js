require('./models/db');


//requestin registration controller
const registrationController = require('./controllers/registrationController');

//request express
const express = require('express');
var app = express();

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
    console.log('Express server started at port : 3000');
});
//configure for registrationController
app.use('/registration', registrationController);
