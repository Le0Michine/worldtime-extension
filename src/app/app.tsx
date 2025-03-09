import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { AppMain } from "./app.main.js";
import { store } from "../app.common/store.js";
import { ErrorBoundary } from "../app.common/error-boundary.js";

const app = document.getElementById("app");
const reactRoot = createRoot(app);

reactRoot.render(
  <ErrorBoundary>
    <Provider store={store}>
      <AppMain />
    </Provider>
  </ErrorBoundary>,
);

// if (process.env.TARGET === "firefox") {
//   require("../scss/firefox.scss");
// }
