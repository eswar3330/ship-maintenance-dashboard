import React, { useEffect, useState } from 'react';
import { getJobsFromStorage, getComponentsFromStorage, getShipsFromStorage, getUsersFromStorage } from '../utils/localStorageUtils';
import { Link } from 'react-router-dom';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [components, setComponents] = useState([]);
  const [ships, setShips] = useState([]);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '' });

  useEffect(() => {
    setJobs(getJobsFromStorage());
    setComponents(getComponentsFromStorage());
    setShips(getShipsFromStorage());
    setUsers(getUsersFromStorage());
  }, []);

  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const filteredJobs = jobs.filter(job => {
    return (!filters.status || job.status === filters.status) &&
           (!filters.priority || job.priority === filters.priority);
  });

  const getShipName = shipId => ships.find(s => s.id === shipId)?.name || 'Unknown Ship';
  const getComponentName = compId => components.find(c => c.id === compId)?.name || 'Unknown Component';
  const getEngineerName = uid => users.find(u => u.id === uid)?.email || 'Unassigned';

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Maintenance Jobs</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select name="status" value={filters.status} onChange={handleFilterChange} className="border px-3 py-2 rounded">
          <option value="">All Statuses</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <select name="priority" value={filters.priority} onChange={handleFilterChange} className="border px-3 py-2 rounded">
          <option value="">All Priorities</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <Link to="/jobs/create" className="mb-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Create Job
      </Link>

      {/* Jobs Table */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Type</th>
            <th className="p-2">Ship</th>
            <th className="p-2">Component</th>
            <th className="p-2">Priority</th>
            <th className="p-2">Status</th>
            <th className="p-2">Engineer</th>
            <th className="p-2">Scheduled Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map(job => (
            <tr key={job.id} className="border-t">
              <td className="p-2">{job.type}</td>
              <td className="p-2">{getShipName(job.shipId)}</td>
              <td className="p-2">{getComponentName(job.componentId)}</td>
              <td className="p-2">{job.priority}</td>
              <td className="p-2">{job.status}</td>
              <td className="p-2">{getEngineerName(job.assignedEngineerId)}</td>
              <td className="p-2">{job.scheduledDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsPage;
