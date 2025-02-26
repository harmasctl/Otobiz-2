import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useTransactionStore } from "@/store/useTransactionStore";
import { Filter, Download, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TransactionManager() {
  const {
    transactions,
    loading,
    fetchTransactions,
    updateTransaction,
    refundTransaction,
  } = useTransactionStore();
  const [selectedDate, setSelectedDate] = useState("all");

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "destructive";
      case "refunded":
        return "secondary";
      default:
        return "default";
    }
  };

  const handleRefund = async (id: string) => {
    if (window.confirm("Are you sure you want to refund this transaction?")) {
      await refundTransaction(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Transactions</h2>
          <p className="text-gray-600">Manage and monitor all transactions</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            className="border rounded-md px-3 py-2"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="text-sm text-gray-600">Total Revenue</div>
          <div className="text-3xl font-bold mt-2">£123,456</div>
          <div className="text-sm text-green-600 mt-2">
            ↑ 12% from last month
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600">Successful Transactions</div>
          <div className="text-3xl font-bold mt-2">1,234</div>
          <div className="text-sm text-green-600 mt-2">
            ↑ 8% from last month
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600">Failed Transactions</div>
          <div className="text-3xl font-bold mt-2">12</div>
          <div className="text-sm text-red-600 mt-2">↓ 5% from last month</div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600">Refund Rate</div>
          <div className="text-3xl font-bold mt-2">2.4%</div>
          <div className="text-sm text-green-600 mt-2">
            ↑ 1% from last month
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-mono">{transaction.id}</TableCell>
                <TableCell>
                  {new Date(transaction.created_at).toLocaleString()}
                </TableCell>
                <TableCell className="capitalize">{transaction.type}</TableCell>
                <TableCell>
                  {transaction.amount < 0 ? "-" : ""}£
                  {Math.abs(transaction.amount).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell>{transaction.user_id}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          updateTransaction(transaction.id, "completed")
                        }
                        disabled={transaction.status !== "pending"}
                      >
                        Mark as Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRefund(transaction.id)}
                        disabled={transaction.status !== "completed"}
                      >
                        Refund
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
