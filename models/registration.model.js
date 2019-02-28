const mongoose = require('mongoose');

var registrationSchema = new mongoose.Schema({
    fullName:{
        type: String
    },
    email:{
        type: String
    },
    mobileNumber: {
        type: String
    },
    userName:{
        type: String
    },
    password:{
        type: String
    }
});

registration=mongoose.model('Registration', registrationSchema);

module.exports=registration;