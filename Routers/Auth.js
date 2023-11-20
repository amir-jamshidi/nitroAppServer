const express = require('express');
const { register, confirmUser, login, getMe } = require('../Controllers/Auth');
const isLoginUserMiddle = require('../Middlewares/isLoginUser');
const router = express.Router();

router.route('/register').post(register);
router.route('/confirm').post(confirmUser);
router.route('/login').post(login);
router.route('/me').get(isLoginUserMiddle, getMe);
module.exports = router;