import React, { useState, useEffect, useContext, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { productsContext } from "../../context/productContext";
import "./Carousel.css";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const { getProducts, products } = useContext(productsContext);
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => {
      setCurrentSlide(current);
    },
    prevArrow: <button className="slick-arrow slick-prev"></button>,
    nextArrow: <button className="slick-arrow slick-next"></button>,
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (sliderRef.current) {
        const nextSlide = (currentSlide + 1) % products.length;
        sliderRef.current.slickGoTo(nextSlide);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [currentSlide, products.length]);

  return (
    <div className="carousel-container">
      <Slider className="carousel-slide" ref={sliderRef} {...settings}>
        {products
          ? products.map((product) => (
              <div
                onClick={() => navigate(`/product-detail/${product.id}`)}
                key={product.id}
                className_slide="carousel-slide"
              >
                <img className="carousel_image" src={product.image} />
              </div>
            ))
          : "Empty"}
      </Slider>
    </div>
  );
};

export default Carousel;
