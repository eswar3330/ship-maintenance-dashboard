import React, { useEffect, useState } from 'react';
import { getJobsFromStorage, getShipsFromStorage, getComponentsFromStorage } from '../utils/localStorageUtils';
import { Link } from 'react-router-dom';

const CalendarPage = () => {
  const [jobsByDate, setJobsByDate] = useState({});

  useEffect(() => {
    const jobs = getJobsFromStorage();
    const grouped = {};

    jobs.forEach(job => {
      if (!job.scheduledDate) return;
      if (!grouped[job.scheduledDate]) grouped[job.scheduledDate] = [];
      grouped[job.scheduledDate].push(job);
    });

    setJobsByDate(grouped);
  }, []);

  const formatDate = (dateStr) => new Date(dateStr).toDateString();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📅 Maintenance Calendar</h2>

      {Object.keys(jobsByDate).length === 0 ? (
        <p>No scheduled jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {Object.entries(jobsByDate).map(([date, jobs]) => (
            <div key={date} className="border rounded p-4 bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">{formatDate(date)}</h3>
              <ul className="space-y-2">
                {jobs.map(job => (
                  <li key={job.id} className="bg-white p-3 border rounded shadow-sm hover:shadow transition">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">🔧 {job.type}</p>
                        <p className="text-sm text-gray-600">Status: {job.status} | Priority: {job.priority}</p>
                      </div>
                      <Link
                        to={`/jobs`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View Jobs
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
