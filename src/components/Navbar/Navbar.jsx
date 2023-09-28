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
      <Link className="link-style" to="/">
        Домашняя страница{" "}
      </Link>
      <Link className="link-style" to="/market-list">
        Магазин
      </Link>
      <Link className="link-style" to="/basket">
        Корзина
      </Link>{" "}
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
          <Link className="profile-button link-style" onClick={toggleProfile}>
            Мой профиль{" "}
            {isProfileOpen ? (
              <ul className="subcategories">
                {isAdmin === currentUser && (
                  <Link className="link-style-category" to="/create-category">
                    <div>Создать категорию</div>
                  </Link>
                )}
                {isAdmin === currentUser && (
                  <Link className="link-style-category" to="/create-card">
                    <div>Создать продукт</div>
                  </Link>
                )}
                <Link
                  className="link-style-category"
                  onClick={() => handleLogout(navigate)}
                >
                  Выйти из аккаунта
                </Link>
              </ul>
            ) : null}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
