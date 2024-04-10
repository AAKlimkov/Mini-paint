import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import FilesPage from "../pages/FilesPage/FilesPage";
import CanvasPage from "../pages/CanvasPage/CanvasPage";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/files", element: <FilesPage /> },
  { path: "/create-image", element: <CanvasPage /> },
]);

export default router;
