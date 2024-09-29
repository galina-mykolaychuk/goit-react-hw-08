import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import App from "./App.jsx";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      {" "}
      {/* Додано Provider для Redux */}
      <PersistGate loading={null} persistor={persistor}>
        {" "}
        {/* Додано PersistGate */}
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
