import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";

const Navbar = () => {
  const { handleLogout } = useContext(authContext);
  const isAdmin = "islam@new.com";

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const handlePageReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const userData = JSON.parse(user);
      const emailValue = userData.email;
      setCurrentUser(emailValue);
    }
  }, []);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div className="navbar">
      <Link to="/">Домашняя страница </Link>
      <Link to="/market-list">Магазин</Link>
      <Link to="/basket">Корзина</Link>{" "}
      <div>
        <button
          className={currentUser ? "btn" : null}
          onClick={() => navigate("/login")}
        >
          Войти
        </button>
        <button
          className={currentUser ? "btn" : null}
          onClick={() => navigate("/register")}
        >
          Регистрация
        </button>
        {currentUser ? (
          <Link className="profile-button" onClick={toggleProfile}>
            Мой профиль{" "}
            {isProfileOpen ? (
              <ul className="subcategories">
                {isAdmin === currentUser && (
                  <Link to="/create-category">
                    <div>Создать категорию</div>
                  </Link>
                )}
                {isAdmin === currentUser && (
                  <Link to="/create-card">
                    <div>Создать продукт</div>
                  </Link>
                )}
                <div onClick={() => handleLogout(navigate)}>
                  Выйти из аккаунта
                </div>
              </ul>
            ) : null}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
