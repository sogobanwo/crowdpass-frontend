"use client";
import React, { act } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

type Props = {};

const EventCarousel = (props: Props) => {
  const images = ["https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/carousel1_cnsop2.png", "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/carousel2_qgonb8.png","https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/carousel1_cnsop2.png","https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/carousel2_qgonb8.png","https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/carousel1_cnsop2.png",];
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1.5,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: true,
    activeDot: true,
    dotsClass: "slick-dots slick-thumb",
    customPaging: function(i: number) {
        return (
            <img src={`https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633483/inactive-dot_niv409.png`} />
        );
      },
  };
  return (
    <div className="slider-container ">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="mx-6">
            <img src={image} alt="carousel-image"  className="h-24 w-[200px]  md:h-60 md:w-[400px]  lg:h-80 lg:w-[650px] mb-3 rounded-xl"/>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EventCarousel;
