import React, { useContext, useState } from "react";
import "./style.css";
import relativeTime from 'dayjs/plugin/relativeTime';

import { AuthContext } from "../../api/AuthApi";
import { path } from "../../ultils/constant";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";
import icons from "../../ultils/icons";
import { Button, Space } from "antd";
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import writeUserData, { getPostIdOnClick, removeLikePostData, writeLikePostToData } from "../../api/addUserToFirebase";
import { useEffect } from "react";
import dayjs from "dayjs";
const { HiOutlineLocationMarker } = icons;
dayjs.extend(relativeTime);
const Item = ({ post, handleLike }) => {
  const {
    title,
    rating,
    image,
    description,
    price,
    acreage,
    address,
    avt,
    phone,
    isLiked,
    postId,
    postingTime
  } = post;
  const formattedPostingTime = dayjs(postingTime?.toDate()).fromNow();
  const { currentUser } = useContext(AuthContext);
  const [isLike, setIsLike] = useState(false)
  const [postRef, setPostRef] = useState(null);
  const handleLikePost = () => {
    setIsLike(!isLike);
    console.log(handleLike)
    handleLike((pre) => !pre);
  }
  //console.log(postRef)
  useEffect(() => {
    if (isLike) {
      setPostRef(writeLikePostToData(currentUser.uid, postId));
    } else {
      if (postRef) {
        removeLikePostData(currentUser.uid, postRef);
      }
    }
    // console.log(isLike)
  }, [isLike])
  useEffect(() => {
    if (isLiked) {
      setIsLike(true)
    }
  }, [isLiked])

  return (
    <div className="item-container bg-white rounded-lg  overflow-hidden">
      <Link
        className="item-link"
        to={`${path.DETAIL}/${formatVietnameseToString(
          title?.replaceAll("/", "")
        )}/${postId}`}
      >
        <div className="img-container">
          <img className="img-item" src={image} />
        </div>
        <div className="detail-item-container p-4">
          <div className="title font-bold text-lg mb-1">{title}</div>
          <div className="font-semibold text-slate-500">{acreage} m²</div>
          <div className="price mb-9 ">{(price / 1000000).toFixed(1)} tr/tháng</div>
          <div className="flex justify-between">
            <div className="flex items-center text-slate-500">
              <HiOutlineLocationMarker className="mr-2" />
              {address}
            </div>
          </div>
          <div className="">{formattedPostingTime}</div>
        </div>
      </Link>
      <div className="phone">
        <Space wrap>
          <Button onClick={handleLikePost} icon={isLike ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />} />
        </Space>
      </div>

    </div>
  );
};
export default Item;

