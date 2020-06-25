const express = require('express');
const router = express.Router();
const {
    getIngredient,
    getAllIngredient,
    addIngredient,
    updateIngredient,
    deleteIngredient,
} = require('../controllers/ingredient');

router.get('/', getAllIngredient);
router.get('/:id', getIngredient);
router.post('/', addIngredient);
router.put('/:id', updateIngredient);
router.delete('/:id', deleteIngredient);

module.exports = router;