import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Linkk from "../../utils/Link.js";

export default function Createps() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setMessage("Testcase Added");
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
     setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
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

  const [pid, setPid] = useState({
    problemId: "",
    problemStatement: "",
    problemDesc: "",
    testcases: [],
    difficulity: "",
    topics: "",
    DriverCode: {
      javaDriverCode: `public class Main {
    // Method in Main class to find combinations
    private static List<List<Integer>> findCombinations(int ind, int[] arr, int target, List<List<Integer>> ans, List<Integer> ds) {
        if (ind == arr.length) {
            if (target == 0) {
                ans.add(new ArrayList<>(ds));
            }
            return ans;
        }

        if (arr[ind] <= target) {
            ds.add(arr[ind]);
            findCombinations(ind, arr, target - arr[ind], ans, ds);
            ds.remove(ds.size() - 1);
        }
        return findCombinations(ind + 1, arr, target, ans, ds);
    }

    // Static method to return the result
    public static List<List<Integer>> solveInMain(int[] candidates, int target) {
        List<List<Integer>> ans = new ArrayList<>();
        findCombinations(0, candidates, target, ans, new ArrayList<>());
        return ans;
    }

    public static void main(String[] args) {
        // Scanner for input
        Scanner scanner = new Scanner(System.in);
        int ts = 0;
        
        while (ts < {{TEST_CASES_COUNT}}) {
            // Read number of elements in the array
            int n = scanner.nextInt();
            int[] nums = new int[n];
            for (int i = 0; i < n; i++) {
                nums[i] = scanner.nextInt();
            }
            // Read target value
            int target = scanner.nextInt();

            // Call the static solve method in Solution class
            List<List<Integer>> resultFromSolution = Solution.combinationSum(nums, target);
            // Call the static solve method in Main class
            List<List<Integer>> resultFromMain = solveInMain(nums, target);

            // Compare the results
            boolean areEqual = resultFromSolution.equals(resultFromMain);

            if (!areEqual) {
                System.out.println("Completed "+ (ts+1)+"/"+{{TEST_CASES_COUNT}} +" testcases");

                System.out.println("Wrong answer at testCase");
                System.out.println("nums: " + Arrays.toString(nums) +", target: " + target);
                System.out.println("Expected output: " + resultFromSolution);
                System.out.println("Your output: " + resultFromMain);
                break;
            } 
            ts++;
        }

        if (ts == {{TEST_CASES_COUNT}}) {
            System.out.println("You have passed "+ {{TEST_CASES_COUNT}}+"/"+{{TEST_CASES_COUNT}}+" test cases");
        }

        scanner.close(); // Close the scanner
        
    }
}`,
      cDriverCode: "hint",
      cppDriverCode: "hint",
      pythonDriverCode: "hint",
      jsDriverCode: "hint",
    },
    hint: "hint",
    defaultCode: {
      javaDefaultCode: `class Solution {
    public static List<List<Integer>> combinationSum(int[] candidates, int target) {
         
    }
}`,
      cDefaultCode: "cDefaultCode",
      cppDefaultCode: "cDefaultCode",
      pythonDefaultCode: "cDefaultCode",
      jsDefaultCode: "cDefaultCode",
    },
  });
  const [input, setInput] = useState("");

  const submitCode = async () => {
    try {
      const resp = await axios.post(Linkk+"/api/v1/problems", {
        pid,
      });
      console.log(resp);
      setMessage("Submission added successfully!");
      setOpen(true);
      window.location.reload();
      
    } catch (err) {
      console.log(err);
      console.log(err);
      setMessage("Error occurred during submission!");
      setOpen(true);

    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddInput = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setPid((prevPid) => ({
        ...prevPid,
        testcases: [...prevPid.testcases, input.trim()],
      }));
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create New Problem
        </h1>
        <div className="space-y-6">
          {/* Problem ID */}
          <div>
            <label className="block text-lg font-medium">Problem ID</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter problem ID"
              value={pid.problemId}
              onChange={(e) => setPid({ ...pid, problemId: e.target.value })}
            />
          </div>

          {/* Problem Statement */}
          <div>
            <label className="block text-lg font-medium">
              Problem Statement
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter problem statement"
              value={pid.problemStatement}
              onChange={(e) =>
                setPid({ ...pid, problemStatement: e.target.value })
              }
            />
          </div>

          {/* Problem Description */}
          <div>
            <label className="block text-lg font-medium">
              Problem Description
            </label>
            <ReactQuill
              className="bg-white rounded-lg"
              theme="snow"
              value={pid.problemDesc}
              onChange={(value) => setPid({ ...pid, problemDesc: value })}
              modules={modules}
              placeholder="Write your description"
            />
          </div>

          {/* Problem Difficulty */}
          <div>
            <label className="block text-lg font-medium">Difficulty</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter difficulty level"
              value={pid.difficulity}
              onChange={(e) => setPid({ ...pid, difficulity: e.target.value })}
            />
          </div>

          {/* Problem Topics */}
          <div>
            <label className="block text-lg font-medium">Topics</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter problem topics"
              value={pid.topics}
              onChange={(e) => setPid({ ...pid, topics: e.target.value })}
            />
          </div>

          {/* Java Driver Code */}
          <div>
            <label className="block text-lg font-medium">
              Driver Code (Java)
            </label>
            <textarea
              className="min-h-60 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter Java driver code"
              value={pid.DriverCode.javaDriverCode}
              onChange={(e) =>
                setPid({
                  ...pid,
                  DriverCode: {
                    ...pid.DriverCode,
                    javaDriverCode: e.target.value,
                  },
                })
              }
            />
          </div>

          {/* Default Code */}
          <div>
            <label className="block text-lg font-medium">
              Default Code (Java)
            </label>
            <textarea
              className="h-40 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter default code for Java"
              value={pid.defaultCode.javaDefaultCode}
              onChange={(e) =>
                setPid({
                  ...pid,
                  defaultCode: {
                    ...pid.defaultCode,
                    javaDefaultCode: e.target.value,
                  },
                })
              }
            />
          </div>

          {/* Test Cases */}
          <div>
            <label className="block text-lg font-medium">Test Cases</label>
            <form
              onSubmit={handleAddInput}
              className="flex items-center space-x-4"
            >
              <textarea
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                value={input}
                onChange={handleInputChange}
                placeholder="Enter test case (press Enter for new line)"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleClick}
              >
                Add
              </button>
              <div>
               
                <Snackbar
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  open={open}
                  autoHideDuration={1500}
                  onClose={handleClose}
                  message={message}
                  action={action}
                  key={"top" + "right"}
                />
              </div>
            </form>
            <ul className="mt-4 space-y-2">
              {pid?.testcases?.map((testCase, index) => (
                <li key={index} className="px-4 py-2 bg-gray-200 rounded-lg">
                      <div style={{ whiteSpace: "pre-wrap" }}>
                   {testCase}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              variant="contained"
              color="success"
              className="w-full px-4 py-2"
              onClick={submitCode}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
