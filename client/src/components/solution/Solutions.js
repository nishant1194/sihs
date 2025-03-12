import { Button } from '@mui/material';
import React, { useState ,useEffect} from 'react'
import { useParams , Link} from "react-router-dom";
import axios from 'axios';
import Linkk from '../../utils/Link';
export default function Solutions(props) {
    const { id } = useParams();
    const[sol , setSol] = useState([]);

    useEffect(()=>{
        createSol();
    },[]);
  
    const createSol = async() =>{
      try{
        const resp = await axios.get(Linkk+`/api/v1/solution/problem/${id}`)
        console.log(resp.data);
        setSol(resp.data);
  
    } catch(err){
      console.log(err);
    }}

  return (
    <div>
      <Button variant="contained" color="primary" >
        <Link to={`/problem/create-solution/${id}`}>Add Solutions</Link> 
      </Button>

      {sol?.map((data,key)=>{
        return(
            <>
            <div>
               <div>Solution{key+1}</div> 
                Language: {data?.language}
            </div>
            <div>
                Approch: {data?.aprroch}
            </div>  
            <div>Code:
                
            </div>
            <div>
             {data?.code}
            </div> 
                
            </>
        )
      })}
    </div>
  )
}
