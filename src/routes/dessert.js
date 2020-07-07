const express = require('express');
const router = express.Router();
const {
    getDessert,
    getAllDessert,
    addDessert,
    updateDessert,
    deleteDessert,
    updateAvatar
} = require('../controllers/dessert');

router.get('/', getAllDessert);
router.get('/:id', getDessert);
router.post('/', addDessert);
router.put('/:id', updateDessert);
router.delete('/:id', deleteDessert);
router.put('/:id/avatar', updateAvatar);

module.exports = router;