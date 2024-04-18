import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../store/hooks";

interface UserLoggedProps {
  children: ReactNode;
}

const UserLogged = ({ children }: UserLoggedProps) => {
  const user = useAppSelector((state) => state.auth.user);

  if (user && user.email) {
    return <Navigate to="/files" replace />;
  }

  return children;
};

export default UserLogged;
