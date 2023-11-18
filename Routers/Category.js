const express = require('express');
const { create, get } = require('../Controllers/Category');
const isLoginMiddle = require('../Middlewares/isLoginUser');
const isAdminMiddle = require('../Middlewares/isAdmin');
const router = express.Router();

router.route('/').post(isLoginMiddle, isAdminMiddle, create).get(get)

module.exports = router