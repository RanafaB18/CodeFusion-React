import React from "react";
import ReactDOM from "react-dom/client";
import Home, { action as joinAction } from "./Home";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./routes/contact";
import JoinRoom from "./routes/JoinRoom";
import  { loader as roomLoader } from './components/JoinForm'
import { RoomProvider } from "./context/RoomContext";

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
    <RoomProvider>
        <RouterProvider router={router} />
    </RoomProvider>
);
  // <React.StrictMode>
  //   <RouterProvider router={router} />
  // </React.StrictMode>
