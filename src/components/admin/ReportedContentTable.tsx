import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface ReportedContent {
  id: string;
  type: "listing" | "comment" | "user";
  reason: string;
  reportedBy: string;
  dateReported: string;
  status: "pending" | "reviewed" | "resolved";
  content: string;
}

const mockReports: ReportedContent[] = [
  {
    id: "1",
    type: "listing",
    reason: "Suspicious pricing",
    reportedBy: "user@example.com",
    dateReported: new Date().toISOString(),
    status: "pending",
    content: "BMW 3 Series listing",
  },
  {
    id: "2",
    type: "comment",
    reason: "Inappropriate content",
    reportedBy: "another@example.com",
    dateReported: new Date().toISOString(),
    status: "reviewed",
    content: "Comment on Mercedes listing",
  },
];

export default function ReportedContentTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reported Content</h2>
        <div className="flex gap-4">
          <select className="border rounded-md px-3 py-2">
            <option>All Types</option>
            <option>Listings</option>
            <option>Comments</option>
            <option>Users</option>
          </select>
          <select className="border rounded-md px-3 py-2">
            <option>All Status</option>
            <option>Pending</option>
            <option>Reviewed</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Reported By</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockReports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>
                {new Date(report.dateReported).toLocaleDateString()}
              </TableCell>
              <TableCell className="capitalize">{report.type}</TableCell>
              <TableCell>{report.content}</TableCell>
              <TableCell>{report.reason}</TableCell>
              <TableCell>{report.reportedBy}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    report.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : report.status === "reviewed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {report.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                  <Button size="sm" variant="destructive">
                    Remove
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
