const express = require('express');
const router = express.Router();
const staffRoutes = require('./routes/staff');
const customerRoutes = require('./routes/customer');
const orderRoutes = require('./routes/order');
const pizzaRoutes = require('./routes/pizza');
const ingredientRoutes = require('./routes/ingredient');


router.use('/staff', staffRoutes);
router.use('/customer', customerRoutes);
router.use('/order', orderRoutes);
router.use('/pizza', pizzaRoutes);
router.use('/ingredient', ingredientRoutes);

module.exports = router;

