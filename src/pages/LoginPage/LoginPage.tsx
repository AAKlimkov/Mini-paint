import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import styles from "./LoginPage.module.less";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { monitorAuthState } from "../../features/auth/authSlice";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(monitorAuthState());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      console.log("User is logged in:", user.displayName || user.email);
    } else {
      console.log("User is not logged in.");
    }
  }, [user]);
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
      <div>
        Don't have an account? <Link to="/register">Register here</Link>
      </div>
    </div>
  );
};

export default LoginPage;
