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

const Model = mongoose.model('PizzaGenre', schema)

function validate(PizzaGenre) {
    const schema = {
        name: Joi.string().min(3).max(50).required()
    }
    return Joi.validate(PizzaGenre, schema);
}

exports.pizzaGenreModel = Model
exports.validate = validate