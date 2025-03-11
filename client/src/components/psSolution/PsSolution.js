import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const SolContainer = ({ sols }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-50 my-2 mx-auto">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex w-full px-4 py-4 text-black bg-[#e1e1e1] rounded-lg shadow hover:bg-[#d1d1d1] hover:text-black focus:outline-none"
      >
        <img
          className="w-10 h-10 rounded-full m-2"
          src="https://portfolio-sigma-one-53.vercel.app/static/media/Nishant.9dcb755d866c80b0ca86.JPG"
          alt="..."
        />
        <div className="flex flex-col justify-start items-start">
          <div className="text-[#707070] font-semibold text-sm">
            {sols?.uploadedBy?.username || "UserName"}
          </div>
          <div className="text-lg my-1">Solution in {sols?.language}</div>
          <div className="">
            <span className="rounded-3xl bg-[#bdbdbd] px-2 py-0">
              {sols?.language || "Lang"}
            </span>
            <span className="text-sm italic"> Created On 17, Mar, 2024</span>
          </div>
        </div>
      </button>

      <div
        className={` overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "  opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 bg-gray-100 shadow">
          <h2 className="text-lg font-semibold text-gray-800">Dropdown Info</h2>
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: sols?.approach }}
          />
          <div
            className=""
            dangerouslySetInnerHTML={{
              __html: sols?.code?.replace(/\n/g, "<br />"),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default function PsSolution(props) {
  const { id } = useParams();
  const [sol, setSol] = useState([]);

  useEffect(() => {
    getSol();
  }, []);

  const getSol = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:5006/api/v1/solution/problem/${id}`
      );
      console.log(resp.data);
      setSol(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {sol.length > 0 ? (
        sol?.map((sols) => {
          return <SolContainer sols={sols} />;
        })
      ) : (
        <div>Solution is not available</div>
      )}
      <Button variant="contained" color="primary">
        <Link to={`/problem/create-solution/${id}`} target="_blank">
          Add Solutions
        </Link>
      </Button>
    </div>
  );
}
