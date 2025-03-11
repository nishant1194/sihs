const Solution = require('../models/Solution.module.js');

 exports.createSolution = async (req, res) => {

  try {
    const solution = await Solution.create(req.body) ;
    console.log(req.body)
     res.status(201).json({
      message: "Solution created successfully",
      data: solution
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating problem",
      error: err.message
    });
  }
};

//get by problemId
exports.getSolutionByproblemId = async (req, res) => {
  try {
    const solution = await Solution.find({problemId:req.params.id}).populate("problemId").populate("uploadedBy") ;
    if (!solution) {
      return res.status(404).json({ message: "Solution not found" });
    }
    res.status(200).json(solution);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching solution",
      error: err.message
    });
  }
};


// get sol by uploader

exports.getSolutionByuploadedBy = async (req, res) => {
    try {
      const solution = await Solution.find({uploadedBy:req.params.uploadedBy});
      if (!solution) {
        return res.status(404).json({ message: "Solution not found" });
      }
      res.status(200).json(solution);
    } catch (err) {
      res.status(500).json({
        message: "Error fetching solution",
        error: err.message
      });
    }
  };

// Controller to delete a solution by ID
exports.deleteSolution = async (req, res) => {
    try {
      const solution = await Solution.findByIdAndDelete(req.params.id);
      if (!solution) {
        return res.status(404).json({ message: "solution not found" });
      }
      res.status(200).json({ message: "solution deleted successfully" });
    } catch (err) {
      res.status(500).json({
        message: "Error deleting problem",
        error: err.message
      });
    }
  };

