const mongoose = require("mongoose");

const Schema = mongoose.Schema; // Add this line to define Schema

const solutionSchema = new mongoose.Schema({
  problemId: {
    type: Schema.Types.ObjectId,
    ref: "Problem",
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  approach: {
    type: String,
    require: true,
  },
  language: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
},
{ timestamps: true }
);

const Solution = mongoose.model("Solution", solutionSchema);
module.exports = Solution;
