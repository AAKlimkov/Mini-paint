import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import styles from "./RegisterPage.module.less";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegistrationSuccess = () => {
    toast.success("Registration successful!");
    navigate("/login");
  };

  const handleRegistrationError = (errorMessage: string) => {
    toast.error(errorMessage);
  };

  return (
    <div className={styles.registerPageContainer}>
      <Toaster />
      <RegistrationForm
        onSuccess={handleRegistrationSuccess}
        onError={handleRegistrationError}
      />
    </div>
  );
};

export default RegisterPage;
