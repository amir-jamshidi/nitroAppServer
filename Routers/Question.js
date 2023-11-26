const express = require('express');
//--
const { create, answer, getOne, getMainQestions, getAllQuestions, getQuestionsByCategory, saveQuestion, likeQuestion, setTrueAnswer } = require('../Controllers/Question');
const isLoginMiddle = require('../Middlewares/isLoginUser');
const isOptionalLoginMiddle = require('../Middlewares/isOptionalLoginUser');
//--
const router = express.Router();

router.route('/all').get(getAllQuestions)
router.route('/').post(isLoginMiddle, create)
router.route('/answer').post(isLoginMiddle, answer)
router.route('/:questionID').get(isOptionalLoginMiddle, getOne)
router.route('/').get(getMainQestions)
router.route('/category/:href').get(getQuestionsByCategory)
router.route('/save').post(isLoginMiddle, saveQuestion)
router.route('/like').post(isLoginMiddle, likeQuestion)
router.route('/true/answer').post(isLoginMiddle, setTrueAnswer)

module.exports = router
