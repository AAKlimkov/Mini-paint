import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../../../firebaseConfig";
import styles from "./RegistrationForm.module.less";

interface RegistrationFormProps {
  onSuccess: () => void;
  onError: (errorMessage: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSuccess,
  onError,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      onSuccess();
    } catch (error) {
      onError("Registration failed. Please try again.");
    }
  };

  return (
    <div className={styles.registrationFormContainer}>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          variant="outlined"
          {...register("email", { required: true })}
          error={!!errors.email}
          helperText={errors.email && "Email is required"}
          className={styles.textInput}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          {...register("password", { required: true })}
          error={!!errors.password}
          helperText={errors.password && "Password is required"}
          className={styles.textInput}
        />
        <Button
          type="submit"
          variant="contained"
          className={styles.submitButton}
        >
          Register
        </Button>
        <div className={styles.redirectLink}>
          <Link to="/login">Already have an account? Login here!</Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
