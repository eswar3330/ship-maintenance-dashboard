import React, { useContext, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShipsContext } from '../contexts/ShipsContext';
import { ComponentsContext } from '../contexts/ComponentsContext.jsx';
import { JobsContext } from '../contexts/JobsContext';
import { differenceInMonths, parseISO } from 'date-fns';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { ships } = useContext(ShipsContext);
  const { components } = useContext(ComponentsContext);
  const { jobs } = useContext(JobsContext);

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Calculate Overdue Components (last maintenance > 6 months ago)
  const overdueComponents = useMemo(() => {
    const now = new Date();
    return components.filter(c => {
      const lastMaint = parseISO(c.lastMaintenanceDate);
      return differenceInMonths(now, lastMaint) > 6;
    }).length;
  }, [components]);

  // Jobs counts
  const jobsInProgress = useMemo(() =>
    jobs.filter(j => j.status === 'Open' || j.status === 'In Progress').length, [jobs]);

  const jobsCompleted = useMemo(() =>
    jobs.filter(j => j.status === 'Completed').length, [jobs]);

  // Ships count
  const totalShips = ships.length;

  // Data for Pie Chart (Job Status Distribution)
  const jobStatusData = useMemo(() => {
    const statusCount = { Open: 0, 'In Progress': 0, Completed: 0 };
    jobs.forEach(job => {
      if (statusCount[job.status] !== undefined) statusCount[job.status]++;
    });

    return [
      { name: 'Open', value: statusCount.Open },
      { name: 'In Progress', value: statusCount['In Progress'] },
      { name: 'Completed', value: statusCount.Completed }
    ];
  }, [jobs]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user.role}</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card title="Total Ships" value={totalShips} />
        <Card title="Components Overdue" value={overdueComponents} />
        <Card title="Jobs In Progress" value={jobsInProgress} />
        <Card title="Jobs Completed" value={jobsCompleted} />
      </div>

      {/* Pie Chart for Job Status */}
      <div className="mt-12 flex justify-center">
        <PieChart width={300} height={300}>
          <Pie
            data={jobStatusData}
            cx={150}
            cy={150}
            outerRadius={100}
            dataKey="value"
            label
          >
            {jobStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Calendar Link */}
      <div className="mt-10 text-center">
        <Link
          to="/calendar"
          className="inline-block bg-blue-600 text-white text-lg px-6 py-3 rounded-xl hover:bg-blue-700 shadow-md transition"
        >
          📅 View Maintenance Calendar
        </Link>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-lg font-medium text-gray-600">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default DashboardPage;
