const Submission = require('../models/Submission.module');

 exports.createSubmission = async (req, res) => {
  try {
    const submission = await Submission.create(req.body) ;
     res.status(201).json({
      message: "Submission created successfully",
      data: submission
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating submission",
      error: err.message
    });
  }
};

//get by problemId
exports.getSubmissionByproblemId = async (req, res) => {
  try {
    const submission = await Submission.find({problemId:req.params.id,
      uploadedBy:req.params.userid
    });
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.status(200).json(submission);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching Submission",
      error: err.message
    });
  }
};


 
exports.getSubmissionByuploadedBy = async (req, res) => {
    try {
      const submission = await Submission.find({uploadedBy:req.params.id}).populate("uploadedBy").populate("problemId");
      if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
      }
      res.status(200).json(submission);
    } catch (err) {
      res.status(500).json({
        message: "Error fetching Submission",
        error: err.message
      });
    }
  };
  