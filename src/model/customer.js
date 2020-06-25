const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        minlength: 3,
        maxlength: 20,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const Model = mongoose.model('Customer', schema)

module.exports = Model;