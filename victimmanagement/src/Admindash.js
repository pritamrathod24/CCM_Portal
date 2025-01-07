import { useState, useEffect } from "react";

function Admindash() {
  const [victimsa, setVictims] = useState([]);

  useEffect(() => {
    const fetchvictims = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/fetch_victims");
        if (res.ok) {
          const data = await res.json(); // Extract JSON data from response
          if (Array.isArray(data.victims)) {
            // Check if data.victims is an array
            console.log(data.victims); // Log the extracted array
            setVictims(data.victims); // Set the extracted array to state
          } else {
            console.log("Victims data is not an array:", data.victims);
          }
        } else {
          console.log("Response not okay:", res.statusText); // Log error message if response is not okay
        }
      } catch (err) {
        console.log("Fetch error:", err); // Log fetch error
      }
    };
    fetchvictims();
  }, []);

  return (
    <div className="Admindash">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Victims Data</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Region
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                State
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pincode
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cases
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {victimsa.map((victim) => (
              <tr key={victim._id}>
                <td className="px-6 py-4 whitespace-nowrap">{victim.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{victim.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{victim.region}</td>
                <td className="px-6 py-4 whitespace-nowrap">{victim.state}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {victim.pincode}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <ul className="list-disc list-inside">
                    {victim.cases.map((caseItem) => (
                      <li key={caseItem._id}>{caseItem.title}</li>
                    ))}
                  </ul>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admindash;
