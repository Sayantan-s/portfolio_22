import { useWebS } from "@hooks";
import { AppRoutes } from "@pages/AppRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  const { isConnected } = useWebS();
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
