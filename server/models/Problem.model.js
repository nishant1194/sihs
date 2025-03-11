const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Add this line to define Schema


const problemSchema = new mongoose.Schema({
  problemId: { 
    type: Number,
    required: true,
    unique:true
   },
  problemStatement: { 
    type: String, 
    required: true 
  },
  problemDesc: { 
    type: String,
    required: true 
   },

   testcases: {
    type: [String],   
    validate: {
      validator: function(v) {
        return v.length >= 1;
      },
      message: 'A project must have at least one test case.'
    },
    required: true
  },
  difficulity:{
    type: String,
    required: true 
  },
 
  input1: { type: String },
  output1: { type: String },
  explanation1: { type: String },
  input2: { type: String },
  output2: { type: String },
  explanation2: { type: String },

  constraints: {
    type: [String],
  },

  topics: {
    type: String,
    required: true
  },

  DriverCode:{
    javaDriverCode:{
    type: String,
    required: true 
    },
    cDriverCode:{
    type: String,
    required: true 
    },
    cppDriverCode:{
    type: String,
    required: true 
    },
    pythonDriverCode:{
    type: String,
    required: true 
    },
    jsDriverCode:{
    type: String,
    required: true     
    }
  },
  hint:{
    type: String,
  },

  defaultCode:{
    javaDefaultCode:{
      type: String,
      required: true 
      },
      cDefaultCode:{
      type: String,
      required: true 
      },
      cppDefaultCode:{
      type: String,
      required: true 
      },
      pythonDefaultCode:{
      type: String,
      required: true 
      },
      jsDefaultCode:{
      type: String,
      required: true     
      }
    },
}
,  { timestamps: true }
);

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;
