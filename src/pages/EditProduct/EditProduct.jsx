import React, { useContext, useEffect, useState } from "react";

import "./EditProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { productsContext } from "../../context/productContext";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState("");
  const { products, editProduct, categories, getCategories, getProductById } =
    useContext(productsContext);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getCategories();
    getProductById(id);
  }, []);

  useEffect(() => {
    if (products) {
      setName(products.name);
      setDescription(products.description);
      setImage(products.image);
      setPrice(products.price);
      setSelectedCategory(products.category);
    }
  }, [products]);

  const handleSubmit = async () => {
    const product = {
      name,
      description,
      price,
      image,
      category: selectedCategory,
    };
    for (const key in product) {
      if (!product[key].trim()) {
        return alert("Заполните все поля");
      }
    }
    await editProduct(product, id);
    setName("");
    setDescription("");
    setPrice("");
    setSelectedCategory("");
    setImage("");
    navigate("/market-list");
  };

  return (
    <div className="form-wrapper">
      <h3>Редактировать</h3>
      <div>
        <input
          type="text"
          placeholder="Изображение"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ввеедите название"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Введите описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Choose category</option>
          {categories &&
            categories.map((item) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
        </select>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default EditProduct;
