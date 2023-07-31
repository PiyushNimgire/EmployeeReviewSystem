const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        // type: [{
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: 'Employee'
        // }],
        required: true
    }
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;