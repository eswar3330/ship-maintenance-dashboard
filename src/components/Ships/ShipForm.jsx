import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getShipsFromStorage, saveShipsToStorage } from '../../utils/localStorageUtils';

const ShipForm = () => {
  const navigate = useNavigate();
  const { shipId } = useParams();
  const editing = Boolean(shipId);

  const [ship, setShip] = useState({
    name: '',
    imo: '',
    flag: '',
    status: 'Active',
  });

  useEffect(() => {
    if (editing) {
      const ships = getShipsFromStorage();
      const targetShip = ships.find((s) => s.id === shipId);
      if (targetShip) {
        setShip(targetShip);
      }
    }
  }, [shipId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShip({ ...ship, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ships = getShipsFromStorage();

    if (editing) {
      const updatedShips = ships.map((s) => (s.id === shipId ? { ...ship, id: shipId } : s));
      saveShipsToStorage(updatedShips);
    } else {
      const newShip = { ...ship, id: `s-${Date.now()}` };
      saveShipsToStorage([...ships, newShip]);
    }

    navigate('/ships');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">{editing ? 'Edit Ship' : 'Add Ship'}</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="name"
          placeholder="Ship Name"
          value={ship.name}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="imo"
          placeholder="IMO Number"
          value={ship.imo}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="flag"
          placeholder="Flag"
          value={ship.flag}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <select name="status" value={ship.status} onChange={handleChange} className="border p-2 rounded">
          <option value="Active">Active</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editing ? 'Update Ship' : 'Add Ship'}
        </button>
      </form>
    </div>
  );
};

export default ShipForm;
