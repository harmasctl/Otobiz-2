import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { TempoDevtools } from "tempo-devtools";
import { insertInitialData } from "./lib/initialData";
import { AppProvider } from "@/context/AppContext";

TempoDevtools.init();

// Insert initial data
insertInitialData().catch(console.error);

const basename = import.meta.env.BASE_URL;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
);
