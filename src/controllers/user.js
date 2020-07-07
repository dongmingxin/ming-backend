const {userModel, validate } = require('../model/user');
const { generateToken } = require('../utils/jwt');


async function getCurrentUser (req, res) {
    const user = await userModel.findById(req.user.id).select('-password');
    res.send(user)
}

async function addUser (req,res) {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const { name, username, password, address } = req.body

    const existingUser = await userModel.findOne({ username })
    if (existingUser) return res.status(400).json('Username already exist')
    
    user = new userModel({
        name, 
        username, 
        password, 
        address
    })
    await user.hashPassword();
    await user.save()
    const token = generateToken(user._id, user.isAdmin);
    return res.status(201).json({token, name, username, address} );
}

module.exports = {
   getCurrentUser,
   addUser,
}