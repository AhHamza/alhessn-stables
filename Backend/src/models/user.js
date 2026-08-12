const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


userSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email })
    if (!user) {
        throw new Error('user not found')
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
        throw new Error('invalid password')
    }
    return user
}

userSchema.methods.generateAuthToken = function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString(), createdAt: Date.now() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    return token
}

//called implicitely when I send a response i.e( res.send(user))
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.pre('save', async function () {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8) //we rehash when(registering new user, updating password), we skip when logining in (isModified('password')=false)
    }
})


const User = mongoose.model('User', userSchema)

module.exports = User

