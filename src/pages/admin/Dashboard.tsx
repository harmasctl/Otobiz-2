import AdminLayout from "@/components/admin/AdminLayout";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
