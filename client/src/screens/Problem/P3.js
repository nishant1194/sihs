import React, { useState,useEffect } from 'react'
import { Editor } from "@monaco-editor/react";
import axios from "axios"
import Button from '@mui/material/Button';

export default function P3() {
    const[code , setCode] = useState("") ;
    const[codeEd,setCodeEd] = useState("");

    function handleEditorChange(value, event) {
        setCodeEd(value);
        console.log(codeEd) ;
      }
      const defCode = `
      public static int[] twoSum(int[]nums , int target){
      
        // write your code here
       
    }
      `

      useEffect(() => {
        setCode(`
             import java.util.*;
     public class Main{
     ${codeEd}
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
            `)
    
      }, [codeEd]);


      const submitHandler=async(code)=>{
        try {
         
          const response = await axios.post('http://localhost:5006/api/execute', {
             code: code,
              language: "java", 
          })
         console.log("haha");
         console.log("submitHandler"+code ) ;
         console.log(response) ;
    
      } catch (err) {
          // Catch and handle errors
         console.log(err)
      }
    
      }

  return (
    <div>
      <Editor
            height="60vh"
            defaultLanguage="java"
            defaultValue={defCode}
            value={codeEd}
            onChange={handleEditorChange}
          />

 <Button variant="contained" color="success" onClick={()=>{submitHandler(code)}}>
             Submit
           </Button>
    </div>
  )
}
