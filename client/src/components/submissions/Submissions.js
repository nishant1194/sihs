import axios from "axios";
import React, { useEffect, useState } from "react";
import Linkk from "../../utils/Link";

const SubContainer =({ item })=>{
  const [openBlocks, setOpenBlocks] = useState(true); // Track open state per item
  const toggleView = (id) => {
    setOpenBlocks(!openBlocks);
  };
  return(
         <div className="m-4">
          {openBlocks ? (
            <div className="flex justify-between items-center p-4 bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <span className="text-lg font-semibold text-blue-900">{item?.status}</span>
              <span className="text-gray-600 text-sm">{item?.timestamp || "Unknown Date"}</span>
              <button
                onClick={() => toggleView(item?.id)}
                className="text-blue-600 hover:text-blue-800 font-medium underline cursor-pointer"
              >
                View Code
              </button>
            </div>
          ) : (
            <div>
            <div className="flex justify-between items-center p-4 bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <span className="text-lg font-semibold text-blue-900">{item?.status}</span>
            <span className="text-gray-600 text-sm">{item?.timestamp || "Unknown Date"}</span>
            <button
              onClick={() => toggleView(item?.id)}
              className="text-blue-600 hover:text-blue-800 font-medium underline cursor-pointer"
            >
              Close
            </button>
          </div>
            <div className="p-4 bg-white rounded-lg shadow-md transition-transform duration-300">
              <div
                className="text-gray-800 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item?.code }}
              />
            </div>
            </div>
          )
          }
        </div>
  )
}

export default function Submissions(props) {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const getSubss = async () => {
      try {
        const resp = await axios.get(Linkk + `/submission/problem/${props?.prbID}/${localStorage.getItem('userIdleetcode')}`);
        console.log(resp.data);
        setSubs(resp.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSubss();
  }, [props?.prbID]);


  return (
    <div className="w-full">
      {subs.length>0 ? subs?.map((item) => (
        <SubContainer item ={item} />
      )):<div>Not submissions. <br/>Only Logged in user can make submissions</div>}
    </div>
  );
}
