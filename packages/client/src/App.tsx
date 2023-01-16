import { WsProvider } from "@context/Ws";
import { AppRoutes } from "@pages/AppRoutes";
import { store } from "@store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <WsProvider>
          <AppRoutes />
        </WsProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
