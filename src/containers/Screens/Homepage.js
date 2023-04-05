import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import Navigate from "./Navigation";
import MySlider from "../../components/MySlider";
import "./styleHome.css";
import Item from "../../components/Item/Item";
import { getListPost } from "../../api/PostApi";
import Search from "./Search/Search";
const contentStyle = {
  height: "160px",
  color: "#322122",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  width: "100vw",
};

const Homepage = () => {
  const [listPost, setListPost] = useState([]);
  useEffect(() => {
    getListPost().then(setListPost);
    // console.log("sad", listPost);
  }, []);
  // console.log(getListPost().then());
  return (
    <div className="home-container items-center justify-between">
      {/*
          <Header />
      <Navigate />

  */}
      <div className="w-1100 flex flex-col items-center justify-start">
        <Outlet />
      </div>
      <Search />
      <MySlider></MySlider>
      {listPost.map((item, index) => (
        <Item key={index} post={item} />
      ))}
    </div>
  );
};
export default Homepage;
