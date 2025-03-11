import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import { Editor } from "@monaco-editor/react";
export default function Ai() {
  
  const [copied, setCopied] = useState(false);
  const textToCopy ="This is the text you can copy by clicking the button below.";

  const query = new URLSearchParams(window.location.search);
  const code = query.get("code");
  const decodedCode = decodeURIComponent(code);
  const formattedCode = decodedCode
  .replace(/{/g, ' {\n\t')  // Open brace with newline and tab
  .replace(/}/g, '\n}\n')    // Close brace with newline
  .replace(/;/g, ';\n\t')    // Semi-colon with newline and tab
 console.log(formattedCode)
 
  const [inputValue, setInputValue] = useState(formattedCode || "");
  const [langg, setLangg] = useState("c++");
  const [response, setResponse] = useState("");

  // Initialize the Generative AI API
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDeGzP4YMJ-NjTcoxglTx4Ynv7Y5M_808E"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const getResponseForGivenPrompt = async () => {
    try {
      const result = await model.generateContent(
        "Hey! you are very good in convert function of code from one laguage to other. Identify the code given below and convert it into" +
          langg +
          ". Donot change the function name and return only the function as input function given. The input function is" +
          inputValue
      );
      const text = await result.response.text();
      setResponse(text);
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };
  const copyText = () => {
    navigator.clipboard
      .writeText(response)
      .then(() => {
        setCopied(true);
        alert("copied");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* <textarea
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Ask me something"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontFamily: "monospace", // Optional: For better code formatting
          whiteSpace: "pre-wrap", // Keeps line breaks and spaces intact
          overflowWrap: "break-word" // Handles long lines correctly

        }}

      /> */}
     <Editor
       height="50vh"
       defaultLanguage="java"
        value={inputValue}
        onChange={handleInputChange}
        />
      <button
        onClick={getResponseForGivenPrompt}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Convert code
      </button>
      <div>Code in C++</div>

      <div className="flex ">
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            background: "#f9f9f9",
          }}
        >
          {response ? (
             <div
             className=""
             dangerouslySetInnerHTML={{
               __html: response?.replace(/\n/g, "<br />"),
             }}
           />
          ) : (
            <p>No response yet.</p>
          )}
        </div>
        <button
          onClick={copyText}
          style={{
            padding: "10px 15px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Copy
        </button>
      </div>
    </div>
  );
}

 