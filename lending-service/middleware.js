const jwt = require('jsonwebtoken')

exports.admin = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
    if (!req.user || req.user.role !== "admin") {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        next()
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' })
    }
}


exports.auth = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        next()
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' })
    }
}