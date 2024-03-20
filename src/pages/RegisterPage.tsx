/* eslint-disable no-console */
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../firebaseConfig";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const { user } = userCredential;
          console.log(user);
        })
        .catch((error1) => {
          const errorCode = error1.code;
          const errorMessage = error1.message;
          console.log(errorCode, errorMessage);
        });
    } catch (error2) {
      setError("Ошибка регистрации");
    }
  };

  return (
    <div>
      <h1>Регистрация</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Имя"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
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
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegisterPage;
