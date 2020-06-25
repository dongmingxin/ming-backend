const {pizzaModel, validate } = require('../model/pizza');
const {ingredientModel} = require('../model/ingredient');


async function getAllPizza(req,res) {
    const pizzas = await pizzaModel.find().populate('ingredients', 'name -_id')
    res.json(pizzas)

}

async function getPizza(req,res) {
    const pizza = await pizzaModel.findById(req.params.id).populate('ingredients', 'name -_id')
    if(!pizza) return res.status(404).json('The ingredient with given ID not found');
    return res.json(pizza)
}

async function addPizza(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const {name} = req.body
    const newPizza = new pizzaModel({
        name
    })
    const result = await newPizza.save()
    res.json(result)
}

async function updatePizza(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {name} = req.body;
    const pizza = await pizzaModel.findByIdAndUpdate(req.params.id, {
        name
    },{new: true});

    if (!pizza) {
        return res.status(404).json("ingredient ID not found")
    };

    return res.json(pizza);
}

async function deletePizza(req,res) {
    const pizza = await pizzaModel.findByIdAndDelete(req.params.id)
    if(!pizza) return res.status(404).json('The pizza with given ID not found');
    await pizzaModel.updateMany(
        {_id:{$in: pizza.ingredients}},
    )
    return res.json(pizza)
}

async function addIngredient(req, res) {
    const { id, code } = req.params
    const pizza = await pizzaModel.findById(id);
    const ingredient = await ingredientModel.findById(code);
    if (!pizza || !ingredient ) {
        return res.status(404).json('pizza or ingredient not found');
    }
    pizza.ingredients.addToSet(ingredient._id)
    await pizza.save();
    return res.json(pizza)
}

async function deleteIngredient(req, res) {
    const { id, code } = req.params
    const pizza = await pizzaModel.findById(id);
    const ingredient = await ingredientModel.findById(code);
    if (!pizza || !ingredient ) {
        return res.status(404).json('pizza or ingredient not found');
    }
    pizza.ingredients.pull(ingredient._id);
    await pizza.save();
    return res.json(pizza)
}

module.exports = {
    getPizza,
    getAllPizza,
    addPizza,
    updatePizza,
    deletePizza,
    addIngredient,
    deleteIngredient
}