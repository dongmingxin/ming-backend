const mongoose = require('mongoose');
const Joi = require('joi')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Model = mongoose.model('Ingredient', schema)

function validate(ingredient) {
    const schema = {
        name: Joi.string().min(3).max(50).required()
    }
    return Joi.validate(ingredient, schema);
}

exports.ingredientModel = Model
exports.validate = validate