const express = require('express');
const { register, login , getUserbyId } = require('../controllers/User');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

router.get('/user/:id' ,getUserbyId ) ;

module.exports = router;
