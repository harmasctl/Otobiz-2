import { AppProvider } from "@/context/AppContext";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <AppProvider>{children}</AppProvider>;
};

export default AppProviders;
