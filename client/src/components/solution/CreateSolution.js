import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Editor from '@monaco-editor/react';

import {
  Button,
  TextField,
  Box,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import CodeEditor from "../codeEditor/CodeEditor";
 
export default function CreateSolution(props) {
  const { id } = useParams();

  // Quill editor configuration
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  // State for form inputs
  const [psol, setPsol] = useState({
    problemId: id,
    uploadedBy: localStorage.getItem('userIdleetcode'), // Example user ID
    approach: "",
    language: "",
    code: "//write code here",
  });

  // Submit solution to the server
  const addSol = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5006/api/v1/solution",
        psol
      );
      console.log(psol)
      console.log(response.data);
      alert("Solution created successfully!");
     } catch (error) {
      console.error(error);
      alert("Failed to create solution. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      {/* Page Title */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Add a Solution
      </Typography>

      {/* Programming Language Input */}
      <Box sx={{ width: "100%", maxWidth: 800, marginBottom: 3 }}>
        <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
          Programming Language
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={psol.language}
          onChange={(e) => setPsol({ ...psol, language: e.target.value })}
          placeholder="Enter programming language (e.g., Python, Java)"
        />
      </Box>

      {/* Approach Input */}
      <Box sx={{ width: "100%", maxWidth: 800, marginBottom: 3 }}>
        <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
          Approach
        </Typography>
        <ReactQuill
          theme="snow"
          value={psol.approach}
          onChange={(value) => setPsol({ ...psol, approach: value })}
          modules={modules}
          placeholder="Describe your approach in detail..."
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </Box>

      {/* Solution Code Input */}
      <Box sx={{ width: "100%", maxWidth: 800, marginBottom: 3 }}>
        <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
          Solution Code
        </Typography>
        <Editor
            height="40vh"
            defaultLanguage="java"
            value={psol.code}
            onChange={value=>setPsol({...psol,code:value})}
          />       
         
      </Box>

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={addSol}
        sx={{
          maxWidth: 800,
          width: "100%",
          padding: "12px 0",
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        Add Solution
      </Button>
    </Box>
  );
}
