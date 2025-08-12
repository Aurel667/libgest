const User = require('./user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { name, lastname, role, email, password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ name, lastname, role, email, password: hashedPassword })
        await user.save()
        const token = jwt.sign({ id: user._id, name: user.name, lastname: user.lastname, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
        res.status(201).json({ message: 'User registered successfully', user : {...user.toObject(), password : undefined} })
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' })
    }
}

exports.getMe = (req, res) => {
    res.status(200).json({ user: {...req.user.toObject(), password: undefined} })
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const token = jwt.sign({ id: user._id, name: user.name, lastname: user.lastname, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
        res.status(200).json({ message: 'Login successful', user : {...user.toObject(), password: undefined} })
    } catch (error) {
        res.status(500).json({ error: 'Error logging in user' })
    }
}

exports.logout = (req, res) => {
    res.clearCookie('token')
    res.status(200).json({ message: 'Logout successful' })
}