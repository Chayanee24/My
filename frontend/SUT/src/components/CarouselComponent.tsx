import React from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Button, Slider} from "antd";
import { Link } from "react-router-dom";

const CarouselComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", textAlign: "center" }}>
      <Slider {...settings}>
        <div>
          <img
            src="https://via.placeholder.com/800x400?text=Slide+1"
            alt="Slide 1"
            style={{ width: "100%", height: "400px" }}
          />
        </div>
        <div>
          <img
            src="https://via.placeholder.com/800x400?text=Slide+2"
            alt="Slide 2"
            style={{ width: "100%", height: "400px" }}
          />
        </div>
        <div>
          <img
            src="https://via.placeholder.com/800x400?text=Slide+3"
            alt="Slide 3"
            style={{ width: "100%", height: "400px" }}
          />
        </div>
      </Slider>
      <div style={{ marginTop: "20px" }}>
        <Link to="/login"> 
            <Button
            type="primary"
            shape="round"
            size="large"
            style={{ margin: "10px", backgroundColor: "red", borderColor: "red" }}>
            เข้าสู่หน้าหลัก
            </Button>
        </Link>
        <Button
          shape="round"
          size="large"
          style={{ margin: "10px", backgroundColor: "green", borderColor: "green" }}
        >
          ติดต่อ LINE
        </Button>
        <Button
          shape="round"
          size="large"
          style={{ margin: "10px", backgroundColor: "blue", borderColor: "blue" }}
        >
          การแสดง
        </Button>
        <Button
          shape="round"
          size="large"
          style={{ margin: "10px", backgroundColor: "purple", borderColor: "purple" }}
        >
          ซื้อของที่ระลึก
        </Button>
      </div>
    </div>
  );
};

export default CarouselComponent;
