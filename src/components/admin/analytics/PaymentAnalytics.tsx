import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  type: "subscription" | "listing" | "boost";
  amount: number;
  status: "completed" | "pending";
  customer: string;
  paymentMethod: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "tx_1",
    date: "2/12/2025, 9:55:09 AM",
    type: "subscription",
    amount: 99.0,
    status: "completed",
    customer: "Premium Motors",
    paymentMethod: "Visa •••• 4242",
  },
  {
    id: "tx_2",
    date: "2/12/2025, 9:55:09 AM",
    type: "listing",
    amount: 29.99,
    status: "completed",
    customer: "John Smith",
    paymentMethod: "Mastercard •••• 5555",
  },
  {
    id: "tx_3",
    date: "2/12/2025, 9:55:09 AM",
    type: "boost",
    amount: 49.99,
    status: "pending",
    customer: "Luxury Cars Ltd",
    paymentMethod: "Processing...",
  },
];

export default function PaymentAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Payment Analytics</h2>
          <p className="text-gray-600">Track and manage payment transactions</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="text-sm text-gray-600">Total Revenue (Today)</div>
          <div className="text-3xl font-bold mt-2">£1,234.56</div>
          <div className="text-sm text-green-600 mt-2">
            ↑ 12% from yesterday
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600">Successful Transactions</div>
          <div className="text-3xl font-bold mt-2">45</div>
          <div className="text-sm text-green-600 mt-2">↑ 8% from yesterday</div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600">Failed Transactions</div>
          <div className="text-3xl font-bold mt-2">2</div>
          <div className="text-sm text-red-600 mt-2">↓ 50% from yesterday</div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Payment Method</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.id}</TableCell>
                <TableCell>{tx.date}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell>£{tx.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={tx.status === "completed" ? "success" : "warning"}
                    className={
                      tx.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {tx.status}
                  </Badge>
                </TableCell>
                <TableCell>{tx.customer}</TableCell>
                <TableCell>{tx.paymentMethod}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
