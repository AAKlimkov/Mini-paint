import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import FilesPage from "../pages/FilesPage/FilesPage";
import CanvasPage from "../pages/CanvasPage/CanvasPage";
import AuthWrapper from "./AuthWrapper";
import UserLogged from "./UserLogged";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserLogged>
        <LoginPage />
      </UserLogged>
    ),
  },
  {
    path: "/login",
    element: (
      <UserLogged>
        <LoginPage />
      </UserLogged>
    ),
  },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/files",
    element: (
      <AuthWrapper>
        <FilesPage />
      </AuthWrapper>
    ),
  },
  {
    path: "/create-image",
    element: (
      <AuthWrapper>
        <CanvasPage />
      </AuthWrapper>
    ),
  },
  { path: "/edit-image/:imageName", element: <CanvasPage /> },
]);

export default router;
