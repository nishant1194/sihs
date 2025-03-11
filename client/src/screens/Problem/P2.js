import React, { useState } from "react";
import styles from "./problem.module.css";
import { Editor } from "@monaco-editor/react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios"
import Button from '@mui/material/Button';

export default function P2(props) {
  const[output , setOutput] = useState();
  const defCode = `
  import java.util.*;
    public class Main{
    public static int reverseInt(int[]nums , int target){
      
        // write your code here
       
    }
    public static void main(String[] args) {
       int x1=123  ;
       
       int output1 = 321;    
       int x2=-123  ;
       
       int output2 = -321;  
      
       
       Boolean success = ((reverseInt(x1)==output1)&&(reverseInt(x2)==output2));
       if(success==true){ 
       System.out.print("Code run successfully");
       return;
       }
        System.out.print(success);
    }
    }
`
  const [success,setSucess] = useState(false) ;
  const [error, setError] = useState('');
  const [code, setCode] = useState(defCode);



  const submitHandler=async(code)=>{
    try {
      setError(''); // Clear previous errors
      const response = await axios.post('http://localhost:5006/api/execute', {
         code: code,
          language: "java", 
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
          <h2>Reverse Integer</h2>
          <p>
          Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
Assume the environment does not allow you to store 64-bit integers (signed or unsigned).,

          </p>
          {/* examples */}
          <div>
            <div>
              <h3>Example 1:</h3>
              <div className={styles.exaplemDiv}>
                <div className={styles.inputLine}>
                  <span>Input</span>{" "}
                  <span>x = 123 </span>
                </div>
                <div className={styles.inputLine}>
                  <span>Output:</span> <span>321</span>
                </div>
                <div className={styles.inputLine}>
                  <span>Explanation:</span>{" "}
                  <span>" "</span>
                </div>
              </div>
            </div>
            <div>
              <h3>Example 2:</h3>
              <div className={styles.exaplemDiv}>
                <div className={styles.inputLine}>
                  <span>Input</span>{" "}
                  <span>x = -123 </span>
                </div>
                <div className={styles.inputLine}>
                  <span>Output:</span> <span>-321</span>
                </div>
                <div className={styles.inputLine}>
                  <span>Explanation:</span>{" "}
                  <span>" "</span>
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
            defaultLanguage="java"
            defaultValue={defCode}
            onChange={handleEditorChange}
          />
            <Button variant="contained" color="success" onClick={()=>{submitHandler(code)}}>
             Submit
           </Button>
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
