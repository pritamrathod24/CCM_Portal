import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Choose an Option
        </h1>
        <div className="flex justify-center space-x-4">
          <Link
            to="/adminlogin"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full"
          >
            Continue as Admin
          </Link>
          <Link
            to="/victimlogin"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full"
          >
            Continue as Victim
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
