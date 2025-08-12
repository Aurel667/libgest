const mongoose = require('mongoose')

const lendingSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    bookId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Book',
        required : true
    },
    startDate : {
        type : Date,
        default : Date.now,
        required : true
    },
    endDate : {
        type : Date,
        required : true
    }
}, { timestamps: true })

lendingSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

lendingSchema.virtual('book', {
    ref: 'Book',
    localField: 'bookId',
    foreignField: '_id',
    justOne: true
});

lendingSchema.set('toObject', { virtuals: true });
lendingSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Lending', lendingSchema)