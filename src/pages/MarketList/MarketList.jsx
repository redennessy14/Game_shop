import React, { useContext, useEffect, useState } from "react";
import "./MarketList.css";
import { productsContext } from "../../context/productContext";
import CustomCard from "../../components/CustomCard/CustomCard";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import CustomPagination from "../../components/CustomPagination";
import FilterComponent from "../../components/FilterComponent/FilterComponent";

const MarketList = () => {
  const {
    getProducts,
    products,
    deleteProduct,
    addBasket,
    removeFromBasket,
    categories,
    getCategories,
    getProductById,
  } = useContext(productsContext);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getProducts(searchParams.get("_page") || 1);
  }, [searchParams]);

  const onDelete = async (id) => {
    await deleteProduct(id);
    await getProducts();
  };

  return (
    <div className="marker_list">
      <h3>Магазин</h3>
      <div className="filter">
        <FilterComponent />
      </div>

      <div className="market_item">
        {Array.isArray(products) && products.length > 0 ? (
          products
            .filter((product) =>
              selectedCategory ? product.category === selectedCategory : true
            )
            .map((item) => (
              <CustomCard
                product={item}
                key={item.id}
                onDelete={onDelete}
                addBasket={addBasket}
                removeFromBasket={removeFromBasket}
                className="custom_card"
              />
            ))
        ) : (
          <p>Нет продуктов для отображения.</p>
        )}
      </div>
      <CustomPagination />
    </div>
  );
};

export default MarketList;
