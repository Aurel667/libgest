const Lending = require('./lending.model')

exports.createLending = async (req, res) => {
    try {
        const lending = new Lending({...req.body, userId: req.user.id})
        await lending.save()
        res.status(201).json(lending)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getAllLendings = async (req, res) => {
    try {
        const lendings = await Lending.find()
        res.status(200).json(lendings)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getMyLendings = async (req, res) => {
    try {
        const lendings = await Lending.find({ userId: req.user.id })
        res.status(200).json(lendings)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getLendingById = async (req, res) => {
    try {
        const lending = await Lending.findById(req.params.id)
        if (!lending) {
            return res.status(404).json({ error: 'Lending not found' })
        }
        res.status(200).json(lending)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.updateLending = async (req, res) => {
    try {
        const lending = await Lending.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!lending) {
            return res.status(404).json({ error: 'Lending not found' })
        }
        res.status(200).json(lending)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deleteLending = async (req, res) => {
    try {
        const lending = await Lending.findByIdAndDelete(req.params.id)
        if (!lending) {
            return res.status(404).json({ error: 'Lending not found' })
        }
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.returnLending = async (req, res) => {
    try {
        const lending = await Lending.findById(req.params.id)
        if (!lending) {
            return res.status(404).json({ error: 'Lending not found' })
        }
        const isOwner = lending.userId?.toString() === req.user.id
        const isAdmin = req.user.role === 'admin'
        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: 'Forbidden' })
        }
        await Lending.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Book returned' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}