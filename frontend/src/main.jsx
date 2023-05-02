import React from "react";
import ReactDOM from "react-dom/client";
import Home, { action as joinAction } from "./index";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./routes/contact";
import JoinRoom from "./routes/go";
import  { loader as roomLoader } from './components/JoinForm'

const router = createBrowserRouter([
    {
        index: true,
        element: <Home />,
    },
    {
        path: "/contact",
        element: <Contact />
    },
    {
        path: "/go/:id",
        element: <JoinRoom />,
        action: joinAction,
        loader: roomLoader,
    },
    {
        path: "*",
        element: <Home />,
        
    }

]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
  // <React.StrictMode>
  //   <RouterProvider router={router} />
  // </React.StrictMode>
