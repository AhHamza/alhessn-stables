const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {

    try {
        const authHeader = req.header('Authorization')
        if (!authHeader) {
            throw new Error('No token provided')
        }
        const token = authHeader.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })//The _id part is almost redundant — the real check is tokens.token, because:If the user logged out → that token was removed from the array → findOne returns null → rejected
        if (!user) {
            throw new Error("please authenticate");
        }
        req.user = user
        req.token = token
        next()
    } catch (e) {
        res.status(401).send({ error: e.message })
    }
}

module.exports = auth