import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import styles from "./LoginPage.module.less";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: { email: string; password: string }) => {
    console.log(data);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/files");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Login error:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Login</h1>
        <TextField
          {...register("email", { required: true })}
          label="Email"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email ? "Email is required" : ""}
          fullWidth
        />
        <TextField
          {...register("password", { required: true })}
          label="Password"
          type="password"
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password ? "Password is required" : ""}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
