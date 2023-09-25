import React, { useContext, useEffect } from "react";
import { productsContext } from "../../context/productContext";
import CustomBasketCard from "../../components/CustomBasketCard/CustomBasketCard";

const Basket = () => {
  const { getBasket, baskets, removeFromBasket, addBasket, handleAddToBasket } =
    useContext(productsContext);
  useEffect(() => {
    getBasket();
  }, []);
  console.log(baskets);
  return (
    <div>
      {" "}
      <h3>Корзина</h3>
      {baskets
        ? baskets.map((item) => (
            <CustomBasketCard
              baskets={item}
              key={item.id}
              addBasket={addBasket}
              removeFromBasket={removeFromBasket}
              handleAddToBasket={handleAddToBasket}
            />
          ))
        : "Empty"}
    </div>
  );
};

export default Basket;
