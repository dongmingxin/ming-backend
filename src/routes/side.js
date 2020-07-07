const express = require('express');
const router = express.Router();
const {
    getSide,
    getAllSide,
    addSide,
    updateSide,
    deleteSide,
    updateAvatar
} = require('../controllers/side');

router.get('/', getAllSide);
router.get('/:id', getSide);
router.post('/', addSide);
router.put('/:id', updateSide);
router.delete('/:id', deleteSide);
router.put('/:id/avatar', updateAvatar);

module.exports = router;