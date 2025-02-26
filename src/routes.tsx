import { RouteObject, Navigate } from "react-router-dom";
import UserOnboarding from "./components/onboarding/UserOnboarding";
import SellerOnboarding from "./components/seller/SellerOnboarding";
import SellerGuard from "./components/guards/SellerGuard";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import VehicleDetails from "./pages/VehicleDetails";
import SellVehicle from "./pages/SellVehicle";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/admin/Dashboard";
import Dashboard from "./components/admin/Dashboard";
import ListVehicles from "./pages/admin/vehicles/ListVehicles";
import NewVehicle from "./pages/admin/vehicles/new";
import CreateVehicle from "./pages/admin/vehicles/CreateVehicle";
import MonetizationDashboard from "./components/admin/MonetizationDashboard";
import ContentManagement from "./components/admin/ContentManagement";
import SupportDashboard from "./components/admin/SupportDashboard";
import SystemSettingsForm from "./components/admin/SystemSettingsForm";
import UsersManagement from "./components/admin/UsersManagement";
import AdminGuard from "./components/admin/AdminGuard";
import AuthPage from "./components/auth/AuthPage";
import AuthCallback from "./pages/auth/callback";
import ResetPassword from "./pages/auth/reset-password";
import UserProfile from "./components/user/UserProfile";
import SettingsPage from "./pages/settings";
import SellerLayout from "./components/seller/SellerLayout";
import SellerDashboard from "./components/seller/SellerDashboard";
import SellerProfile from "./components/seller/SellerProfile";

const routes: RouteObject[] = [
  {
    path: "/onboarding",
    element: <UserOnboarding />,
  },
  {
    path: "/seller/onboarding",
    element: <SellerOnboarding />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/seller",
    element: (
      <SellerGuard>
        <SellerLayout />
      </SellerGuard>
    ),
    children: [
      { path: "", element: <SellerDashboard /> },
      { path: "profile", element: <SellerProfile /> },
      { path: "vehicles", element: <ListVehicles /> },
    ],
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
    path: "/sell",
    element: <SellVehicle />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/auth/callback",
    element: <AuthCallback />,
  },
  {
    path: "/auth/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/settings/*",
    element: <SettingsPage />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "analytics", element: <Dashboard /> },
      { path: "vehicles", element: <ListVehicles /> },
      { path: "vehicles/new", element: <CreateVehicle /> },
      { path: "content", element: <ContentManagement /> },
      { path: "monetization", element: <MonetizationDashboard /> },
      { path: "support", element: <SupportDashboard /> },
      { path: "settings", element: <SystemSettingsForm /> },
      { path: "users", element: <UsersManagement /> },
    ],
  },
];

export default routes;
