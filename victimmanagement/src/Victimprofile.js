import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Victimprofile() {
  const { id } = useParams();
  const [victim, setVictim] = useState(null);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const fetchVictim = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/fetch_single/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch victim");
      }
      const data = await response.json(); // Parsing JSON response
      setVictim(data.victims);
    } catch (error) {
      console.error("Error fetching victim details:", error);
    }
  };

  useEffect(() => {
    fetchVictim();
  }, [id]);

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
      // Reload victim data after approval
      fetchVictim();
    } catch (error) {
      console.error("Error granting approval:", error);
    }
  };

  const openPopup = (evidenceUrl) => {
    setSelectedEvidence(evidenceUrl);
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedEvidence(null);
    setShowPopup(false);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Victim Cases</h3>
      {victim ? (
        <div>
          <div className="bg-gray-100 rounded p-4 mb-4">
            <p>Victim name: {victim.name}</p>
            {/* Display other victim details here */}
          </div>

          <ul>
            {victim.cases.map((singleCase) => (
              <li
                key={singleCase._id}
                className="bg-white shadow-md rounded p-4 mb-4"
              >
                <p className="text-lg font-semibold">
                  Title: {singleCase.title}
                </p>
                <p className="text-sm mb-2">
                  Description: {singleCase.description}
                </p>
                <p className="text-sm">
                  Approved: {singleCase.approve ? "Yes" : "No"}
                </p>
                {/* Button to display evidence image as a popup */}
                {singleCase.evidence && (
                  <button
                    onClick={() => openPopup(singleCase.evidence)}
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
                  >
                    View Evidence
                  </button>
                )}
                {/* Button to grant approval */}
                {!singleCase.approve && (
                  <button
                    onClick={() => handleGrantApproval(singleCase._id)}
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-2 ml-2"
                  >
                    Grant Approval
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Popup for displaying evidence image */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={closePopup}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img src={selectedEvidence} alt="Evidence" className="w-full" />
            <button
              className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Victimprofile;
