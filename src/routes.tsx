import { RouteObject } from "react-router-dom";
import Home from "./components/home";
import Marketplace from "./pages/marketplace";
import VehicleDetails from "./pages/vehicles/[id]";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import AnalyticsDashboard from "./components/admin/AnalyticsDashboard";
import UsersManagement from "./components/admin/UsersManagement";
import ListingsManagement from "./components/admin/ListingsManagement";
import ContentManagement from "./components/admin/ContentManagement";
import SupportDashboard from "./components/admin/SupportDashboard";
import EmailTemplateEditor from "./components/admin/EmailTemplateEditor";
import SystemSettingsForm from "./components/admin/SystemSettingsForm";
import MonetizationDashboard from "./components/admin/MonetizationDashboard";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/marketplace",
    element: <Marketplace />,
  },
  {
    path: "/vehicles/:id",
    element: <VehicleDetails />,
  },
  {
    path: "/admin",
    element: (
      <AdminLayout>
        <Dashboard />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/analytics",
    element: (
      <AdminLayout>
        <AnalyticsDashboard />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <AdminLayout>
        <UsersManagement />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/listings",
    element: (
      <AdminLayout>
        <ListingsManagement />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/content",
    element: (
      <AdminLayout>
        <ContentManagement />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/support",
    element: (
      <AdminLayout>
        <SupportDashboard />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/email-templates",
    element: (
      <AdminLayout>
        <EmailTemplateEditor />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/settings",
    element: (
      <AdminLayout>
        <SystemSettingsForm />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/monetization",
    element: (
      <AdminLayout>
        <MonetizationDashboard />
      </AdminLayout>
    ),
  },
];

export default routes;
