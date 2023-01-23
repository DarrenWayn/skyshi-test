import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Todos from "./components/todos";
import ActivityContextProiver from "./contexts/activity";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/detail/:todoId",
    element: <Todos />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ActivityContextProiver>
      <div className="page">
        <RouterProvider router={router} />
      </div>
    </ActivityContextProiver>
  </React.StrictMode>
);
