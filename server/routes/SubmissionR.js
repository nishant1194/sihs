const express = require('express');
const submissionController = require('../controllers/Submission.js');

const router = express.Router();

 router.post('/submission', submissionController.createSubmission);

router.get('/submission/problem/:id/:userid', submissionController.getSubmissionByproblemId);

router.get('/submission/user/:id', submissionController.getSubmissionByuploadedBy);
 
module.exports = router;
