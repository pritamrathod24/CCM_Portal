import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminLoginForm = () => {
  const [formData, setFormData] = useState({
    adminid: "",
    pass: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/admin_login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Logged In Successfully!");
        navigate("/admindash");
        // Perform any actions after successful login, such as redirecting to another page
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error logging in admin:", error);
      alert("Failed to login admin. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto px-4 mt-60 max-w-sm">
      <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="adminid"
          >
            Admin ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="adminid"
            type="text"
            placeholder="Enter admin ID"
            name="adminid"
            value={formData.adminid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pass"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pass"
            type="password"
            placeholder="Enter password"
            name="pass"
            value={formData.pass}
            onChange={handleChange}
            required
          />
        </div>
        <button
        type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"  
        >
          Login
        </button>
      </form>
      <Link
        to="/adminregistration"
        className="text-red-500 font-bold hover:underline mt-24"
      >
        If new, register
      </Link>
    </div>
  );
};

export default AdminLoginForm;
