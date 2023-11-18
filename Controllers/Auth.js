const userModel = require('../Models/User');
const preUserModel = require('../Models/PreUser');
const jwt = require('jsonwebtoken');
const codeGenerator = require('../Utils/codeGenerator');

const register = async (req, res) => {
    const { phone } = req.body;

    // Check Exist Phone
    const isExist = await userModel.findOne({ phone }).lean();
    if (isExist) {
        return res.status(400).json({
            message: 'Phone Is Already',
            code: 102
        });
    }

    // Create User
    const code = codeGenerator();
    const isHasCode = await preUserModel.findOne({ phone }).lean();
    let newUser = null;
    if (isHasCode) {
        newUser = await preUserModel.findOneAndUpdate({ phone, code });
    } else {
        newUser = await preUserModel.create({ phone, code });
    }
    if (newUser) {
        return res.status(201).json({
            message: 'Send Code Success',
            status: 1
        })
    }
}

const login = async (req, res) => {
    const { phone } = req.body;

    //Check Exist User
    const isHasUser = await userModel.findOne({ phone }).lean();
    if (!isHasUser) {
        return res.status(400).json({
            message: 'User Not Found',
            status: 101
        });
    }

    //Start Login
    const code = codeGenerator();

    const isHasCode = await preUserModel.findOne({ phone }).lean();

    let newUser = null;
    if (isHasCode) {
        newUser = await preUserModel.findOneAndUpdate({ phone, code });
    } else {
        newUser = await preUserModel.create({ phone, code });
    }
    if (newUser) {
        return res.status(201).json({
            message: 'Send Code Success',
            status: 1
        })
    }
}

const getMe = async (req, res) => {
    res.status(200).json({ userInfo: req.user });
}

const confirmUser = async (req, res) => {

    const { phone, code } = req.body;

    // Verify Code
    const verifyUser = await preUserModel.findOneAndDelete({ phone, code });

    if (verifyUser) {

        const isHasUser = await userModel.findOne({ phone }).lean();
        if (isHasUser) {
            const accessToken = jwt.sign({ id: isHasUser._id }, process.env.JWTSECRET, { expiresIn: '10day' })
            return res.status(201).json({
                token: accessToken,
                userInfo: isHasUser
            })
        } else {
            //Register
            const usersCount = await userModel.find().countDocuments().lean();
            const newUser = await userModel.create({ phone, role: usersCount === 0 ? 'ADMIN' : 'USER' })
            const accessToken = jwt.sign({ id: newUser._id }, process.env.JWTSECRET, { expiresIn: '10day' })
            return res.status(201).json({
                token: accessToken,
                userInfo: newUser
            })
        }
    } else {
        return res.status(400).json({
            message: "The Code Is Wrong",
            status: 101
        })
    }
}


module.exports = {
    getMe,
    login,
    register,
    confirmUser
}