import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const VictimSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
    region: "",
    state: "",
    pincode: "",
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
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch(
        "http://localhost:5000/api/victim_register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register victim");
      }

      const data = await response.json();
      console.log(data.message); // Log the response message
      navigate(`/victimlogin`);
    } catch (error) {
      console.error("Error registering victim:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Victim Sign Up</h2>
        {/* Signup form */}
        <form onSubmit={handleSubmit}>
          {/* Name input */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {/* Email input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {/* Password input */}
          <div className="mb-4">
            <label
              htmlFor="pass"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="pass"
              name="pass"
              placeholder="Password"
              value={formData.pass}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {/* Region input */}
          <div className="mb-4">
            <label
              htmlFor="region"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Region
            </label>
            <input
              type="text"
              id="region"
              name="region"
              placeholder="Region"
              value={formData.region}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {/* State input */}
          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {/* Pincode input */}
          <div className="mb-6">
            <label
              htmlFor="pincode"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {/* Signup button */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default VictimSignup;
