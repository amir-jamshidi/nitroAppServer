const jwt = require('jsonwebtoken');
const userModel = require('../Models/User');

const isLoginUser = async (req, res, next) => {

    const bearerToken = req.headers.authorization?.split(' ');

    if (bearerToken?.length !== 2) {
        return res.status(403).json({ message: 'This Route Is Protected' });
    } 

    const token = bearerToken[1];
    
    try {
        const decodeToekn = jwt.verify(token, process.env.JWTSECRET);
        const userTarget = await userModel.findOne({ _id: decodeToekn.id }).lean()
        req.user = userTarget;
        next();
    } catch (error) {
        return res.status(402).json({
            JWTError: error
        })
    }
}
module.exports = isLoginUser
