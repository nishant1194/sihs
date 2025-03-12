import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import Solutions from "../../components/psSolution/PsSolution";
import Login from "../login/Login";
import Profile from "../profile/Profile";
import Linkk from "../../utils/Link";

export default function HomeScreen() {
  const [prb, setPrb] = useState([]);

  useEffect(() => {
    getProblem();
  }, []);

  const getProblem = async () => {
    try {
      const resp = await axios.get(Linkk+"/api/v1/problems");
      setPrb(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  const delProblem = async (id) => {
    try {
      await axios.delete(Linkk+`/api/v1/problems/${id}`);
      setPrb(prb.filter((problem) => problem._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    {/* <Profile/> */}
     <Navbar />
    <div className="bg-gray-100 min-h-screen p-6 flex flex-col items-center">
      <motion.h1
        className="text-4xl font-bold text-blue-600 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to NeetCode
      </motion.h1>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <motion.h2
            className="text-2xl font-semibold text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Problem Statements
          </motion.h2>
          <Link to="create-problem">
            <Button variant="contained" color="success">
              Add PS
            </Button>
          </Link>
        </div>
        <div>
          {prb?.map((data, idx) => (
            <motion.div
              key={data._id}
              className="flex justify-between items-center bg-gray-200 p-4 rounded-md mb-3 shadow-sm hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <Link
                to={`/problem/${data._id}`}
                className="text-lg text-blue-700 hover:text-blue-900 transition-colors"
              >
                <span>{data.problemId}. </span>
                <span>{data.problemStatement}</span>
              </Link>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => delProblem(data._id)}
              >
                Delete
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
