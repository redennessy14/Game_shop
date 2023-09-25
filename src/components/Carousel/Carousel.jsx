import React, { useState, useEffect, useContext, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { productsContext } from "../../context/productContext";
import "./Carousel.css";

const Carousel = () => {
  const { getProducts, products } = useContext(productsContext);
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

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
    prevArrow: <button className="slick-arrow slick-prev">Previous</button>,
    nextArrow: <button className="slick-arrow slick-next">Next</button>,
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
      <Slider ref={sliderRef} {...settings}>
        {products.map((product, index) => (
          <div key={product.id} className="carousel-slide">
            <img
              className="carousel-image"
              src={product.image}
              alt={`Product ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
