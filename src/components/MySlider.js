import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import axios from "axios";
import Item from "antd/es/list/Item";
import { getListPost } from "../api/PostApi";

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
  const [similarPosts, setSimilarPosts] = useState([])
  useEffect(() => {
    const getSimilarPosts = async () => {
      const response = await getListPost();
      console.log(response)
      setSimilarPosts(response);
    }
    getSimilarPosts();
  }, [])
  return (
    <div className="px-48">
      <div className="rounded-xl overflow-hidden">
        <Carousel autoplay>
          {/* {array.map((item, index) => (
            <ImgSlide key={index} index={item} />
          ))} */}
          {
            similarPosts && similarPosts.map((item, index) => (
              <img key={index} src={item.image[0]} className='h-40 object-cover transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:shadow-lg duration-1000' />
            ))
          }
        </Carousel>
      </div>


    </div>
  );
}

export default MySlider;
