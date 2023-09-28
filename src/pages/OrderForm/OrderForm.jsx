import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../context/productContext";
import { useParams } from "react-router-dom";

const OrderForm = ({ onOrder, productId }) => {
  const { product, getProducts, getProductById } = useContext(productsContext);
  const [orderData, setOrderData] = useState({
    name: "",
    email: "",
    address: "",
    quantity: 1,
  });
  const [productPrice, setProductPrice] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getProducts();
    getProductById(id);
  }, []);

  console.log(id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOrder = () => {
    // Ваша логика обработки заказа
    console.log("Order data:", orderData);
    // Очистить данные формы заказа
    setOrderData({ name: "", email: "", address: "", quantity: 1 });
  };

  return (
    <div className="order-form">
      <h2>Форма заказа</h2>
      <div>Цена товара: {id == product.id ? product.price : "Неизвестно"}</div>

      <button onClick={handleOrder}>Оформить заказ</button>
    </div>
  );
};

export default OrderForm;
