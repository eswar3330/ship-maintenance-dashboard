import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getShipsFromStorage } from '../utils/localStorageUtils';
import ComponentList from '../components/Components/ComponentList';

const ShipDetailPage = () => {
  const { shipId } = useParams();
  const [ship, setShip] = useState(null);
  const [tab, setTab] = useState('components');

  useEffect(() => {
    const ships = getShipsFromStorage();
    const found = ships.find(s => s.id === shipId);
    setShip(found);
  }, [shipId]);

  if (!ship) return <p className="text-center mt-10">Ship not found 🚢</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{ship.name}</h1>
      <p className="mb-4 text-gray-700"><strong>Type:</strong> {ship.type}</p>
      <p className="mb-6 text-gray-700"><strong>Captain:</strong> {ship.captain}</p>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab('components')}
          className={`px-4 py-2 rounded ${tab === 'components' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
        >
          Components
        </button>
        <button
          onClick={() => setTab('history')}
          className={`px-4 py-2 rounded ${tab === 'history' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
        >
          History
        </button>
      </div>

      {/* Tab Content */}
      {tab === 'components' && <ComponentList shipId={shipId} />}
      {tab === 'history' && (
        <div className="bg-white p-4 rounded shadow">
          <p>Maintenance history coming soon babe 🛠️📜</p>
        </div>
      )}

      {/* Add Component Link */}
      {tab === 'components' && (
        <div className="mt-6">
          <Link
            to={`/ships/${shipId}/components/new`}
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Component
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShipDetailPage;
