import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "../app.common/store.js";
import { AppOptionsMain } from "./app.options.main.js";
import { ErrorBoundary } from "../app.common/error-boundary.js";

const app = document.getElementById("app-options");
const reactRoot = createRoot(app);

reactRoot.render(
  <ErrorBoundary>
    <Provider store={store}>
      <AppOptionsMain />
    </Provider>
  </ErrorBoundary>,
);
