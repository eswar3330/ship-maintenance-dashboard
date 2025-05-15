import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getComponentsFromStorage, saveComponentsToStorage } from '../../utils/localStorageUtils';
import { v4 as uuidv4 } from 'uuid';

const ComponentForm = () => {
  const navigate = useNavigate();
  const { shipId, componentId } = useParams();
  const isEdit = !!componentId;

  const [form, setForm] = useState({
    name: '',
    serialNumber: '',
    installDate: '',
    lastMaintenanceDate: '',
    status: 'Operational',
  });

  useEffect(() => {
    if (isEdit) {
      const allComponents = getComponentsFromStorage();
      const comp = allComponents.find(c => c.id === componentId);
      if (comp) setForm(comp);
    }
  }, [componentId, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allComponents = getComponentsFromStorage();

    if (isEdit) {
      const updated = allComponents.map(c =>
        c.id === componentId ? { ...form, shipId } : c
      );
      saveComponentsToStorage(updated);
    } else {
      const newComponent = {
        ...form,
        id: uuidv4(),
        shipId,
      };
      saveComponentsToStorage([...allComponents, newComponent]);
    }

    navigate(`/ships/${shipId}/components`);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Edit' : 'Add'} Component</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Component Name"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="serialNumber"
          value={form.serialNumber}
          onChange={handleChange}
          placeholder="Serial Number"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="date"
          name="installDate"
          value={form.installDate}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="date"
          name="lastMaintenanceDate"
          value={form.lastMaintenanceDate}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Operational">Operational</option>
          <option value="Needs Maintenance">Needs Maintenance</option>
          <option value="Faulty">Faulty</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEdit ? 'Update' : 'Add'} Component
        </button>
      </form>
    </div>
  );
};

export default ComponentForm;
