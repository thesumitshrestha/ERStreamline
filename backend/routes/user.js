const express = require('express');

const { signUp, login, logout } = require('../controllers/authController');

const router = express.Router();

const User = require('../models/user');

router.get('/signup', (req, res) => {
  res.render('signup');
});
router.post('/signup', signUp);
router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login', login);
router.get('/logout', logout);

// post a roomBed
// router.post('/', createRoomBed);

module.exports = router;
