const express = require('express');
const { create } = require('../Controllers/Category');
const isLoginMiddle = require('../Middlewares/isLoginUser');
const router = express.Router();

router.route('/').post(isLoginMiddle, create)

module.exports = router