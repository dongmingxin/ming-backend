const {drinkModel, validate } = require('../model/drink');


async function getAllDrink(req,res) {
    const drinks = await drinkModel.find()
    res.json(drinks)
}

async function getDrink(req,res) {
    const drink = await drinkModel.findById(req.params.id)
    if(!drink) return res.status(404).json('The drink not found');
    return res.json(drink)
}

async function addDrink(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {name, price, calorie, avatar} = req.body
    const newDrink = new drinkModel({
        name,
        price,
        calorie,
        avatar
    })
    const result = await newDrink.save()
    res.json(result)
}

async function updateDrink(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {name, price, calorie, avatar} = req.body;
    const drink = await drinkModel.findByIdAndUpdate(req.params.id, {
        name,
        price,
        calorie,
        avatar
    },{new: true});

    if (!drink) {
        return res.status(404).json("drink is not found")
    };

    return res.json(drink);
}

async function deleteDrink(req,res) {
    const drink = await drinkModel.findByIdAndDelete(req.params.id)
    if(!drink) return res.status(404).json('The drink  not found');
    return res.json(drink)
}

async function updateAvatar(req, res) {
    const { id } = req.params;
    const { avatar } = req.body;
    const drink = await drinkModel.findByIdAndUpdate(id, {
        avatar
    });
    if(!drink) {
        return res.status(404).json('Image missing'); 
    }

    return res.json(drink)
}

module.exports = {
    getDrink,
    getAllDrink,
    addDrink,
    updateDrink,
    deleteDrink,
    updateAvatar
}