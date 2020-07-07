const mongoose = require('mongoose');
const Joi = require('joi')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    calorie: {
        type: String,
        required: true
    },
    avatar:{
        type: String
    },

})

const Model = mongoose.model('Side', schema)

function validate(side) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        price: Joi.number().required(),
        calorie: Joi.string().required(),
        avatar: Joi.string().uri(),
    }
    return Joi.validate(side, schema);
}

exports.sideModel = Model
exports.validate = validate