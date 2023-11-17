const express = require('express');
const { register, confirmUser, login } = require('../Controllers/Auth');
const router = express.Router();

router.route('/register').post(register);
router.route('/confirm').post(confirmUser);
router.route('/login').post(login);
module.exports = router;