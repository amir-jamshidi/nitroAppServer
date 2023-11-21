const express = require('express');
const { register, confirmUser, login, getMe, editProfile } = require('../Controllers/Auth');
const isLoginUserMiddle = require('../Middlewares/isLoginUser');
const uploaderMiddle = require('../Utils/multerConfig');
const router = express.Router();

router.route('/register').post(register);
router.route('/confirm').post(confirmUser);
router.route('/login').post(login);
router.route('/me').get(isLoginUserMiddle, getMe);

router.route('/profile').post(isLoginUserMiddle, uploaderMiddle.single('profile'), editProfile)
module.exports = router;