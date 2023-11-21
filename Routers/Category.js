const express = require('express');
const { create, getMainCategories, getAll } = require('../Controllers/Category');
const isLoginMiddle = require('../Middlewares/isLoginUser');
const isAdminMiddle = require('../Middlewares/isAdmin');
const router = express.Router();

router.route('/').post(isLoginMiddle, isAdminMiddle, create).get(getMainCategories)
router.route('/all').get(getAll)
module.exports = router