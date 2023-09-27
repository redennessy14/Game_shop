import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DetailsPage.css";

import { useProduct } from "../../context/productContext";
import CustomCard from "../../components/CustomCard/CustomCard";

const DetailsPage = () => {
  const params = useParams("");
  const { getProductById, product } = useProduct();

  useEffect(() => {
    getProductById(params.id);
  }, []);

  return (
    <CustomCard
      product={product}
      isUserProducts={false}
      onDelete={() => {}}
      className="details"
      className_desc="card_desc_on"
      className__details_img="details_img"
    />
  );
};

export default DetailsPage;
