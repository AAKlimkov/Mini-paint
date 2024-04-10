import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { auth } from "../../firebaseConfig";
import styles from "./RegisterPage.module.less";

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Registration error:", error.message);
      } else {
        console.error("Non-Firebase error occurred:", error);
      }
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Register</h1>
        <TextField
          {...register("email", { required: true })}
          label="Email"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email ? "Email is required" : ""}
          fullWidth
        />
        <TextField
          {...register("password", { required: true, minLength: 6 })}
          label="Password"
          type="password"
          variant="outlined"
          error={!!errors.password}
          helperText={
            errors.password
              ? "Password is required and must be at least 6 characters"
              : ""
          }
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
      <div>
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
