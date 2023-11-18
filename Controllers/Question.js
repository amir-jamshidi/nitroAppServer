const questionModel = require('../Models/Question');

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

}

const get = async (req, res) => {

}

const remove = async (req, res) => {

}

const getByAdmin = async (req, res) => {

}

const answer = async (req, res) => {

}

module.exports = {
    create,
    getOne,
    get,
    remove,
    getByAdmin,
    answer
}