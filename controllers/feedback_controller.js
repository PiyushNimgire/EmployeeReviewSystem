const Employee = require('../models/employee');
const Review = require('../models/review');
const Feedback = require('../models/feedback');

module.exports.feedbackListPage = async (req, res) => {
    const reviews = await Review.find({assignedTo: res.locals.user.id})
    return res.render('feedback_list_page', {
        title: 'Performance review needing feedback',
        reviews: reviews
    })
}

module.exports.feedbackPage = async (req, res) => {
    const review = await Review.findById(req.params.id);
    const user = res.locals.user;
    const employee = await Employee.findById(review.user);
    const feedback = await Feedback.findOne({performanceReviewId: req.params.id, feedbackBy: employee.id});
    return res.render('feedback_page', {
        title: 'Feedback Page',
        review: review,
        employee: employee,
        feedback: feedback,
        user: user
    })
}

module.exports.feedback = async (req, res) => {
    await Feedback.create(req.body);
    return res.redirect('/feedback/feedback-list-page');
}