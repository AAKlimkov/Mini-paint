import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/store";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root not found");
}
const container = createRoot(root);

container.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
);
