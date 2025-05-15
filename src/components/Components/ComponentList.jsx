import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getComponentsFromStorage } from '../../utils/localStorageUtils';

const ComponentList = () => {
  const { shipId } = useParams();
  const components = getComponentsFromStorage().filter(c => c.shipId === shipId);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Components for Ship: {shipId}</h2>
      <div className="flex justify-end mb-4">
        <Link
          to={`/ships/${shipId}/components/new`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Component
        </Link>
      </div>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {components.length > 0 ? (
            components.map((comp) => (
              <tr key={comp.id}>
                <td className="p-2 border">{comp.name}</td>
                <td className="p-2 border">{comp.type}</td>
                <td className="p-2 border">{comp.status}</td>
                <td className="p-2 border">
                  <Link
                    to={`/ships/${shipId}/components/${comp.id}/edit`}
                    className="text-green-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">No components found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ComponentList;
