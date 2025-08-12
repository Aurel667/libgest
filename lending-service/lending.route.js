const express = require('express')
const router = express.Router()
const lendingController = require('./lending.controller')
const {admin, auth} = require('./middleware')

router.post('/', auth, lendingController.createLending)
router.get('/', admin, lendingController.getAllLendings)
router.get('/my', auth, lendingController.getMyLendings)
router.get('/:id', auth, lendingController.getLendingById)
router.put('/:id', admin, lendingController.updateLending)
router.put('/:id/return', auth, lendingController.returnLending)
router.delete('/:id', admin, lendingController.deleteLending)

module.exports = router