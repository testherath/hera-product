import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import { HelmetProvider } from "react-helmet-async";
import { ClerkProvider } from "@clerk/clerk-react";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

const container = document.getElementById("root");

if (!container) {
    throw new Error("Root element not found");
}

const root = createRoot(container);

root.render(
    <HelmetProvider>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            <App />
        </ClerkProvider>
    </HelmetProvider>
);
