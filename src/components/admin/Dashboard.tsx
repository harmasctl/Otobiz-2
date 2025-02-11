import AdminLayout from "./AdminLayout";
import AnalyticsChart from "./AnalyticsChart";
import ActivityLogsTable from "./ActivityLogsTable";

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        </div>

        <AnalyticsChart />
        <ActivityLogsTable />
      </div>
    </AdminLayout>
  );
}
