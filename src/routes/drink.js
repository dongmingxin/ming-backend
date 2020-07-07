const express = require('express');
const router = express.Router();
const {
    getDrink,
    getAllDrink,
    addDrink,
    updateDrink,
    deleteDrink,
    updateAvatar
} = require('../controllers/drink');

router.get('/', getAllDrink);
router.get('/:id', getDrink);
router.post('/', addDrink);
router.put('/:id', updateDrink);
router.delete('/:id', deleteDrink);
router.put('/:id/avatar', updateAvatar);

module.exports = router;