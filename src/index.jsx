import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";

const appRouter = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="chatbot" element={<Chatbot />} />
      {/* <Route path="error" element={<Error />} /> */}
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
