const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    performanceReviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review',
        required: true
    },
    feedbackBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee',
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;