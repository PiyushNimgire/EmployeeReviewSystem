const express = require('express');
const router = express.Router();
const passport = require('passport');
const employeeController = require('../controllers/employees_controller');
const feedbackController = require('../controllers/feedback_controller');

router.get('/feedback-list-page', passport.checkAuthentication, feedbackController.feedbackListPage);
router.get('/:id', passport.checkAuthentication, feedbackController.feedbackPage);
router.post('/:id', passport.checkAuthentication, feedbackController.feedback);

module.exports = router;