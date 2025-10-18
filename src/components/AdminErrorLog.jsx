import React from 'react';
import { Link } from 'react-router-dom';

const AdminErrorLog = () => {
  const sampleErrors = [
    {
      timestamp: new Date().toISOString(),
      code: 'DB-CONN-FAIL',
      description: 'Failed to connect to the primary database.',
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      code: 'API-TIMEOUT',
      description: 'Request to payment gateway API timed out after 30 seconds.',
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      code: 'AUTH-INVALID-TOKEN',
      description: 'User tried to access a protected route with an invalid token.',
    },
  ];

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
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm">
              <th className="py-3 px-5">TimeStamp</th>
              <th className="py-3 px-5">Error Code</th>
              <th className="py-3 px-5">Description</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {sampleErrors.map((error, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                {}
                <td className="py-4 px-5">{new Date(error.timestamp).toLocaleString()}</td>
                <td className="py-4 px-5 font-mono bg-gray-50">{error.code}</td>
                <td className="py-4 px-5">{error.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminErrorLog;
