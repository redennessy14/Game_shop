import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">Домашняя страница </Link>
      <Link to="/market-list">Магазин</Link>
      <Link to="/basket">Корзина</Link>
      <Link to="/">Мой профиль </Link>
    </div>
  );
};

export default Navbar;
