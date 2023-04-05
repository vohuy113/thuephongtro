import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import axios from "axios";

const contentStyle = {
  height: "160px",
  color: "#322122",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  textColor: "red",
  fontSize: "60px",
};

const ImgSlide = ({ index }) => {
  const [data, setData] = useState();
  return (
    <div>
      <h3 style={contentStyle}>{index}</h3>
    </div>
  );
};

function MySlider() {
  const array = [2, 1, 12, 1];
  return (
    <div>
      <Carousel autoplay>
        {array.map((item, index) => (
          <ImgSlide key={index} index={item} />
        ))}
      </Carousel>
    </div>
  );
}

export default MySlider;
