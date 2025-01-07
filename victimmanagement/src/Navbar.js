import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <div className="text-white font-bold text-2xl">
          <Link to="/">YourBrand</Link>
        </div>

        {/* Buttons */}
        <div className="space-x-4">
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/homepage"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/aboutus"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            About Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
