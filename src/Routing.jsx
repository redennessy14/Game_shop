import React from "react";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import CreateCard from "./components/CreateCard/CreateCard";
import MarketList from "./pages/MarketList/MarketList";
import EditProduct from "./pages/EditProduct/EditProduct";
import Basket from "./pages/Basket/Basket";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import CreateCategory from "./pages/CreateCategory/CreateCategory";

import OrderForm from "./pages/OrderForm/OrderForm";

const Routing = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />}></Route>
      <Route path="/create-card" element={<CreateCard />}></Route>
      <Route path="/market-list" element={<MarketList />}></Route>
      <Route path="/edit-product/:id" element={<EditProduct />} />
      <Route path="/basket" element={<Basket />} />
      <Route path="/product-detail/:id" element={<DetailsPage />} />
      <Route path="/create-category" element={<CreateCategory />} />
      <Route path="/order-form/:id" element={<OrderForm />} />
    </Routes>
  );
};

export default Routing;
