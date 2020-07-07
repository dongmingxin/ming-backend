const {dessertModel, validate } = require('../model/dessert');


async function getAllDessert(req,res) {
    const desserts = await dessertModel.find()
    res.json(desserts)
}

async function getDessert(req,res) {
    const dessert = await dessertModel.findById(req.params.id)
    if(!dessert) return res.status(404).json('The dessert not found');
    return res.json(dessert)
}

async function addDessert(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {name, price, calorie, avatar} = req.body
    const newDessert = new dessertModel({
        name,
        price,
        calorie,
        avatar
    })
    const result = await newDessert.save()
    res.json(result)
}

async function updateDessert(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {name, price, calorie, avatar} = req.body;
    const dessert = await dessertModel.findByIdAndUpdate(req.params.id, {
        name,
        price,
        calorie,
        avatar
    },{new: true});

    if (!dessert) {
        return res.status(404).json("dessert is not found")
    };

    return res.json(dessert);
}

async function deleteDessert(req,res) {
    const dessert = await dessertModel.findByIdAndDelete(req.params.id)
    if(!dessert) return res.status(404).json('The dessert  not found');
    return res.json(dessert)
}

async function updateAvatar(req, res) {
    const { id } = req.params;
    const { avatar } = req.body;
    const dessert = await dessertModel.findByIdAndUpdate(id, {
        avatar
    });
    if(!dessert) {
        return res.status(404).json('Image missing'); 
    }

    return res.json(dessert)
}

module.exports = {
    getDessert,
    getAllDessert,
    addDessert,
    updateDessert,
    deleteDessert,
    updateAvatar
}