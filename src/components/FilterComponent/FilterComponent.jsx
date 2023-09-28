import React, { useContext } from "react";
import { productsContext } from "../../context/productContext";
import "./FilterComponent.css";

const FilterComponent = () => {
  const { filterProductsByCategory } = useContext(productsContext);

  return (
    <div className="filter-container">
      <label className="form-label">Category</label>
      <select
        defaultValue="all"
        name="category"
        onChange={(e) => filterProductsByCategory(e.target.value)}
      >
        <option value="all">All</option>
        <option value="Экшен">Экшен</option>
        <option value="Приключение">Приключение</option>
        <option value="Ролевая игра">Ролевая игра</option>
        <option value="Стратегия">Стратегия</option>
        <option value="Спортивная игра">Спортивная игра</option>
        <option value="MMO">MMO</option>
        <option value="MMO">MMO</option>
        <option value="MMO">MMO</option>
      </select>
    </div>
  );
};

export default FilterComponent;
