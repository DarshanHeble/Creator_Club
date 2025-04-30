import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "@radix-ui/themes/styles.css";
import "./index.css";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute={"class"}>
      <Theme accentColor="plum">
        <PrivyProvider
          appId="cma1etucc000djx0mwvfr4g8b"
          // clientId=""
          config={{
            appearance: {
              theme: "dark",
              landingHeader: "Log in or sign up to Creator CLub", // Defaults to 'Log in or sign up'
              showWalletLoginFirst: true,
            },
            // Create embedded wallets for users who don't have a wallet
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </PrivyProvider>
      </Theme>
    </ThemeProvider>
  </StrictMode>,
);
