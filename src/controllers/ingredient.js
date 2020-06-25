const {ingredientModel, validate } = require('../model/ingredient');


async function getAllIngredient(req,res) {
    const ingredients = await ingredientModel.find()
    res.json(ingredients )

}

async function getIngredient(req,res) {
    const ingredient = await ingredientModel.findById(req.params.id)
    if(!ingredient) return res.status(404).json('The ingredient with given ID not found');
    return res.json(ingredient)
}

async function addIngredient(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const {name} = req.body
    const newIngredient = new ingredientModel({
        name
    })
    const result = await newIngredient.save()
    res.json(result)
}

async function updateIngredient(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {name} = req.body;
    const ingredient = await ingredientModel.findByIdAndUpdate(req.params.id, {
        name
    },{new: true});

    if (!ingredient) {
        return res.status(404).json("ingredient ID not found")
    };

    return res.json(ingredient);
}

async function deleteIngredient(req,res) {
    const ingredient = await ingredientModel.findByIdAndDelete(req.params.id)
    if(!ingredient) return res.status(404).json('The ingredient with given ID not found')
    return res.json(ingredient)
}

module.exports = {
    getIngredient,
    getAllIngredient,
    addIngredient,
    updateIngredient,
    deleteIngredient,
}