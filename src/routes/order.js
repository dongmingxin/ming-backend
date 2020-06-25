const express = require('express');
const router = express.Router();
const {
    getOrder,
    getAllOrder,
    addOrder,
    updateOrder,
    deleteOrder,
    addPizza,
    deletePizza
} = require('../controllers/order');

router.get('/', getAllOrder);
router.get('/:id', getOrder);
router.post('/', addOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);
router.post('/:id/pizza/:pizzaID', addPizza);
router.delete('/:id/pizza/:pizzaID', deletePizza);

module.exports = router;