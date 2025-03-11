const express = require('express');
const solutionController = require('../controllers/Solution.js');

const router = express.Router();

router.post('/solution', solutionController.createSolution);

router.get('/solution/problem/:id', solutionController.getSolutionByproblemId);

router.get('/solution/user/:id', solutionController.getSolutionByuploadedBy);
 
router.delete('/solution/:id', solutionController.deleteSolution);
 

module.exports = router;
