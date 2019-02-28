//import mongoose
const mongoose = require('mongoose');
//connect to the DB
mongoose.connect('mongodb://localhost:27017/vimanam', {useNewUrlParser : true}, (err) => {
    if (!err) {console.log('Connected to mongoDB successfully')}
    else {console.log('Error in MONGODB connection ' + err)}
});

require('./registration.model')

