import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../store/hooks";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);

  if (!user && !user?.email) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthWrapper;
