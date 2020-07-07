const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin: Boolean
})

schema.methods.hashPassword = async function () {
    this.password = await bcrypt.hash(this.password, 12);
}

schema.methods.validatePassword = async function (password) {
    try {
        const validatePassword = await bcrypt.compare(password, this.password)
        return validatePassword;
    } catch (e) {
        return res.status(400).send('Invalid email or password.')
    }
    
}

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        username: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        address: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user, schema);
}

const Model = mongoose.model('User', schema)

exports.userModel = Model;
exports.validate = validateUser;