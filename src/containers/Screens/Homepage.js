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
import { Button, List } from "antd";
import FooterSlider from "../../components/FooterSlider";
import FindByTag from "../../components/FindByTag";
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

  // truyen prop

  const [message, setMessage] = useState('')

  const callbackFunction = (childData) => {
    setMessage(childData)
    // console.log('re_render')
  }

  const [listToFilter, setListToFilter] = useState([])
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
        // console.log(values)
        setListPost(values[0]);
        setListToFilter(values[0]);
        // console.log(listToFilter)
        setListLike(Object.keys?.(values[1]));
      })
    }
    fetchData();
  }, [isLike]);
  console.log(listLike);
  useEffect(() => {
    const filter = async () => {
      let searchByAddress
      const searchByPrice = await listToFilter?.filter(post => post.price >= (message[0]) * 1000000 && post.price <= message[1] * 1000000);
      // const searchByMessage = searchByPrice?.filter(post => post.acreage.toLowerCase().includes(message[2].toLowerCase()) || post.description.toLowerCase().includes(message[3].toLowerCase()));
      if (message[4]) {
        let filterKey = message[4][1] || message[4][0];
        searchByAddress = await searchByPrice?.filter(post => post.address.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "_")
          .includes(filterKey.toLowerCase()))
      }
      //console.log(searchByPrice[0].address.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "_"));
      const searchByMessage = await searchByAddress ? searchByAddress : searchByPrice.filter(post => post.acreage >= message[2] && post.acreage <= message[3]);

      setListPost(searchByMessage);
    }
    filter();
  }, [message])
  console.log(message)
  useEffect(() => {
    let arr = []
    const updatedListPost = listPost.map((post) => {
      const isLiked = listLike.includes(post.postId);
      if (isLiked) { arr.push(post) }
      return { ...post, isLiked };
    });
    setListPost(updatedListPost);
    setLikedPosts(arr);
    // console.log(arr) // set likedPosts state
    //setLikedPosts(updatedListPost.filter((post) => post.isLiked))
  }, [listLike]);
  console.log(currentUser);
  return (
    // <div className="w-[1200px] items-center justify-between">
    //   <div className="w-full flex flex-col items-center justify-start">
    //     <Outlet />
    //   </div>
    //   < Search parentCallback={callbackFunction} />
    //   {/* <p>{message}</p> */}
    //   <div className="w-full p-2">
    //     <MySlider></MySlider>
    //   </div>
    <div className="grid wide">
      <div className="row">
        <div className="col l-12 s-12">
          <Outlet/>
        </div>
      </div>
      <div className="row">
        <div className="col l-12 s-12">
          <Search parentCallback={callbackFunction} />
        </div>
      </div>
      <div className="row">
        <div className="col l-12 s-0">
          <MySlider></MySlider>
        </div>
      </div>
      <div className="row">
        <div className="col l-12 s-12">
        <div className="grid wide">
        <div className="row">
            <div className="col l-9 s-12">
             <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 4,
              }}
              dataSource={listPost}
              renderItem={item => (
                <Item key={item.postId} post={item} handleLike={handleLike} />
              )}
              footer={<div>Antd List footer part</div>}
              />
            </div>
            <div className="col l-3 mt-5 s-0 rounded-md overflow-hidden">
              <FindByTag />
              <div className="bg-slate-100 mt-3 h-10 mb-1  w-full ">
                <h2 className="text-center text-slate-800 font-bold text-lg">Tin mới đăng</h2>
              </div>
              <RecentPosts />
            </div>
        </div>
      </div>
        </div>
      </div>
    </div>

  );
};
export default Homepage;


