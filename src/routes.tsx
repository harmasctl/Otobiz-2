import React from "react";
import { RouteObject } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/admin/Dashboard";
import UsersManagement from "./components/admin/UsersManagement";
import ListingsManagement from "./components/admin/ListingsManagement";
import AnalyticsDashboard from "./components/admin/AnalyticsDashboard";
import EmailTemplateEditor from "./components/admin/EmailTemplateEditor";
import SystemSettingsForm from "./components/admin/SystemSettingsForm";
import MonetizationDashboard from "./components/admin/MonetizationDashboard";
import ContentManagement from "./components/admin/ContentManagement";
import SupportDashboard from "./components/admin/SupportDashboard";
import AdminGuard from "./components/admin/AdminGuard";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: (
      <AdminGuard>
        <Dashboard />
      </AdminGuard>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <AdminGuard>
        <UsersManagement />
      </AdminGuard>
    ),
  },
  {
    path: "/admin/listings",
    element: (
      <AdminGuard>
        <ListingsManagement />
      </AdminGuard>
    ),
  },
  {
    path: "/admin/analytics",
    element: (
      <AdminGuard>
        <AnalyticsDashboard />
      </AdminGuard>
    ),
  },
  {
    path: "/admin/email-templates",
    element: (
      <AdminGuard>
        <EmailTemplateEditor />
      </AdminGuard>
    ),
  },
  {
    path: "/admin/settings",
    element: (
      <AdminGuard>
        <SystemSettingsForm />
      </AdminGuard>
    ),
  },
  {
    path: "/admin/content",
    element: (
      <AdminGuard>
        <ContentManagement />
      </AdminGuard>
    ),
  },
  {
    path: "/admin/support",
    element: (
      <AdminGuard>
        <SupportDashboard />
      </AdminGuard>
    ),
  },
  {
    path: "/admin/monetization",
    element: (
      <AdminGuard>
        <MonetizationDashboard />
      </AdminGuard>
    ),
  },
  {
    path: "/tempobook/*",
    element: <div />, // This is a placeholder for Tempo's internal routing
  },
];

export default routes;
