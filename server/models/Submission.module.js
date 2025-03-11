const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Add this line to define Schema


const submissionSchema = new mongoose.Schema({
    code:{
        type:String,
        require:true
    },
    status:{
        type:String,
    },
    problemId:{
        type: Schema.Types.ObjectId,
        ref: "Problem"
    },
    uploadedBy:{
        type: Schema.Types.ObjectId,
       ref: "User"
   },

},
{ timestamps: true }
);

const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;
