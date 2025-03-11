const express = require('express');
const problemController = require('../controllers/Problem.js');

const router = express.Router();

 router.post('/problems', problemController.createProblem);

router.get('/problems/:id', problemController.getProblemById);

router.get('/problems', problemController.getAllProblems);

router.get('/problems/:topic', problemController.getProblemByTopic);

router.put('/problems/:id', problemController.updateProblem);

router.delete('/problems/:id', problemController.deleteProblem);

router.put('/problems/add-testcases/:id', problemController.addTestCase);

router.delete('/problems/delete-testcases/:id', problemController.deleteTestCase);


module.exports = router;
