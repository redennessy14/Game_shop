import React, { useContext, useEffect } from "react";
import "./MarketList.css";
import { productsContext } from "../../context/productContext";
import CustomCard from "../../components/CustomCard/CustomCard";

const MarketList = () => {
  const { getProducts, products } = useContext(productsContext);
  console.log(products, "marke");
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h3>Market List</h3>
      {products
        ? products.map((item) => <CustomCard product={item} key={item.id} />)
        : "Empty"}
    </div>
  );
};

export default MarketList;
