const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {type : String, require: true},
    author: {type : String, require: true},
    description: {type : String, require: true},
    publishedDate: {type : Date, require: true}
}, { timestamps: true })

module.exports = mongoose.model('Book', bookSchema)

