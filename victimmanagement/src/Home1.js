import React from "react";
import { useNavigate } from "react-router-dom";
const Home1 = () => {
  const navigate = useNavigate();
  const handleonclick = () => {
    navigate("/homepage");
  };
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center">
      {/* Brand Name */}
      <h1 className="text-6xl font-extrabold mb-8 text-black">Criminal Management System</h1>

      {/* Description */}
      <p className="text-lg text-black mb-12 text-center max-w-lg">
        Welcome to Criminal Management System. File your complain here
      </p>

      {/* Call to Action Button */}
      <button
        className="bg-black hover:bg-gray-200 text-white font-bold py-3 px-6 rounded-full transition duration-300 "
        onClick={handleonclick}
      >
        Complian Now
      </button>
    </div>
  );
};

export default Home1;
