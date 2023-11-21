const categoryModel = require('.././Models/Category');

const create = async (req, res) => {

    const { title, href } = req.body;
    const newCategory = await categoryModel.create({ title, href });
    if (newCategory) {
        res.status(201).json({
            message: 'success',
            status: 1
        })
    } else {
        res.status(400).json({
            message: 'error',
            status: 101
        })
    }
}

const getMainCategories = async (req, res) => {

    const categories = await categoryModel.find().limit(20).lean();
    return res.status(200).json(categories);
}

const remove = async (req, res) => {

}
const getAll = async (req, res) => {
    const categories = await categoryModel.find().lean();
    return res.status(200).json(categories);
}

module.exports = {
    create,
    getMainCategories,
    remove,
    getAll
}