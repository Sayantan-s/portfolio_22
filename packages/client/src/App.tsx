import { WsProvider } from "@context/Ws";
import { AppRoutes } from "@pages/AppRoutes";
import { store } from "@store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <WsProvider>
        <AppRoutes />
      </WsProvider>
    </Provider>
  );
}

export default App;
