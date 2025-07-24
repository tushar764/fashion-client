import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./Store/store"; // ✅ Ensure store is correctly imported
import reportWebVitals from "./reportWebVitals"; // ✅ Keep performance logging
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AlertProvider } from "./Component/common/AlertContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter> {/* ✅ Ensure routing is handled properly */}
    <Provider store={store}> {/* ✅ Redux store provider */}
      <AlertProvider> {/* ✅ Wrap App in AlertProvider */}
        <App />
      </AlertProvider>
    </Provider>
  </BrowserRouter>
);

// Log performance metrics
reportWebVitals();
