import React, { useContext, useState } from "react";
import "./CreateCard.css";
import { toast } from "react-toastify";
import { productsContext } from "../../context/productContext";

const CreateCard = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { createProduct } = useContext(productsContext);

  const handleSubmit = async () => {
    const product = {
      image,
      name,
      description,
      price,
      category: selectedCategory,
    };

    // for (const key in product) {
    //   if (!product[key].trim()) {
    //     return toast.warn("Заполните все поля");
    //   }
    // }

    await createProduct(product);

    toast.success("Вы успешно добавили продукт ");

    setName("");
    setDescription("");
    setPrice("");
    setSelectedCategory("");
    setImage("");
    // navigate("/products");
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
      <button onClick={handleSubmit}>Добавить </button>
    </div>
  );
};

export default CreateCard;
