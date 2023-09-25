import React, { useContext, useEffect, useState } from "react";
import "./CreateCard.css";
import { toast } from "react-toastify";
import { productsContext } from "../../context/productContext";
import { useNavigate } from "react-router-dom";

const CreateCard = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { createProduct, getCategories, categories } =
    useContext(productsContext);
  const navigate = useNavigate();
  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async () => {
    const product = {
      image,
      name,
      description,
      price,
      category: selectedCategory,
    };

    for (const key in product) {
      if (!product[key].trim()) {
        return alert("Заполните все поля");
      }
    }

    await createProduct(product);

    toast.success("Вы успешно добавили продукт ");

    setName("");
    setDescription("");
    setPrice("");
    setSelectedCategory("");
    setImage("");
    navigate("/market-list");
  };

  return (
    <div className="create_card">
      <h3>Страница добавления</h3>
      <input
        type="text"
        placeholder="Название"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Изображение"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        type="text"
        placeholder="Описание"
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

      <button onClick={handleSubmit}>Добавить </button>
    </div>
  );
};

export default CreateCard;
