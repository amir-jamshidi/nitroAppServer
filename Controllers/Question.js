const questionModel = require('../Models/Question');
const answerModel = require('../Models/Answer');
const userModel = require('../Models/User');
const categoryModel = require('../Models/Category');
const saveQuestionModel = require('../Models/saveQuestion');

const create = async (req, res) => {

    const { title, body, isAnswer, categoryID } = req.body

    const newQuestion = await questionModel.create({
        title, body, isAnswer, categoryID, creatorID: req.user._id
    })
    if (newQuestion) {
        res.status(201).json(newQuestion);
    }
}

const getOne = async (req, res) => {

    const { questionID } = req.params;

    const question = await questionModel.findOne({ _id: questionID }).populate('creatorID', 'fullname').lean();
    const answers = await answerModel.find({ questionID }).populate('creatorID').lean();


    question.answers = answers ? answers : [];

    res.status(200).json(question);

}

const getMainQestions = async (req, res) => {

    const mainQuestions = await questionModel.find().limit(30).populate('categoryID', 'title href style').populate('creatorID').lean();
    if (mainQuestions) {
        res.status(200).json(mainQuestions)
    }

}

const getAllQuestions = async (req, res) => {
    const questions = await questionModel.find().limit(100).populate('categoryID', 'title href style').populate('creatorID').lean();
    if (questions) {
        res.status(200).json(questions)
    }
}

const remove = async (req, res) => {

}

const getByAdmin = async (req, res) => {

}

const answer = async (req, res) => {
    const { body, questionID } = req.body
    await questionModel.findOneAndUpdate({ _id: questionID }, { isAnswer: 1, $inc: { answerCount: +1 } })
    await userModel.findOneAndUpdate({ _id: req.user._id }, { $inc: { score: +1 } })
    let setAnswer = await answerModel.create({ body, questionID, creatorID: req.user._id });
    if (setAnswer) {
        setAnswer = setAnswer.toObject();
        setAnswer.creatorID = req.user
        res.status(201).json(setAnswer);
    }
}

const getQuestionsByCategory = async (req, res) => {
    const { href } = req.params;
    const category = await categoryModel.findOne({ href }).lean();
    const questions = await questionModel.find({ categoryID: category._id }).populate('categoryID').lean()

    category.questions = questions;

    res.status(200).json(category);
}

const saveQuestion = async (req, res) => {
    const { questionID } = req.body
    const saveQuestion = await saveQuestionModel.create({ questionID, userID: req.user._id })
    if (saveQuestion) {
        res.status(201).json(saveQuestion);
    }
}

module.exports = {
    create,
    getOne,
    getMainQestions,
    remove,
    getByAdmin,
    answer,
    getAllQuestions,
    getQuestionsByCategory,
    saveQuestion
}