const express = require('express');
const router = express.Router();
const {
    getPizza,
    getAllPizza,
    addPizza,
    updatePizza,
    deletePizza,
    addIngredient,
    deleteIngredient
} = require('../controllers/pizza');

router.get('/', getAllPizza);
router.get('/:id', getPizza);
router.post('/', addPizza);
router.put('/:id', updatePizza);
router.delete('/:id', deletePizza);
router.post('/:id/ingredient/:code', addIngredient);
router.delete('/:id/ingredient/:code', deleteIngredient);


module.exports = router;