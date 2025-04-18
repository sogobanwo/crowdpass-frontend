"use client";

import Slider from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

type Props = {};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const ScrollSection = (props: Props) => {
  const scrollImg = [
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1743585175/horusLabs_jgtd5c.svg",
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742642681/sn-foundation_jxk0gk.png",
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742642681/argent_ktvrwz.png",
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742642681/sn_dqa0q2.png",
  ];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const content = scrollImg.map((image, index) => {
    return (
      <div className="flex justify-center items-center" key={index}>
        <img src={image} alt="parthner" className="h-8 lg:h-12 w-32 flex justify-center mx-4 lg:mx-0"/>
      </div>
    );
  });

  return (
    <>
      <motion.h1
        className="text-white text-center text-4xl lg:text-5xl font-medium pt-16 pb-10 raleway"
        variants={itemVariants}
      >
        Our Partners
      </motion.h1>
      <Slider
        {...settings}
        className="flex items-center justify-center bg-[#14141A] h-16 lg:h-20 py-4"
      >
        {content}
      </Slider>
    </>
  );
};

export default ScrollSection;
