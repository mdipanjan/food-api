const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true
    },
    businessType: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    city : {
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});
const Vendor = mongoose.model('vendor', vendorSchema);
module.exports = User;
