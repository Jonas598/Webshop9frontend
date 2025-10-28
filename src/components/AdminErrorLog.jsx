import React from "react";
import { Link } from "react-router-dom";
import allContext from "../contexts/allContext";
import { useContext, useEffect, useState } from "react";

const AdminErrorLog = () => {
  const context = useContext(allContext);
  const { fetchAllErrors,fetchAllProducts } = context;
  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getallErrors = async () => {
      setLoading(true);
      fetchAllProducts();
      const fetchedErrors = await fetchAllErrors();
      setErrors(fetchedErrors);
      setErrors(errors=>errors.reverse())
      setLoading(false);
    };
    getallErrors();
  }, []);



  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">System Error Logs</h1>
        <Link to="/admin">
          <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700">
            Back to Admin Home
          </button>
        </Link>
      </div>

      {loading?<div>Loading Errors...</div>:
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm">
              <th className="py-3 px-5">TimeStamp</th>
              <th className="py-3 px-5">TAGS</th>
              <th className="py-3 px-5"> Error Code</th>
              <th className="py-3 px-5">Error Message</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {errors.map((error, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                {}
                <td className="py-4 px-5">
                  {error.date}
                </td>
                <td className={`py-4 px-5 font-mono bg-gray-50 ${error.errorTag=='critical'?'text-red-600':'text-orange-400'}`}>{error.errorTag}</td>
                <td className={`py-4 px-5 font-mono `}>{error.errorCode}</td>
                <td className="py-4 px-5 bg-gray-50">{error.errorMessage}</td>
                
              </tr>
            ))} 
          </tbody>
        </table>
      </div>
      }
    </div>
  );
};

export default AdminErrorLog;
