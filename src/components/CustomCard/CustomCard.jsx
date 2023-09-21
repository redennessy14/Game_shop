import React from "react";
import "./CustomCard.css";

const CustomCard = ({ product }) => {
  console.log(product, "csac");
  return (
    <div>
      {" "}
      <div>Name : {product.name}</div>
      <div>Image : {product.image}</div>
      <div>Desc : {product.description}</div>
      <div>Price :{product.price}</div>
    </div>
  );
};

export default CustomCard;
