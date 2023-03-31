import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="w-full h-[340px] object-cover" src="https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1679670731938-home-sliderdesktop-bambino.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-[340px]" src="https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1679715878509-home-sliderdesktop-samarhogar.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-[340px]" src="https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1679716023098-home-sliderdesktop-generalimport.jpg" alt="" />
        </SwiperSlide>
        
      </Swiper>
    </>
  );
}