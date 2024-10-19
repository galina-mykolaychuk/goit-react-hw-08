import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"; // Додаємо імпорт BrowserRouter
import { store } from "./redux/store";
import App from "./App.jsx";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      {" "}
      {/* Обгортаємо App у BrowserRouter */}
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
