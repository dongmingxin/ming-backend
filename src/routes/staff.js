const express = require('express');
const router = express.Router();
const {
    getStaff,
    getAllStaff,
    addStaff,
    updateStaff,
    deleteStaff,
    createInboxMail,
    removeInboxMail,
} = require('../controllers/staff');

router.get('/', getAllStaff);
router.get('/:id', getStaff);
router.post('/', addStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);
router.post('/:id/mail', createInboxMail);
router.delete('/:id/mail/:mailId', removeInboxMail);


module.exports = router;
