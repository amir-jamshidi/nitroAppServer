const express = require('express');
//--
const { create } = require('../Controllers/Question');
const isLoginMiddle = require('../Middlewares/isLoginUser');
const isAdminMiddle = require('../Middlewares/isAdmin');
//--
const router = express.Router();

router.route('/').post(isLoginMiddle, create)

module.exports = router
