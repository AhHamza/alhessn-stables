const express = require('express')
const router = new express.Router()
const Inquiry = require('../models/inquiry')
const auth = require('../middleware/auth')

// PUBLIC: Submit an inquiry
router.post('/inquiries', async (req, res) => {
    const inquiry = new Inquiry(req.body)
    try {
        await inquiry.save()
        res.status(201).send(inquiry)
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

// ADMIN: Get all inquiries
router.get('/inquiries', auth, async (req, res) => {
    try {
        const { type, status } = req.query
        const filter = {}
        if (type) filter.type = type
        if (status) filter.status = status

        const inquiries = await Inquiry.find(filter)
            .populate('horse', 'name breed')
            .sort({ createdAt: -1 })
        res.send(inquiries)
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

// ADMIN: Get single inquiry
router.get('/inquiries/:id', auth, async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id).populate('horse', 'name breed')
        if (!inquiry) return res.status(404).send({ error: 'Inquiry not found' })
        res.send(inquiry)
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

// ADMIN: Update inquiry status
router.patch('/inquiries/:id', auth, async (req, res) => {
    const allowedUpdates = ['status']
    const updates = Object.keys(req.body)
    const isValid = updates.every(u => allowedUpdates.includes(u))
    if (!isValid) return res.status(400).send({ error: 'Invalid update fields' })

    try {
        const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!inquiry) return res.status(404).send({ error: 'Inquiry not found' })
        res.send(inquiry)
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

// ADMIN: Delete inquiry
router.delete('/inquiries/:id', auth, async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndDelete(req.params.id)
        if (!inquiry) return res.status(404).send({ error: 'Inquiry not found' })
        res.send(inquiry)
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

module.exports = router