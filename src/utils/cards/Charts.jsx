import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { useContext, useMemo } from 'react';
import { JobsContext } from '@/contexts/JobsContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const JobStatusPieChart = () => {
  const { jobs } = useContext(JobsContext);

  const data = useMemo(() => {
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
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx={150} cy={150} outerRadius={100}
        dataKey="value" label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default JobStatusPieChart;
