import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar'
import axios from "axios";
import Linkk from "../../utils/Link";
const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState() ;
  const [probs, setProbs] = useState([]) ;
  const id = localStorage.getItem("userIdleetcode") ;
   const problems = [
    {
      title: "Solve a Sudoku Puzzle",
      difficulty: "Medium",
      date: "2024-05-01",
      status: "Solved",
    },
    {
      title: "Create a REST API",
      difficulty: "Hard",
      date: "2024-06-15",
      status: "Solved",
    },
    {
      title: "Build a Personal Website",
      difficulty: "Easy",
      date: "2024-07-23",
      status: "Attempted",
    },
    {
      title: "Implement a Chat Application",
      difficulty: "Medium",
      date: "2024-08-30",
      status: "Solved",
    },
  ];
  const handleLogout = () => {
    localStorage.removeItem("tokenleetcode");
    localStorage.removeItem("userIdleetcode");
    navigate("/login")
  };

  const getMyProblems= async()=>{
    try {
      const resp = await axios.get(Linkk+`/submission/user/${id}`);
      setProbs(resp.data) ;
      console.log(resp.data)
    } catch (error) {
      console.log(error)
    }

  }
  const getMyProfile= async()=>{
    try {
      const resp = await axios.get(Linkk+`/user/${id}`);
      setUser(resp.data) ;
      console.log(resp.data)
    } catch (error) {
      console.log(error)
    }
   }
  useEffect(()=>{
    getMyProfile();
    getMyProblems();
  },[])

  return (
    <>
    <Navbar />
    <div className="w-full mx-auto px-15 bg-gray-100">
      <div className="bg-gray-100 p-8 rounded-lg shadow-xl w-full">
        {/* Profile Section */}
        <div className="text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 mx-auto mb-4">
            <img
              src="https://res.cloudinary.com/drzxyuyql/image/upload/v1735851581/wz017mi9kp2shfc9iczg.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-semibold text-blue-600">{user?.username}</h1>
          <button
            className="text-lg text-white mt-2 bg-green-500 px-4 py-2 rounded-2xl"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </div>

        {/* Problems Solved Section */}
        <div className="mt-8 px-[10%]">
          <h2 className="text-2xl font-semibold text-blue-600">
            Problems Solved
          </h2>
          <div className="mt-6 space-y-6">
            { probs? probs?.map((problem, index) => (
              <Link to={`/problem/${problem?.problemId?._id}`}>
              <div
                key={index}
                className="flex items-center my-4 justify-between bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-700">
                    {problem?.problemId?.problemStatement}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Difficulty: {problem?.problemId?.difficulity}
                  </p>
                  <p className="text-sm text-gray-500">
                    Solved on: {problem?.createdAt}
                  </p>
                </div>

                {/* Problem Status Tags */}
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      problem.status === "Solved"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {problem?.problemId.status}
                  </span>
                </div>
              </div>
              </Link>
            )) :<div>
              No Problem Solved Till date
            </div>
          }
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
