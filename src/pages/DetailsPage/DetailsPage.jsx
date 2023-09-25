import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DetailsPage.css";

import { useProduct } from "../../context/productContext";
import CustomCard from "../../components/CustomCard/CustomCard";

const DetailsPage = () => {
  const params = useParams("");
  const { getProductById, products } = useProduct();

  useEffect(() => {
    getProductById(params.id);
  }, []);

  if (!products) return <h3>loading...</h3>;
  return (
    <CustomCard product={products} isUserProducts={false} onDelete={() => {}} />
  );
};

export default DetailsPage;