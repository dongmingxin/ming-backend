const express = require('express');
const router = express.Router();
const {
    getCustomer,
    getAllCustomer,
    addCustomer,
    updateCustomer,
    deleteCustomer,
} = require('../controllers/customer');

router.get('/', getAllCustomer);
router.get('/:id', getCustomer);
router.post('/', addCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;