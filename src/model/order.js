const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pizzas: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Pizza'}
    ]
    
})

const Model = mongoose.model('Order', schema)

function validate(order) {
    const schema = {
        name: Joi.string().min(3).max(50).required()
    }
    return Joi.validate(order, schema);
}

exports.orderModel = Model;
exports.validate = validate;