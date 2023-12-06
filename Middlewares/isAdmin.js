const isAdmin = async (req, res, next) => {

    const role = req.user.role;
    if (role === 'ADMIN') {
        return next();
    } else {
        return res.status(403).json({
            message: "This Route Access For Admins Only"
        })
    }
}
module.exports = isAdmin;
