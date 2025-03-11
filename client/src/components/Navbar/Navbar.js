import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white text-gray-800 shadow-md border-b border-gray-300">
      {/* Title */}
      <div className="text-2xl font-bold text-blue-600">NeetCode</div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <Button
            variant="outlined"
            className="text-gray-800 border-gray-800 hover:border-blue-500 hover:text-blue-500"
          >
            Problem List
          </Button>
        </Link>
      </div>

      {/* User Avatar */}
      <div className="flex items-center space-x-2">
        {localStorage.getItem("userIdleetcode") ? (
          <Link to={`/profile/${localStorage.getItem("userIdleetcode")}`}>
          <Avatar
            alt="User Avatar"
            src="https://res.cloudinary.com/drzxyuyql/image/upload/v1735851581/wz017mi9kp2shfc9iczg.png"
            className="cursor-pointer border-2 border-blue-500"
          />
          </Link>
        ) : (
          <Link to='/login' className="bg-blue-500 text-white py-1 px-4 text-lg rounded-2xl">Sign In</Link>
        )}
      </div>
    </div>
  );
}
