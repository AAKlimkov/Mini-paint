import React from "react";

import { Link } from "react-router-dom";

const HomePage: React.FC = () => (
  <div>
    <h1>Выберите действие</h1>
    <Link to="/login">Авторизация</Link>
    <Link to="/register">Регистрация</Link>
  </div>
);

export default HomePage;
