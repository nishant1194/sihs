import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
import Button from "@mui/material/Button";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./p4.module.css";
import PSandD from "../../components/ProbStatement/PSandD";
import PsSolution from "../../components/psSolution/PsSolution";
import Submissions from "../../components/submissions/Submissions";
import Linkk from "../../utils/Link";

export default function App() {
  const headerCode = {
    java: `import java.util.HashMap; import java.util.*;`,
    cpp: `#include <bits/stdc++.h> using namespace std;`,
  };

  const { id } = useParams();
  const [selectedValue, setSelectedValue] = useState("java");
  const [prb, setPrb] = useState();
  const [userCode, setUserCode] = useState("");
  const [defuserCode, defsetUserCode] = useState("");
  const [driverCode, setDriverCode] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [input, setInput] = useState("");
  const [hardtestCases, sethardtestCases] = useState([]);
  const [width, setWidth] = useState(50); // Default width for left panel (Problem Statement)

  const [encodedCode,setEncodedCode] = useState("");

  useEffect(() => {
    getProblem();
  }, []);

  const getProblem = async () => {
    try {
      const resp = await axios.get(
        Linkk+`/api/v1/problems/${id}`
      );
      
      setPrb(resp.data);
      setUserCode(resp.data.defaultCode);
      defsetUserCode(resp.data.defaultCode?.javaDefaultCode);
      setDriverCode(resp.data.DriverCode);
      sethardtestCases(resp.data.testcases);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  }; 

  const handleEditorChange = (value) => {
    defsetUserCode(value);
    setEncodedCode(encodeURIComponent(value)) ;
  };

  const RunCode = async () => {
    const testCasesCount = testCases.length;
    const hiddenDriverCode = await driverCode[
      selectedValue + "DriverCode"
    ].replace(/{{TEST_CASES_COUNT}}/g, testCasesCount);
    const hiddenCodeLinesCount = hiddenDriverCode.split("\n").length;
    const fullCode =
      headerCode[selectedValue] + defuserCode + "\n" + hiddenDriverCode;
    try {
      const response = await axios.post(Linkk+"/api/execute", {
        code: fullCode,
        language: selectedValue,
        stdin: testCases,
      });
      if (response.data.output) {
        setOutput(response.data.output);
        setError("");
      }
    } catch (err) {
      const apiError = err.response?.data?.error || err.message;
      const adjustedError = adjustErrorLineNumbers(
        apiError,
        hiddenCodeLinesCount
      );
      setError(adjustedError);
    }
  };

  const submitCode = async () => {
    const testCasesCount = hardtestCases.length;
    const hiddenDriverCode = await driverCode[
      selectedValue + "DriverCode"
    ].replace(/{{TEST_CASES_COUNT}}/g, testCasesCount);
    const hiddenCodeLinesCount = hiddenDriverCode.split("\n").length;
    const fullCode = headerCode[selectedValue] + defuserCode + "\n" + hiddenDriverCode;
    try {
      const response = await axios.post(Linkk+"/api/execute", {
        code: fullCode,
        language: selectedValue,
        stdin: hardtestCases,
      });
      console.log(response);
      if (response.data.output) {
        setOutput(response.data.output);
        setError("");
      }
    } catch (err) {
      const apiError = err.response?.data?.error || err.message;
      const adjustedError = adjustErrorLineNumbers(
        apiError,
        hiddenCodeLinesCount
      );
      setError(adjustedError);
    }

    if(localStorage.getItem("userIdleetcode")){
      try {
        const resp = await axios.post(Linkk+"/submission" ,{
          uploadedBy:localStorage.getItem("userIdleetcode"),
          problemId:id,
          status:"Attempted",
          code:defuserCode ,
        })
        console.log(resp.data);
      } catch (error) {
        console.log(error)
      }
    }
  };

  const adjustErrorLineNumbers = (apiError, hiddenLines) => {
    const lineErrorRegex = /line (\d+)/g;
    let match;
    let adjustedError = apiError;

    while ((match = lineErrorRegex.exec(apiError)) !== null) {
      const originalLineNumber = parseInt(match[1], 10);
      const adjustedLineNumber = originalLineNumber - hiddenLines;
      adjustedError = adjustedError.replace(
        `line ${originalLineNumber}`,
        `line ${adjustedLineNumber}`
      );
    }

    return adjustedError;
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTestCases([...testCases, input.trim()]);
      setInput("");
    }
  };

   
  const [activeTab, setActiveTab] = useState("Description");

  const tabs = ["Description", "Solution", "My Submission", "Custom Test Cases"];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Description":
        return  <PSandD
        problemStatement={prb?.problemStatement}
        difficulty={prb?.difficulty}
        problemDesc={prb?.problemDesc}
        hint={prb?.hint}
        constraints={prb?.constraints}
        problemId={prb?.problemId}
       />;
      case "Solution":
        return <PsSolution />;
      case "My Submission":
        return <Submissions prbID={id}/>;
        case  "Custom Test Cases":
          return  <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Input Test Cases</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              rows="4"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter your test case (press Enter for new line)"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add Test Case
            </button>
          </form>
       <h3 className="text-lg font-semibold mt-4">Test Cases:</h3>
          <ul className="list-disc pl-5">
            {testCases.map((testCase, index) => (
              <li key={index} className="text-gray-600">
                {testCase}
              </li>
            ))}
          </ul>
          <button onClick={RunCode} className="px-4 py-2 bg-red-500 text-white rounded-1xl">
              Run
            </button>
           
        </div>

      default:
        return <div>Select a tab to view content.</div>;
    }
  };
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const handleSelection = (event) => {
    setSelectedLanguage(event.target.value);
    setDriverCode(driverCode[selectedLanguage])

};
  return (
    <>
      <Navbar />
      <div className="flex bg-white shadow-lg rounded-lg mt-6">
        {/* Problem Statement Section (Left Side) */}
        <div
          className="p-6 bg-gray-50 overflow-y-auto scrollbar-hide"
          style={{ width: '50%', height: '90vh' }}
        >
          <div className="text-2xl font-bold text-gray-800 mb-4">
            {prb?.problemId}. {prb?.problemStatement}
          </div>
  
          {/* Difficulty */}
          <div className="text-gray-600 mb-4">
            Difficulty: <span className="font-semibold">{prb?.difficulty || "Not specified"}</span>
          </div>
  
          {/* Tabs */}
          <div className="flex border-b border-gray-300">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500 hover:text-blue-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
  
          {/* Tab Content */}
          <div className="mt-4">{renderTabContent()}</div>
        </div>
  
        {/* Slider (Resizable Divider) */}
        <div className="cursor-col-resize bg-gray-300 w-2"></div>
  
        {/* Code Editor Section (Right Side) */}
        <div
          className="p-6 bg-gray-100 overflow-y-auto"
          style={{ width: `${100 - width}%`, height: "90vh" }}
        >
          <div className="text-lg font-semibold mb-4">Code Here</div>
          <div style={{  fontFamily: 'Arial, sans-serif' }}>
             <select
                value={selectedLanguage}
                onChange={handleSelection}
                style={{
                    padding: '9px',
                    fontSize: '16px',
                    marginBottom: '15px',
                }}
            >
                 <option value="Java">java</option>
                <option value="C++">cpp</option>
                <option value="C">C</option>
                <option value="JavaScript">JavaScript</option>
            </select>
             
        </div>
          <Editor
            height="50vh"
            defaultLanguage="java"
            value={userCode[selectedValue + "DefaultCode"]}
            onChange={handleEditorChange}
          />
          <div className="flex space-x-4 mt-6">
            <Button variant="contained" color="primary" onClick={submitCode}>
              Submit
            </Button>
            <Button variant="contained" color="primary">
              <Link to={`/ai?code=${encodedCode}`} className="text-white">
                Translate your Code
              </Link>
            </Button>
          </div>
  
          {/* Output Section */}
          {output && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Output:</h2>
              <pre className="bg-gray-100 p-4 rounded-md">{output}</pre>
            </div>
          )}
  
          {/* Error Section */}
          {error && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Error:</h2>
              <pre className="bg-red-100 p-4 rounded-md text-red-600">
                {error}
              </pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
  
}
