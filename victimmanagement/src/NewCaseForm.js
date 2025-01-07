import React, { useState } from "react";

const NewCaseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    evidence: null,
  });
  const id = localStorage.getItem("id");
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("evidence", formData.evidence);

    try {
      const response = await fetch(`http://localhost:5000/api/new_case/${id}`, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Case filed successfully!");
        setFormData({
          title: "",
          description: "",
          evidence: null,
        });
      } else {
        // Handle error
        alert("Failed to file case");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">File a New Case</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="evidence"
            className="block text-gray-700 font-bold mb-2"
          >
            Evidence
          </label>
          <input
            type="file"
            id="evidence"
            name="evidence"
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewCaseForm;
