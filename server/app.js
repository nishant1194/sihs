const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const ProblemR = require('./routes/ProblemR.js');
const Jdoodle  = require('./utils/Jdoodle.js');
const SolutionR = require('./routes/SolutionR.js');
const SubmissionR = require('./routes/SubmissionR.js');
const User = require('./routes/User.js');
const connectDb = require('./utils/dbConnect.js');



const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());  

connectDb();

 
 app.use('/api', Jdoodle);   
 app.use('/api/v1', ProblemR);   
 app.use('/api/v1', SolutionR);   
 app.use('/api/v1', SubmissionR);   
 app.use('/api/v1', User);   

 module.exports = app ;

