import React from "react";
import "./Home.css";
import Carousel from "../../components/Carousel/Carousel";

const Home = () => {
  return (
    <div>
      <Carousel />

      <div className="home_block">
        <img
          className="home_img"
          src="https://www.starbreeze.com/_next/image/?url=https%3A%2F%2Fsbreezebackend.wpengine.com%2Fwp-content%2Fuploads%2F2023%2F06%2FSplash_Updated.png&w=3840&q=75"
          alt=""
        />
        <p>Name</p>
        <img
          className="home_img"
          src="https://www.starbreeze.com/_next/image/?url=https%3A%2F%2Fsbreezebackend.wpengine.com%2Fwp-content%2Fuploads%2F2023%2F06%2FSplash_Updated.png&w=3840&q=75"
          alt=""
        />
        <p>Name</p>
        <img
          className="home_img"
          src="https://www.starbreeze.com/_next/image/?url=https%3A%2F%2Fsbreezebackend.wpengine.com%2Fwp-content%2Fuploads%2F2023%2F06%2FSplash_Updated.png&w=3840&q=75"
          alt=""
        />
        <p>Name</p>
        <img
          className="home_img"
          src="https://www.starbreeze.com/_next/image/?url=https%3A%2F%2Fsbreezebackend.wpengine.com%2Fwp-content%2Fuploads%2F2023%2F06%2FSplash_Updated.png&w=3840&q=75"
          alt=""
        />
        <p>Name</p>
      </div>
    </div>
  );
};

export default Home;
