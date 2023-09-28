import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DetailsPage.css";

import { productsContext, useProduct } from "../../context/productContext";
import CustomCard from "../../components/CustomCard/CustomCard";

const DetailsPage = () => {
  const params = useParams("");
  const { getProductById, product } = useProduct();
  const { addBasket } = useContext(productsContext);

  useEffect(() => {
    getProductById(params.id);
  }, []);

  return (
    <div>
      {" "}
      <CustomCard
        product={product}
        isUserProducts={false}
        onDelete={() => {}}
        className="details"
        className_desc="card_desc_on"
        className__details_img="details_img"
        className_like_off="like_off"
      />
    </div>
  );
};

export default DetailsPage;
