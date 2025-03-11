const mongoose = require('mongoose');

const connectDb=async()=>{

    try{
        await  mongoose.connect("mongodb+srv://nishantkumar32435:leetCode123@cluster0l.ov2s8.mongodb.net/");
        console.log("Connected with db");
    } catch(err){
        console.log("Error is connecting with mongo " + err);
    }
}
module.exports = connectDb;