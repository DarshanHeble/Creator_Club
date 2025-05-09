import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "@radix-ui/themes/styles.css";
import "./index.css";
import { Theme } from "@radix-ui/themes";
// import { ThemeProvider } from "next-themes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@components/theme/ThemeProvider.tsx";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <ThemeProvider attribute={"class"}> */}
      <ThemeProvider>
        <Theme accentColor="plum">
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Theme>
      </ThemeProvider>
    </BrowserRouter>

    {/* </ThemeProvider> */}
  </StrictMode>,
);
