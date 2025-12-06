import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import { HelmetProvider } from "react-helmet-async";

const container = document.getElementById("root");

if (!container) {
    throw new Error("Root element not found");
}

const root = createRoot(container);

root.render(
    <HelmetProvider>
        <App />
    </HelmetProvider>
);
