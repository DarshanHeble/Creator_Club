import { useConnectionStatus } from "./hooks/useConnectionStatus";

function App() {
  const isConnected = useConnectionStatus();

  return (
    <div className="app">
      <div
        className={`connection-status ${
          isConnected ? "connected" : "disconnected"
        }`}
      >
        Backend is {isConnected ? "Connected" : "Disconnected"}
      </div>
    </div>
  );
}

export default App;
