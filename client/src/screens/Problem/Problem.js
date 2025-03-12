import React, { useState,useEffect } from "react";
import styles from "./problem.module.css";
import { Editor } from "@monaco-editor/react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios"
import Button from '@mui/material/Button';
import Linkk from "../../utils/Link";

export default function Problem(props) {
  const [selectedValue, setSelectedValue] = useState("java");

  useEffect(() => {
    console.log(selectedValue);
    if (selectedValue === "java") {
      setDefcodee(defCode);
      setCode(defCode);  
    } else if (selectedValue === "python3") {
      setDefcodee(defCodePy);
      setCode(defCodePy);
    }
  }, [selectedValue]);
 
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);

  };  


  const[output , setOutput] = useState();
  const defCode = `
  import java.util.*;
    public class Main{
    public static int[] twoSum(int[]nums , int target){
      
        // write your code here
       
    }
    public static void main(String[] args) {
       int[] nums1 = {2,7,11,15}  ;
       int target1 = 9 ;
       int[] output1 = {0,1};    
       int[] nums2 = {3,2,4} ;
       int target2 = 6 ;
       int[] output2 = {1,2};  
       int[] nums3 = {3,3}  ;
       int target3 = 6 ;
       int[] output3 = {0,1};  
       
       Boolean success = Arrays.equals(twoSum(nums1,target1) ,output1 ) &&Arrays.equals(twoSum(nums2,target2) ,output2 )&&Arrays.equals(twoSum(nums3,target3) ,output3 );
       if(success==true){ 
       System.out.print("Code run successfully");
       return;
       }
        System.out.print(success);
    }
    }
`
const defCodePy=`
def two_sum(nums, target):
    # Create a dictionary to store the number and its index
    num_map = {}

    for i, num in enumerate(nums):
        complement = target - num  # Calculate the complement

        # Check if the complement is already in the dictionary
        if complement in num_map:
            # If found, return the indices
            return [num_map[complement], i]

        # Otherwise, add the number and its index to the dictionary
        num_map[num] = i

    # Return an empty list if no solution is found
    return []

# Test cases
nums1 = [2, 7, 11, 15]
target1 = 9
output1 = [0, 1]

nums2 = [3, 2, 4]
target2 = 6
output2 = [1, 2]

nums3 = [3, 3]
target3 = 6
output3 = [0, 1]

# Check if the results are as expected
success = (two_sum(nums1, target1) == output1 and
           two_sum(nums2, target2) == output2 and
           two_sum(nums3, target3) == output3)

if success:
    print("Code ran successfully")
else:
    print("Test cases failed")

`


const [defCodee, setDefcodee] = useState("");

  const [success,setSucess] = useState(false) ;
  const [error, setError] = useState('');
  const [code, setCode] = useState(defCode);



  const submitHandler=async(code)=>{
    try {
      setError(''); // Clear previous errors
      const response = await axios.post(Linkk+'/api/execute', {
         code: code,
          language: selectedValue, 
      })
     console.log("haha");
     console.log("submitHandler"+code ) ;
     setOutput(response.data);
     console.log(output)
    console.log(response) ;

  } catch (err) {
      // Catch and handle errors
      if (axios.isAxiosError(err)) {
          // Handle axios-specific errors
          setError(`Axios error: ${err.response?.data?.message || err.message}`);
      } else {
          // Handle other errors
          setError(`Error: ${err.message}`);
      }
  }

  }
 

  function handleEditorChange(value, event) {
    setCode(value);
    console.log(code) ;

  }
 
  
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.ps}>
          {/* problem statment */}
          <h2>{props.problemStatement}</h2>
          <p>
            Given an array of integers nums and an integer target, returnindices
            of the two numbers such that they add up to target. You may assume
            that each input would have exactly one solution, and you may not use
            thesame element twice. You can return the answer in any order.You
            can return the answer in any order.
          </p>
          {/* examples */}
          <div>
            <div>
              <h3>Example 1:</h3>
              <div className={styles.exaplemDiv}>
                <div className={styles.inputLine}>
                  <span>Input</span>{" "}
                  <span>nums = [2,7,11,15], target = 9 </span>
                </div>
                <div className={styles.inputLine}>
                  <span>Output:</span> <span>[0,1]</span>
                </div>
                <div className={styles.inputLine}>
                  <span>Explanation:</span>{" "}
                  <span>Because nums[0] + nums[1] == 9, we return [0, 1].</span>
                </div>
              </div>
            </div>
            <div>
              <h3>Example 1:</h3>
              <div className={styles.exaplemDiv}>
                <div className={styles.inputLine}>
                  <span>Input</span>{" "}
                  <span>nums = [2,7,11,15], target = 9 </span>
                </div>
                <div className={styles.inputLine}>
                  <span>Output:</span> <span>[0,1]</span>
                </div>
                <div className={styles.inputLine}>
                  <span>Explanation:</span>{" "}
                  <span>Because nums[0] + nums[1] == 9, we return [0, 1].</span>
                </div>
              </div>
            </div>
          </div>
          {/* constraints */}
          <div>
            <h3>Constraints</h3>
            <div> "2 = nums.length = 104 "</div>
            <div> "2 = nums.length = 104 "</div>
            <div> "2 = nums.length = 104 "</div>
          </div>
        </div>
        <div className={styles.codeEditor}>
        <Editor
            height="70vh"
            defaultLanguage={selectedValue}
            value={defCodee}
            onChange={handleEditorChange}
          />
            <Button variant="contained" color="success" onClick={()=>{submitHandler(code)}}>
             Submit
           </Button>
           <div><label htmlFor="dropdown">Choose an option:</label>
      <select id="dropdown" value={selectedValue} onChange={handleSelectChange}>
        <option value="">Choose Language</option>
        <option value="java">Java</option>
        <option value="C">C</option>
        <option value="python3">Python</option>
      </select></div>
          
         <div className={styles.cons}>
          Remarks
          <div className={styles.console}>
          {output?.output ? output.output : "write code"}

          </div>
           
         </div>
        </div>
      </div>
    </div>
  );
}

