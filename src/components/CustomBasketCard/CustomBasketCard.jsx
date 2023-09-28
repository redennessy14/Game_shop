import React, { useState, useEffect } from "react";
import "./CustomBasketCard.css";

const CustomBasketCard = ({
  baskets,
  onDelete,
  addBasket,
  removeFromBasket,
  handleAddToBasket,
}) => {
  const [isAddedToBasket, setIsAddedToBasket] = useState(false);

  const handleRemoveFromBasket = () => {
    removeFromBasket(baskets.id);

    const updatedBasketState = JSON.parse(localStorage.getItem("basketState"));
    if (updatedBasketState && updatedBasketState[baskets.id]) {
      delete updatedBasketState[baskets.id];
      localStorage.setItem("basketState", JSON.stringify(updatedBasketState));
    }
  };

  return (
    <div className="basker_card">
      {" "}
      <img className="basket_img" src={baskets.image} alt="Product Image" />
      <div>Name : {baskets.name}</div>
      <div> Desc : {baskets.description}</div>
      <div>Price : {baskets.price}</div>
      <button onClick={handleRemoveFromBasket}>Удалить из корзины</button>
    </div>
  );
};

export default CustomBasketCard;
