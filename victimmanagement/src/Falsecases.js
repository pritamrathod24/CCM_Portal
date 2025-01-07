import React from "react";
import { useState, useEffect } from "react";
const Falsecases = () => {
  const [cases, setcases] = useState(null);

  const fetchVictim = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/false_cases`);
      if (!response.ok) {
        throw new Error("Failed to fetch victim");
      }
      const data = await response.json(); // Parsing JSON response
      setcases(data.cases);
    } catch (error) {
      console.error("Error fetching victim details:", error);
    }
  };
  useEffect(() => {
    fetchVictim();
  }, []);
  return <div>Falsecases</div>;
};

export default Falsecases;
