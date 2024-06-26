import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import styles from "./LoginForm.module.less";

interface LoginFormProps {
  onSuccess: () => void;
  onError: (errorMessage: string) => void;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      onSuccess();
    } catch (error) {
      onError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <h2>Login to account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.input}
          label="Email"
          variant="outlined"
          {...register("email", { required: true })}
          error={!!errors.email}
          helperText={errors.email && "Email is required"}
        />
        <TextField
          className={styles.input}
          label="Password"
          type="password"
          variant="outlined"
          {...register("password", { required: true })}
          error={!!errors.password}
          helperText={errors.password && "Password is required"}
        />
        <Button
          type="submit"
          variant="contained"
          className={styles.submitButton}
        >
          Login
        </Button>
        <div className={styles.redirectLink}>
          <Link to="/register">Don't have an account? Register here!</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
