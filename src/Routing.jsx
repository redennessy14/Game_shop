import React from "react";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import CreateCard from "./components/CreateCard/CreateCard";
import MarketList from "./pages/MarketList/MarketList";

const Routing = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />}></Route>
      <Route path="/create-card" element={<CreateCard />}></Route>
      <Route path="/market-list" element={<MarketList />}></Route>
    </Routes>
  );
};

export default Routing;
