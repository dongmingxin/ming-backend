const {orderModel, validate } = require('../model/order');
const {pizzaModel} = require('../model/pizza');


async function getAllOrder(req,res) {
    const orders = await orderModel
                            .find()
                            .populate({
                                path: 'pizzas',
                                populate: {path: 'ingredients'}
                            })
    res.json(orders)

}

async function getOrder(req,res) {
    const order = await orderModel.findById(req.params.id).populate({
                                                            path: 'pizzas',
                                                            populate: {path: 'ingredients'}
                                                            })
    if(!order) return res.status(404).json('The ingredient with given ID not found');
    return res.json(order)
}

async function addOrder(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const {name} = req.body
    const newOrder = new orderModel({
        name
    })
    const result = await newOrder.save()
    res.json(result)
}

async function updateOrder(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {name} = req.body;
    const order = await orderModel.findByIdAndUpdate(req.params.id, {
        name
    },{new: true});

    if (!order) {
        return res.status(404).json("order not found")
    };

    return res.json(order);
}

async function deleteOrder(req,res) {
    const order = await orderModel.findByIdAndDelete(req.params.id)
    if(!order) return res.status(404).json('The order with given ID not found');
    return res.json(order)
}

async function addPizza(req, res) {
    const { id, pizzaID } = req.params
    const order = await orderModel.findById(id);
    const pizza = await pizzaModel.findById(pizzaID);
    if (!order || !pizza ) {
        return res.status(404).json('Pizza or Order not found');
    }
    order.pizzas.addToSet(pizza._id)
    await order.save();
    return res.json(order)
}

async function deletePizza(req, res) {
    const { id, pizzaID } = req.params
    const order = await orderModel.findById(id);
    const pizza = await pizzaModel.findById(pizzaID);
    if (!order || !pizza ) {
        return res.status(404).json('Pizza or Order not found');
    }
    order.pizzas.pull(pizza._id);
    await order.save();
    return res.json(order)
}

module.exports = {
    getOrder,
    getAllOrder,
    addOrder,
    updateOrder,
    deleteOrder,
    addPizza,
    deletePizza
}