import "./index.css";
import { AppRoutes } from "./AppRoutes";
import { PrivyProvider } from "@privy-io/react-auth";
import { useTheme } from "@components/theme/ThemeProvider";
import { Toaster } from "@components/ui/sonner";

const APP_ID = import.meta.env.VITE_PRIVY_APP_ID;

function App() {
  const { currentTheme } = useTheme();

  return (
    <PrivyProvider
      appId={APP_ID}
      // clientId=""
      config={{
        appearance: {
          theme: currentTheme,
          landingHeader: "Log in or sign up to Creator CLub", // Defaults to 'Log in or sign up'
          showWalletLoginFirst: true,
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <>
        <Toaster richColors />
        <AppRoutes />
      </>
    </PrivyProvider>
  );
}

export default App;
