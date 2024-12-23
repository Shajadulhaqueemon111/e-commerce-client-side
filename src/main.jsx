import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import router from "./components/router/AllRoute.jsx";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <div className=" mx-auto">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
