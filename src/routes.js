const express = require('express');
const router = express.Router();
const staffRoutes = require('./routes/staff');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const pizzaRoutes = require('./routes/pizza');
const pizzaGenreRoutes = require('./routes/pizzaGenre');
const sideRoutes = require('./routes/side');
const drinkRoutes = require('./routes/drink');
const dessertRoutes = require('./routes/dessert');
const authRoutes = require('./routes/auth');
const authGuard = require('./middleware/authGuard');
const admin = require('./middleware/admin');


router.use('/staffs', [authGuard, admin], staffRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/pizzas', pizzaRoutes);
router.use('/pizzaGenres', pizzaGenreRoutes);
router.use('/sides', sideRoutes);
router.use('/drinks', drinkRoutes);
router.use('/desserts', dessertRoutes);
router.use('/auth', authRoutes);


module.exports = router;

