const questionModel = require('../Models/Question');
const answerModel = require('../Models/Answer');
const userModel = require('../Models/User');
const likeModel = require('../Models/Like');
const categoryModel = require('../Models/Category');
const saveQuestionModel = require('../Models/saveQuestion');
const { default: mongoose } = require('mongoose');

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

    if (!mongoose.Types.ObjectId.isValid(questionID)) {
        return res.status(404).json({ message: 'Question ID Not Valid' })
    }

    const question = await questionModel.findOne({ _id: questionID }).populate('creatorID', 'fullname avatar').populate('categoryID').lean();

    if (!question) {
        return res.status(404).json({ message: 'Not Found Question' })
    }


    const answers = await answerModel.find({ questionID }).populate('creatorID').lean();
    const likeCount = await likeModel.find({ questionID }).countDocuments().lean();

    let isSaveThis;
    if (req.user) {
        isSaveThis = await saveQuestionModel.findOne({ questionID, userID: req.user._id }).lean();
    }

    question.answers = answers ? answers : [];
    question.likeCount = likeCount
    question.isSaveThis = isSaveThis ? true : false




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
    if (!category) {
        return res.status(404).json({ message: 'Not Found Category' })
    }
    const questions = await questionModel.find({ categoryID: category._id }).populate('categoryID').populate('creatorID').lean()
    category.questions = questions;
    res.status(200).json(category);
}

const saveQuestion = async (req, res) => {
    const { questionID } = req.body


    const isSaveBefore = await saveQuestionModel.findOne({ questionID, userID: req.user._id });
    if (isSaveBefore) {
        await saveQuestionModel.findOneAndDelete({ questionID, userID: req.user._id });
        return res.status(202).json({ message: "unsive" })
    }

    const saveQuestion = await saveQuestionModel.create({ questionID, userID: req.user._id })
    if (saveQuestion) {
        res.status(201).json({ message: 'save' });
    }
}

const likeQuestion = async (req, res) => {
    const { answerID } = req.body

    const isLikeBefore = await likeModel.findOne({ userID: req.user._id, answerID });
    if (isLikeBefore) {
        const deleteLike = await likeModel.findOneAndDelete({ userID: req.user._id, answerID })
        const likeCount = await likeModel.find({ answerID: deleteLike.answerID }).countDocuments().lean();
        await answerModel.findOneAndUpdate({ _id: answerID }, { like: likeCount }).lean();
        return res.status(200).json({ message: 'like deleted' })
    }

    const newLike = await likeModel.create({ userID: req.user._id, answerID });
    if (newLike) {
        const likeCount = await likeModel.find({ answerID: newLike.answerID }).countDocuments().lean();
        await answerModel.findOneAndUpdate({ _id: answerID }, { like: likeCount }).lean();
        res.status(201).json({ message: 'Success Like' })
    }

}

const setTrueAnswer = async (req, res) => {

    const { answerID, questionID } = req.body;
    const isTrueAnswerBefore = await answerModel.findOne({ _id: answerID, questionID, isTrueAnswer: 1 }).lean();
    if (isTrueAnswerBefore) {
        return res.status(202).json({ message: 'The Answer Has True Answer' })
    }
    await questionModel.findOneAndUpdate({ creatorID: req.user._id, _id: questionID }, {
        isHasTrueAnswer: 1
    });
    await answerModel.findOneAndUpdate({ _id: answerID }, {
        isTrueAnswer: 1
    })

    res.status(201).json({ message: 'Set True Answer Success' });
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
    saveQuestion,
    likeQuestion,
    setTrueAnswer
}