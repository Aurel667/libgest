const express = require('express')
const router = express.Router()
const bookController = require('./book.controller')
const {admin, auth} = require('./middleware')

router.post('/', admin, bookController.createBook)
router.get('/', auth, bookController.getBooks)
router.get('/:id', auth, bookController.getBookById)
router.put('/:id', admin, bookController.updateBook)
router.delete('/:id', admin, bookController.deleteBook)

module.exports = router