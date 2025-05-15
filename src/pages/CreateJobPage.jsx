import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJobsFromStorage, getComponentsFromStorage, getShipsFromStorage, getUsersFromStorage, saveJobsToStorage } from '../utils/localStorageUtils';

const CreateJobPage = () => {
  const [job, setJob] = useState({
    type: '',
    shipId: '',
    componentId: '',
    priority: 'Medium',
    status: 'Open',
    assignedEngineerId: '',
    scheduledDate: '',
  });

  const [ships, setShips] = useState([]);
  const [components, setComponents] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setShips(getShipsFromStorage());
    setComponents(getComponentsFromStorage());
    setUsers(getUsersFromStorage().filter(u => u.role === 'engineer'));
  }, []);

  const handleChange = (e) => {
    setJob(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobs = getJobsFromStorage();
    const newJob = { ...job, id: Date.now() };
    saveJobsToStorage([...jobs, newJob]);
    navigate('/jobs');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create Maintenance Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Job Type</label>
          <input name="type" value={job.type} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block mb-1">Ship</label>
          <select name="shipId" value={job.shipId} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
            <option value="">Select Ship</option>
            {ships.map(ship => (
              <option key={ship.id} value={ship.id}>{ship.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Component</label>
          <select name="componentId" value={job.componentId} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
            <option value="">Select Component</option>
            {components.map(comp => (
              <option key={comp.id} value={comp.id}>{comp.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Priority</label>
            <select name="priority" value={job.priority} onChange={handleChange} className="w-full border px-3 py-2 rounded">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Status</label>
            <select name="status" value={job.status} onChange={handleChange} className="w-full border px-3 py-2 rounded">
              <option>Open</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1">Assigned Engineer</label>
          <select name="assignedEngineerId" value={job.assignedEngineerId} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option value="">Unassigned</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.email}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Scheduled Date</label>
          <input type="date" name="scheduledDate" value={job.scheduledDate} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create Job</button>
      </form>
    </div>
  );
};

export default CreateJobPage;
