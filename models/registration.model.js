const mongoose = require('mongoose');

var registrationSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: 'This feild cannot be empty'
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

registrationSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email.text); // Assuming email has a text attribute
 }, 'The e-mail field cannot be empty.')

registration=mongoose.model('Registration', registrationSchema);

module.exports=registration;