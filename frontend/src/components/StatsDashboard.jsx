export default function StatsDashboard({ stats }) {
  if (!stats) return null;

  return (
    <div>
      <h2>Stats</h2>
      <p>Total: {stats.total_tickets}</p>
      <p>Open: {stats.open_tickets}</p>
      <p>Avg/day: {stats.avg_tickets_per_day}</p>
    </div>
  );
}
