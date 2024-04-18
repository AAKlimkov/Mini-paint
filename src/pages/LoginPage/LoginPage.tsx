import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import LoginForm from "./Components/LoginForm";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { monitorAuthState } from "../../features/auth/authSlice";
import styles from "./LoginPage.module.less";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(monitorAuthState());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate("/files");
    }
  }, [user, navigate]);

  const handleLoginSuccess = () => {
    toast.success("You are logged in!");
    navigate("/files");
  };

  const handleLoginError = (errorMessage: string) => {
    toast.error(errorMessage);
  };

  return (
    <div className={styles.registerFormContainer}>
      <h2>Login to account</h2>
      <Toaster />
      <LoginForm onSuccess={handleLoginSuccess} onError={handleLoginError} />
      <div className={styles.redirectLink}>
        <Link to="/register">Don't have an account? Register here!</Link>
      </div>
    </div>
  );
};

export default LoginPage;
