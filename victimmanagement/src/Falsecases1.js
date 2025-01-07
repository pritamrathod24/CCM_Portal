import React, { useState, useEffect } from "react";

const Falsecases1 = () => {
  const [cases, setCases] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState(null);

  const fetchVictim = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/false_cases`);
      if (!response.ok) {
        throw new Error("Failed to fetch victim");
      }
      const data = await response.json(); // Parsing JSON response
      setCases(data.cases);
    } catch (error) {
      console.error("Error fetching victim details:", error);
    }
  };

  useEffect(() => {
    fetchVictim();
  }, []);

  const handleGrantApproval = async (caseId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/grant_approval/${caseId}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to grant approval");
      }
      alert("Approval granted");
      // Reload victim data after approval
    } catch (error) {
      console.error("Error granting approval:", error);
    }
  };

  const handleViewEvidence = (evidenceUrl) => {
    setSelectedEvidence(evidenceUrl);
  };

  const handleCloseEvidence = () => {
    setSelectedEvidence(null);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">False Cases</h1>
      {selectedEvidence && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="max-w-lg bg-white p-8 rounded-lg shadow-lg">
            <img src={selectedEvidence} alt="Evidence" className="w-full" />
            <button
              className="absolute top-0  right-0 mr-4 mt-96 font-extrabold text-black hover:text-gray-400 text-[100px] px-4 py-2"
              onClick={handleCloseEvidence}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">id of person</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Approve</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border px-4 py-2">{c.email}</td>
              <td className="border px-4 py-2">{c.cases.title}</td>
              <td className="border px-4 py-2">{c.cases.description}</td>
              <td className="border px-4 py-2">
                {c.cases.approve ? "Yes" : "No"}
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleGrantApproval(c.cases._id)}
                >
                  Grant Approval
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleViewEvidence(c.cases.evidence)}
                >
                  View Evidence
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Falsecases1;
