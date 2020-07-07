const jwt = require('jsonwebtoken');

const secret = 'jr-pizza-secret-key';

function generateToken(id, isAdmin) {
    const token = jwt.sign( { id, isAdmin }, secret, { expiresIn: '1d'});
    return token;
}

function validateToken(token) {
    let decoded;
    try {
        decoded = jwt.verify(token, secret);
    } catch (e) {
        return null;
    }
    return decoded
}

module.exports = {
    generateToken,
    validateToken
}