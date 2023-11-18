const express = require('express');
//--
const { create, answer, getOne, getMainQestions } = require('../Controllers/Question');
const isLoginMiddle = require('../Middlewares/isLoginUser');
const isAdminMiddle = require('../Middlewares/isAdmin');
//--
const router = express.Router();

router.route('/').post(isLoginMiddle, create)
router.route('/answer').post(isLoginMiddle, answer)
router.route('/:questionID').get(getOne)
router.route('/').get(getMainQestions)

module.exports = router
