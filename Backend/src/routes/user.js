const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const userRouter = new express.Router()
//sign up
userRouter.post('/user', async (req, res) => {
    console.log(req.body);
    try {
        const user = new User(req.body)
        await user.save()
        res.status(200).send(user)
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: e.message })
    }
})


userRouter.post('/user/login', async (req, res) => {
    console.log(process.env.JWT_SECRET);

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        await user.save()
        res.status(200).send({ user, token })

    } catch (e) {
        res.status(400).send({ error: e.message })
    }

})

//logout one device
userRouter.delete('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = ((req.user.tokens || []).filter((t) => t.token !== req.token))
        await req.user.save()
        res.status(200).send({ message: 'logged out from current device' })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

//logout all devices
userRouter.delete('/user/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send({ message: 'logged out from all devices' })
    } catch (e) {
        res.status(500).send({ error: message })
    }
})

userRouter.get('/user/me', auth, async (req, res) => {
    res.send(req.user)
})

module.exports = userRouter