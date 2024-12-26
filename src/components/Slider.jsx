import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = ({ imageUrl = "/homepage-slider.optimized.jpeg" }) => {
  const navigate = useNavigate();
  const isSecondSlider = imageUrl.includes("slider-2");
  const bgColor = isSecondSlider ? "bg-[#23856D]" : "bg-[#23A6F0]";

  const slideContent = isSecondSlider ? {
    title: "Vita Classic Product",
    subtitle: "SUMMER 2020",
    description: "We know how large objects will act, but things on a small scale.",
    price: "$16.48",
  } : {
    title: "NEW COLLECTION",
    subtitle: "SUMMER 2025",
    description: "Discover our latest collection with special discounts",
  };

  return (
    <div className={`w-full ${isSecondSlider ? "h-[1000px]" : "h-[800px]"} relative`}>
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
        className="w-full h-full [&_.swiper-button-next]:!text-white [&_.swiper-button-prev]:!text-white [&_.swiper-pagination-bullet]:!bg-white [&_.swiper-pagination-bullet]:!opacity-50 [&_.swiper-pagination-bullet-active]:!opacity-100"
      >
        {[1, 2, 3].map((_, index) => (
          <SwiperSlide
            key={index}
            className={`relative w-full h-full ${bgColor}`}
          >
            {isSecondSlider ? (
              <div className="absolute inset-0 flex flex-col">
                <div className="flex-1 flex items-start justify-center pt-24">
                  <div className="text-white text-center max-w-xl">
                    <p className="text-xl mb-6">{slideContent.subtitle}</p>
                    <h2 className="text-5xl font-bold mb-6">{slideContent.title}</h2>
                    <p className="text-xl mb-6">{slideContent.description}</p>
                    {slideContent.price && (
                      <p className="text-3xl font-bold mb-6">{slideContent.price}</p>
                    )}
                    <button
                      onClick={() => navigate("/shop")}
                      className="bg-[#2DC071] text-white px-8 py-4 rounded-md font-bold hover:bg-opacity-90 transition-all mb-16"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
                <img
                  src={imageUrl}
                  alt={slideContent.title}
                  className="w-[800px] h-auto object-contain"
                />
              </div>
            ) : (
              <>
                <img
                  src={imageUrl}
                  alt={slideContent.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center max-w-xl">
                    <p className="text-xl mb-6">{slideContent.subtitle}</p>
                    <h2 className="text-5xl font-bold mb-6">{slideContent.title}</h2>
                    <p className="text-xl mb-6">{slideContent.description}</p>
                    <button
                      onClick={() => navigate("/shop")}
                      className="bg-[#2DC071] text-white px-8 py-4 rounded-md font-bold hover:bg-opacity-90 transition-all"
                    >
                      SHOP NOW
                    </button>
                  </div>
                </div>
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
