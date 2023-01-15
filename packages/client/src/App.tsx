import { WsProvider } from "@context/Ws";
import { AppRoutes } from "@pages/AppRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <WsProvider>
        <AppRoutes />
      </WsProvider>
    </BrowserRouter>
  );
}

export default App;
