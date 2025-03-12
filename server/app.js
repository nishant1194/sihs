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

app.use(cors({
    origin: '*',
    credentials: true
  }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware
app.use(bodyParser.json());
connectDb();

 
 app.use('/api', Jdoodle);   
 app.use('/api/v1', ProblemR);   
 app.use('/api/v1', SolutionR);   
 app.use('/api/v1', SubmissionR);   
 app.use('/api/v1', User); 
 
 app.get('*',(req,res,next)=>{
    res.status(200).json({
      message:'received request'
    })
  })
  

 module.exports = app ;

