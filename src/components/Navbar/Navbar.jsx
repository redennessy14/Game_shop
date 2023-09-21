import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">Home </Link>
      <Link to="/market-list">Market List </Link>
      <Link to="/">My profile </Link>
    </div>
  );
};

export default Navbar;
