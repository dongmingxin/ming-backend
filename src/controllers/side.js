const {sideModel, validate } = require('../model/side');


async function getAllSide(req,res) {
    const sides = await sideModel.find()
    res.json(sides)
}

async function getSide(req,res) {
    const side = await sideModel.findById(req.params.id)
    if(!side) return res.status(404).json('The Side not found');
    return res.json(side)
}

async function addSide(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const {name, price, calorie, avatar} = req.body
    const newSide = new sideModel({
        name,
        price,
        calorie,
        avatar
    })
    const result = await newSide.save()
    res.json(result)
}

async function updateSide(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {name, price, calorie, avatar} = req.body;
    const side = await sideModel.findByIdAndUpdate(req.params.id, {
        name,
        price,
        calorie,
        avatar
    },{new: true});

    if (!side) {
        return res.status(404).json("side is not found")
    };

    return res.json(side);
}

async function deleteSide(req,res) {
    const side = await sideModel.findByIdAndDelete(req.params.id)
    if(!side) return res.status(404).json('The side  not found');
    return res.json(side)
}

async function updateAvatar(req, res) {
    const { id } = req.params;
    const { avatar } = req.body;
    const side = await sideModel.findByIdAndUpdate(id, {
        avatar
    });
    if(!side) {
        return res.status(404).json('Image missing'); 
    }

    return res.json(side)
}

module.exports = {
    getSide,
    getAllSide,
    addSide,
    updateSide,
    deleteSide,
    updateAvatar
}