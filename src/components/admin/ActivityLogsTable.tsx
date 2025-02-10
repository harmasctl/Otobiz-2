import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ActivityLog {
  id: string;
  action: string;
  user: string;
  details: string;
  timestamp: string;
  status: "success" | "error" | "warning";
}

const mockLogs: ActivityLog[] = [
  {
    id: "1",
    action: "User Login",
    user: "admin@example.com",
    details: "Successful login from IP 192.168.1.1",
    timestamp: new Date().toISOString(),
    status: "success",
  },
  {
    id: "2",
    action: "Vehicle Listing",
    user: "dealer@example.com",
    details: "New vehicle listed: BMW 3 Series",
    timestamp: new Date().toISOString(),
    status: "success",
  },
];

export default function ActivityLogsTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Activity Logs</h2>
        <select className="border rounded-md px-3 py-2">
          <option>All Activities</option>
          <option>User Actions</option>
          <option>System Events</option>
          <option>Errors</option>
        </select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.user}</TableCell>
              <TableCell>{log.details}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    log.status === "success"
                      ? "bg-green-100 text-green-800"
                      : log.status === "error"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {log.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
