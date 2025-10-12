import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Cart from "./components/Cart.jsx";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import AllState from "./contexts/AllState.jsx";
import Profile from "./components/Profile.jsx";
import Landing from "./components/Landing.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AllState>
    <RouterProvider router={router} />
  </AllState>
);
