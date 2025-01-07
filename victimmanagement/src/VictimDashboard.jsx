import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const VictimDashboard = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const [victim, setVictim] = useState([]);
  const navigate = useNavigate();
  const fetchVictim = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/fetch_single/${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch victim");
      }

      const data = await response.json();
      setVictim(data.victims.cases);
    } catch (error) {
      console.error("Error fetching victim details:", error);
    }
  };

  useEffect(() => {
    fetchVictim();
  }, [userId]);
  const handleonclick = () => {
    navigate("/file-new-case");
  };
  return (
    <div className="container mx-auto py-8">
      {/* <p>User ID: {userId}</p> */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Victim Dashboard</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleonclick}
        >
          File a New Case
        </button>
      </div>
      {/* Table to display pending cases */}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Serial No.</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {victim.map((caseItem, index) => (
            <tr key={caseItem._id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{caseItem.title}</td>
              <td className="border px-4 py-2">{caseItem.description}</td>
              <td className="border px-4 py-2">
                {caseItem.approve ? "Approved" : "Pending"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VictimDashboard;
