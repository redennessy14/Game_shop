import React, { useState, useEffect, useContext } from "react";
import "./CustomCard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { productsContext } from "../../context/productContext";
import { v4 as uuidv4 } from "uuid";

const CustomCard = ({
  product,
  onDelete,

  className = "",
  className_market = "",
  className_desc = "",
  className__details_img = "",
  className_like_off = "",
}) => {
  const navigate = useNavigate();
  const [isAddedToBasket, setIsAddedToBasket] = useState(false);
  const {
    addBasket,
    removeFromBasket,
    createComment,
    editProduct,
    getProductById,
    getProducts,
  } = useContext(productsContext);
  const [isLiked, setIsLiked] = useState(
    localStorage.getItem(`liked-${product.id}`) === "true"
  );
  const isAdmin = "islam@new.com";

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(product.likes || 0);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const basketState = JSON.parse(localStorage.getItem("basketState"));
    if (basketState && basketState[product.id]) {
      setIsAddedToBasket(true);
    }
  }, [product.id]);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const userData = JSON.parse(user);
      const emailValue = userData.email;
      setCurrentUser(emailValue);
    }
  }, []);

  const handleToggleBasket = async (e) => {
    e.stopPropagation();
    try {
      if (!isAddedToBasket) {
        await addBasket(product);
      } else {
        await removeFromBasket(product.id);
      }

      setIsAddedToBasket((prev) => !prev);

      const updatedBasketState =
        JSON.parse(localStorage.getItem("basketState")) || {};
      updatedBasketState[product.id] = !isAddedToBasket;
      localStorage.setItem("basketState", JSON.stringify(updatedBasketState));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(product.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit-product/${product.id}`);
  };

  const handleOrderForm = (e) => {
    e.stopPropagation();
    navigate(`/order-form/${product.id}`);
  };

  const handleAddComment = async () => {
    const newComment = {
      author: currentUser,
      comment,
      id: uuidv4(),
    };
    if (!comment.trim()) {
      return alert("Заполните все поля");
    }
    const updatedData = { ...product };
    console.log(updatedData);
    updatedData.comments.push(newComment);
    editProduct(updatedData, product.id);
    // await createComment(newComment, product.id);
    setComment("");
  };

  const handleLike = () => {
    const updatedProduct = { ...product };
    const currentUserEmail = currentUser;

    const hasLiked = updatedProduct.likesEmail.some(
      (like) => like.author === currentUserEmail
    );

    if (hasLiked) {
      updatedProduct.likesEmail = updatedProduct.likesEmail.filter(
        (like) => like.author !== currentUserEmail
      );
    } else {
      const updatedLikes = { userId: uuidv4(), author: currentUserEmail };
      updatedProduct.likesEmail.push(updatedLikes);
    }

    setLikes((prevLikes) => {
      const updatedLikesCount = hasLiked ? prevLikes - 1 : prevLikes + 1;
      setIsLiked(!hasLiked);
      return updatedLikesCount > 0 ? updatedLikesCount : 0;
    });

    editProduct(updatedProduct, product.id);
  };
  const lengthLikes =
    product && product.likesEmail ? product.likesEmail.length : 0;

  const displayCommentsById = (productId) => {
    const productComments = product.comments;

    if (!productComments || productComments.length === 0) {
      return <div>нет комментариев .</div>;
    }

    return productComments.map((comment) => (
      <div key={comment.id} className="comment">
        <strong>{comment.author}:</strong> {comment.comment}
      </div>
    ));
  };

  return (
    <div
      className={`card ${className_market} ${className}`}
      onClick={() => navigate(`/product-detail/${product.id}`)}
    >
      <img
        src={product.image}
        alt="Product Image"
        className={`custom_img ${className__details_img}`}
      />
      <div>Name: {product.name}</div>
      <div className={`card_desc ${className_desc}`}>
        Desc: {product.description}
      </div>
      <div>Price: {product.price} $</div>
      <div className={`like_on ${className_like_off}`}>
        <div>
          Лайки:{lengthLikes}
          <button onClick={handleLike}>Лайк</button>
        </div>
        <div>
          <p>Комментарии:</p>
          {displayCommentsById(product.id)}
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="comment-input"
          />
          <button onClick={handleAddComment}>Добавить комментарий</button>
        </div>
      </div>

      <div className="card-buttons">
        {isAdmin === currentUser && (
          <button className="btn_delete" onClick={handleDelete}>
            Удалить
          </button>
        )}
        {isAdmin === currentUser && (
          <button className="btn_edit" onClick={handleEdit}>
            Редактировать
          </button>
        )}
        <button
          onClick={handleToggleBasket}
          className={`basket-button ${
            isAddedToBasket ? "added-to-basket" : ""
          }`}
        >
          Добавить в корзину
        </button>
        <button className="btn_buy" onClick={handleOrderForm}>
          Купить
        </button>
      </div>
    </div>
  );
};

export default CustomCard;
