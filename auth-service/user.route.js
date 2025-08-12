const express = require('express')
const router = express.Router()
const userController = require('./user.controller')
const { auth } = require('./auth.middleware')

router.post('/login', userController.login)
router.get('/me', auth, userController.getMe)
router.post('/register', userController.register)
router.post('/logout', userController.logout)

module.exports = router