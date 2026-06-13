import { useEffect, useState } from "react";

import StatsCard from "../components/StatsCard";
import api from "../services/api";

function Dashboard() {

  const [stats, setStats] = useState({
    total_tickets: 0,
    open_tickets: 0,
    in_progress_tickets: 0,
    closed_tickets: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get(
        "/dashboard/stats"
      );
      console.log("API RESPONSE:");
console.log(response.data);

setStats(response.data);

console.log("STATE SHOULD BECOME:");
console.log(response.data);

      setStats(response.data);

    } catch (error) {
      console.error(
        "Failed to fetch dashboard stats",
        error
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h2 className="text-3xl font-bold mb-8">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatsCard
          title="Total Tickets"
          value={stats.total_tickets}
        />

        <StatsCard
          title="Open Tickets"
          value={stats.open_tickets}
        />

        <StatsCard
          title="In Progress"
          value={stats.in_progress_tickets}
        />

        <StatsCard
          title="Closed"
          value={stats.closed_tickets}
        />

      </div>

    </div>
  );
}

export default Dashboard;