import React, { useState, useEffect } from 'react';
import { getShipsFromStorage, saveShipsToStorage } from '../utils/localStorageUtils';
import { Link } from 'react-router-dom';

const ShipsPage = () => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const stored = getShipsFromStorage();
    setShips(stored);
  }, []);

  const deleteShip = (id) => {
    const updated = ships.filter((ship) => ship.id !== id);
    setShips(updated);
    saveShipsToStorage(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Ships</h1>
      <Link
        to="/ships/new"
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Add New Ship
      </Link>
      <div className="grid gap-4">
        {ships.map((ship) => (
          <div key={ship.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{ship.name}</p>
              <p className="text-sm text-gray-600">IMO: {ship.imo} | Flag: {ship.flag} | Status: {ship.status}</p>
            </div>
            <div className="space-x-2">
              <Link to={`/ships/${ship.id}`} className="text-blue-500 hover:underline">Details</Link>
              <Link to={`/ships/${ship.id}/edit`} className="text-green-500 hover:underline">Edit</Link>
              <button onClick={() => deleteShip(ship.id)} className="text-red-500 hover:underline">Delete</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ShipsPage;
