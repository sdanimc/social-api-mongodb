const router = require('express').Router();
const thoughtRoutes = require('./thought-route');
const userRoutes = require('./user-route');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;
