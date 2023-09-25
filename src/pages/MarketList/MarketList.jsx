import React, { useContext, useEffect, useState } from "react";
import "./MarketList.css";
import { productsContext } from "../../context/productContext";
import CustomCard from "../../components/CustomCard/CustomCard";

import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const MarketList = () => {
  const { getProducts, products, deleteProduct, addBasket, removeFromBasket } =
    useContext(productsContext);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getProducts();
  }, []);
  const onDelete = async (id) => {
    await deleteProduct(id);
    await getProducts();
  };

  return (
    <div>
      <h3>Магазин</h3>
      <div className="market_item">
        {Array.isArray(products) && products.length > 0
          ? products.map((item) => (
              <CustomCard
                product={item}
                key={item.id}
                onDelete={onDelete}
                addBasket={addBasket}
                removeFromBasket={removeFromBasket}
              />
            ))
          : "Empty"}
      </div>
    </div>
  );
};

export default MarketList;
