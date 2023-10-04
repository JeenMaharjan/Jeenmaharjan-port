import React, { useState, useEffect } from 'react';
import home from "./meropasal/home.jpg";
import shop from "./meropasal/shop.jpg";
import cart from "./meropasal/cart.jpg";
import chat from "./meropasal/chat.jpg";
import lists from "./meropasal/lists.jpg";
import login from "./meropasal/login.jpg";
import services from "./meropasal/services.jpg";
import cover from "./portfolios/cover.jpg";
import desc from "./portfolios/desc.jpg";
import dumi from "./portfolios/dumi.jpg";
import dumi1 from "./portfolios/dumi1.jpg";
import img1 from "./portfolios/img1.jpg";
import img2 from "./portfolios/img2.jpg";
import travel from "./portfolios/travel.jpg";
import travel1 from "./portfolios/travel1.jpg";
import travel3 from "./portfolios/travel3.jpg";
import furnature from "./portfolios/furnature.jpg";
import furnature1 from "./portfolios/furnature1.jpg";
import furnature2 from "./portfolios/furnature2.jpg";
import furnature3 from "./portfolios/furnature3.jpg";
import card from "./components/card.jpg";
import cards from "./components/cards.jpg";
import form from "./components/form.jpg";
import form1 from "./components/form1.jpg";
import form2 from "./components/form2.jpg";
import galery from "./components/galery.jpg";
import galery1 from "./components/galery1.jpg";
import galery2 from "./components/galery2.jpg";
import hover from "./components/hover.jpg";
import loader from "./components/loader.jpg";
import movie from "./components/movie.jpg";
import netflix from "./components/netflix.jpg";
import product from "./components/product.jpg";
import product1 from "./components/product1.jpg";
import slide from "./components/slide.jpg";
import slide1 from "./components/slide1.jpg";
import verify from "./components/verify.jpg";

import './imageSlider.css'; // Add CSS styles for the image slider here

const ImageSlider = ({ onClose, title }) => {
  let slidesData = [];

  // Define the slidesData array based on the title passed to the component
  if (title === "Mero Pasal") {
    slidesData = [home, shop, cart, chat, lists, login, services];
  } else if (title === "Front-End Designs") {
    slidesData = [cover, desc,img1,img2,furnature,furnature1,furnature2,furnature3,travel, travel1 , travel3, dumi, dumi1];
  } else if (title === "Components Designs") {
    slidesData = [form , form1 , galery1 , galery2 , product , product1  , movie , netflix , slide  , slide1 ,  galery , hover , loader , form2 , card , verify ,cards ];
  }

  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prevActiveSlide) => (prevActiveSlide + 1) % slidesData.length);
  };

  const prevSlide = () => {
    setActiveSlide((prevActiveSlide) =>
      prevActiveSlide === 0 ? slidesData.length - 1 : prevActiveSlide - 1
    );
  };

  return (
    <div className="sliderBody" onClick={onClose}>
      <div className="sliderContainer">
        {slidesData.map((slide, index) => (
          <div
            key={index}
            className={`Slide ${index === activeSlide ? 'Active' : ''}`}
            style={{ backgroundImage: `url(${slide})` }}
            onClick={(e) => e.stopPropagation()} // Prevent event bubbling to the sliderBody
          ></div>
        ))}

        <button
          className="Arrow leftArrow"
          id="left"
          style={{color:"blue"}}
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
        >
          <i className="fas fa-arrow-left"></i>
        </button>

        <button
          className="Arrow rightArrow"
          id="right"
          style={{color:"blue"}}
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
        >
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
