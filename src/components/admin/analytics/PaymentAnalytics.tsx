import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp, Download, Filter } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  type: "subscription" | "listing" | "boost" | "commission";
  amount: number;
  status: "completed" | "pending" | "failed";
  customer: string;
  paymentMethod: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "tx_1",
    date: new Date().toISOString(),
    type: "subscription",
    amount: 99.0,
    status: "completed",
    customer: "Premium Motors",
    paymentMethod: "Visa •••• 4242",
  },
  {
    id: "tx_2",
    date: new Date().toISOString(),
    type: "listing",
    amount: 29.99,
    status: "completed",
    customer: "John Smith",
    paymentMethod: "Mastercard •••• 5555",
  },
  {
    id: "tx_3",
    date: new Date().toISOString(),
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
          <h2 className="text-2xl font-bold mb-2">Payment Analytics</h2>
          <p className="text-gray-600">Track and manage payment transactions</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">
            Total Revenue (Today)
          </div>
          <div className="text-3xl font-bold mb-2">£1,234.56</div>
          <div className="text-green-600 flex items-center">
            <ArrowUp className="w-4 h-4 mr-1" />
            12% from yesterday
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">
            Successful Transactions
          </div>
          <div className="text-3xl font-bold mb-2">45</div>
          <div className="text-green-600 flex items-center">
            <ArrowUp className="w-4 h-4 mr-1" />
            8% from yesterday
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Failed Transactions</div>
          <div className="text-3xl font-bold mb-2">2</div>
          <div className="text-red-600 flex items-center">
            <ArrowDown className="w-4 h-4 mr-1" />
            50% from yesterday
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Recent Transactions</h3>
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
                <TableCell className="font-mono text-sm">{tx.id}</TableCell>
                <TableCell>{new Date(tx.date).toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant="outline">{tx.type}</Badge>
                </TableCell>
                <TableCell>£{tx.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      tx.status === "completed"
                        ? "success"
                        : tx.status === "pending"
                          ? "warning"
                          : "destructive"
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
