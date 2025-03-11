const Problem = require('../models/Problem.model.js');

 exports.createProblem = async (req, res) => {
   try {
    const problem = await Problem.create(req.body.pid) ;
    res.status(201).json({
      message: "Problem created successfully",
      data: problem
    });
   } catch (err) {
    res.status(500).json({
      message: "Error creating problem",
      error: err.message
    });
  }
};

exports.getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json(problem);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching problem",
      error: err.message
    });
  }
};

// get problemBy topic
exports.getProblemByTopic = async (req, res) => {
  try {
    const problem = await Problem.find({topics:req.params.topics});
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json(problem);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching problem",
      error: err.message
    });
  }
};

// Controller to get all problems
exports.getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json(problems);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching problems",
      error: err.message
    });
  }
};

// Controller to update a problem by ID
exports.updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(req.params.id, req.body);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json({
      message: "Problem updated successfully",
      data: problem
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating problem",
      error: err.message
    });
  }
};

// Controller to delete a problem by ID
exports.deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting problem",
      error: err.message
    });
  }
};

exports.addTestCase = async (req, res) => {
  const { problemId, testCase } = req.body; 

  try {
    // Find the problem by problemId and push the new test case
    const problem = await Problem.findOneAndUpdate(
      { problemId: problemId },  // Find the problem by its problemId
      { $push: { testcases: testCase } },  // Push the new test case
      { new: true, runValidators: true }  // Return the updated document and validate
    );

     if (!problem) {
      return res.status(404).json({ message: 'Problem not found.' });
    }

     return res.status(200).json({
      message: 'Test case added successfully.',
      problem: problem
    });
  } catch (error) {
     return res.status(500).json({
      message: 'Error adding test case.',
      error: error.message
    });
  }
};

exports.deleteTestCase = async (req, res) => {
  const { problemId, testCase } = req.body;   
  try {
    // Find the problem by problemId and remove the specific test case using $pull
    const problem = await Problem.findOneAndUpdate(
      { problemId: problemId },  // Find the problem by its problemId
      { $pull: { testcases: testCase } },  // Remove the specific test case from the array
      { new: true }  // Return the updated document
    );

    // If problem not found, send a 404 response
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found.' });
    }

     if (problem.testcases.includes(testCase)) {
      return res.status(400).json({ message: 'Test case not found in problem.' });
    }

      return res.status(200).json({
      message: 'Test case deleted successfully.',
      problem: problem
    });
  } catch (error) {
 
    return res.status(500).json({
      message: 'Error deleting test case.',
      error: error.message
    });
  }
};


