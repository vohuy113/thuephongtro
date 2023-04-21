import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import Navigate from "./Navigation";
import MySlider from "../../components/MySlider";
import "./styleHome.css";
import Item from "../../components/Item/Item";
import { getListPost } from "../../api/PostApi";
import Search from "./Search";
import { getListLike } from "../../api/getListLikeOfUser"
import { AuthContext } from "../../api/AuthApi";
import { LikePostContext } from "../../api/likePostContext";
import RecentPosts from "../../components/RecentPosts";
import { List } from "antd";
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
    <div className="w-[1108px] items-center justify-between">
      <div className="w-full flex flex-col items-center justify-start">
        <Outlet />
      </div>
      < Search />
      <div className="w-full p-2">
        <MySlider></MySlider>
      </div>
      <div className="w-full flex flex-row justify-around">
        <div className="w-3/4">
          {/* {listPost.map(
            (item, index) => (
              //console.log(item),
              item.isLiked ?
                <Item key={index} post={item} handleLike={handleLike} /> :
                <Item key={index} post={item} handleLike={handleLike} />
            )
          )} */}
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 10,
            }}
            dataSource={listPost}
            renderItem={item => (
              <Item key={item.postId} post={item} handleLike={handleLike} />
            )}
            footer={<div>Antd List footer part</div>}
          />
        </div>
        <div className="w-1/4 m-5 rounded-md overflow-hidden">
          <div className="bg-slate-100 h-10 mb-1  w-full ">
            <h2 className="text-center text-slate-800 font-bold text-lg">Tin mới đăng</h2>
          </div>

          <RecentPosts />
        </div>
      </div>

    </div>

  );
};
export default Homepage;


