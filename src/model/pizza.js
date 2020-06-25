const mongoose = require('mongoose');
const Joi = require('joi')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}
    ]

})

const Model = mongoose.model('Pizza', schema)

function validate(pizza) {
    const schema = {
        name: Joi.string().min(3).max(50).required()
    }
    return Joi.validate(pizza, schema);
}

exports.pizzaModel = Model
exports.validate = validate