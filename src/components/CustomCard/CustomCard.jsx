import React, { useState, useEffect } from "react";
import "./CustomCard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CustomCard = ({
  product,
  onDelete,
  addBasket,
  removeFromBasket,
  className = "",
}) => {
  const navigate = useNavigate();
  const [isAddedToBasket, setIsAddedToBasket] = useState(false);

  useEffect(() => {
    const basketState = JSON.parse(localStorage.getItem("basketState"));
    if (basketState && basketState[product.id]) {
      setIsAddedToBasket(true);
    }
  }, [product.id]);

  const handleToggleBasket = async (e) => {
    e.stopPropagation();
    try {
      if (!isAddedToBasket) {
        await addBasket(product);
      } else {
        await removeFromBasket(product.id);
      }

      setIsAddedToBasket((prev) => !prev);

      const updatedBasketState =
        JSON.parse(localStorage.getItem("basketState")) || {};
      updatedBasketState[product.id] = !isAddedToBasket;
      localStorage.setItem("basketState", JSON.stringify(updatedBasketState));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(product.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit-product/${product.id}`);
  };

  return (
    <div
      className={`custom_card ${className}`}
      onClick={() => navigate(`/product-detail/${product.id}`)}
    >
      <img src={product.image} alt="Product Image" />
      <div>Name: {product.name}</div>
      <div>Desc: {product.description}</div>
      <div>Price: {product.price}</div>
      <button onClick={handleDelete}>Удалить</button>
      <button onClick={handleEdit}>Редактировать</button>
      <button
        onClick={handleToggleBasket}
        className={`basket-button ${isAddedToBasket ? "added-to-basket" : ""}`}
      >
        Корзина
      </button>
    </div>
  );
};

export default CustomCard;
