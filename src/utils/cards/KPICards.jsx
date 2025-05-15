import { useContext, useMemo } from 'react';
import { ShipsContext } from '@/contexts/ShipsContext';
import { ComponentsContext } from '@/contexts/ComponentsContext';
import { JobsContext } from '@/contexts/JobsContext';
import { differenceInMonths, parseISO } from 'date-fns';

const KPICards = () => {
  const { ships } = useContext(ShipsContext);
  const { components } = useContext(ComponentsContext);
  const { jobs } = useContext(JobsContext);

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <h3 className="text-gray-500 font-semibold">Total Ships</h3>
        <p className="text-3xl font-bold">{totalShips}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 text-center">
        <h3 className="text-gray-500 font-semibold">Components Overdue</h3>
        <p className="text-3xl font-bold">{overdueComponents}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 text-center">
        <h3 className="text-gray-500 font-semibold">Jobs In Progress</h3>
        <p className="text-3xl font-bold">{jobsInProgress}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 text-center">
        <h3 className="text-gray-500 font-semibold">Jobs Completed</h3>
        <p className="text-3xl font-bold">{jobsCompleted}</p>
      </div>
    </div>
  );
};

export default KPICards;
