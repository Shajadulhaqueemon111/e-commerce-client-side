import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
const Banner = () => {
  const imazeSize = {
    height: "600px",
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <div style={{ position: "relative" }}>
          <SwiperSlide>
            <img
              style={imazeSize}
              src="https://i.ibb.co.com/JmQ5Y23/fashionable-clothes-boutique-store-london-600nw-589577570.webp"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              style={imazeSize}
              src="https://i.ibb.co.com/H7xWmJM/Made-in-the-USA-Clothing-Brands.jpg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              style={imazeSize}
              src="https://i.ibb.co.com/7txvN3j/fashionable-girl-shopping-store-255667-18955.jpg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              style={imazeSize}
              src="https://i.ibb.co.com/4gQdbw8/istockphoto-1466000525-612x612.jpg"
            />
          </SwiperSlide>
        </div>
      </Swiper>
    </>
  );
};

export default Banner;
