/* eslint-disable no-console */
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../firebaseConfig";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const { user } = userCredential;
          console.log(user);
        })
        .catch((error1) => {
          const errorCode = error1.code;
          const errorMessage = error1.message;
          console.log(errorCode, errorMessage);
        });
      navigate("/welcome");
    } catch (error2) {
      setError("Ошибка авторизации");
      console.error(error2);
    }
  };

  return (
    <div>
      <h1>Авторизация</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;
