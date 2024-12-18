import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
  const slides = [
    {
      image: "https://via.placeholder.com/800x400?text=Slide+1",
      title: "Summer Collection",
      description: "Get up to 50% off on selected items",
    },
    {
      image: "https://via.placeholder.com/800x400?text=Slide+2",
      title: "New Arrivals",
      description: "Check out our latest fashion trends",
    },
    {
      image: "https://via.placeholder.com/800x400?text=Slide+3",
      title: "Special Offers",
      description: "Limited time deals",
    },
  ];

  return (
    <div className="w-full aspect-[21/9] md:aspect-[21/7] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
