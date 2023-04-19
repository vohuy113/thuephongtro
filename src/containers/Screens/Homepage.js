import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import Navigate from "./Navigation";
import MySlider from "../../components/MySlider";
import "./styleHome.css";
import Item from "../../components/Item/Item";
import { getListPost } from "../../api/PostApi";
import Search from "./Search/Search";
import { getListLike } from "../../api/getListLikeOfUser"
import { AuthContext } from "../../api/AuthApi";
import { LikePostContext } from "../../api/likePostContext";
// import LikePostManager from "../../api/LikePostManager"; // added import

const contentStyle = {
  height: "160px",
  color: "#322122",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  width: "100vw",
};
const Homepage = () => {
  const { currentUser } = useContext(AuthContext);
  const [listPost, setListPost] = useState([]);
  const [listLike, setListLike] = useState([]);
  const [likedPosts, setLikedPosts] = useContext(LikePostContext)
  const [isLike, setIsLike] = useState(false);
  const handleLike = (postId) => {
    console.log(postId)
    setIsLike(postId);
  }
  useEffect(() => {
    const fetchData = async () => {
      const [postList, likeList] = await Promise.all([
        getListPost(),
        getListLike(currentUser.uid),
      ]).then((values) => {
        console.log(values)
        setListPost(values[0]);
        setListLike(Object.keys?.(values[1]));
      })
    }
    fetchData();
  }, [isLike]);
  console.log(isLike)
  console.log(listLike)
  //console.log(listPost)
  //console.log(likedPosts)
  useEffect(() => {
    let arr = []
    const updatedListPost = listPost.map((post) => {
      const isLiked = listLike.includes(post.postId);
      if (isLiked) { arr.push(post) }
      return { ...post, isLiked };
    });
    setListPost(updatedListPost);
    setLikedPosts(arr); // set likedPosts state
    //setLikedPosts(updatedListPost.filter((post) => post.isLiked))
  }, [listLike]);
  // console.log(likedPosts)
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
      {listPost.map(
        (item, index) => (
          //console.log(item),
          item.isLiked ?
            <Item key={index} post={item} handleLike={handleLike} /> :
            <Item key={index} post={item} handleLike={handleLike} />
        )
      )}
    </div>

  );
};
export default Homepage;


