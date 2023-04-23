import React, { useContext, useState } from "react";
import "./style.css";
import { AuthContext } from "../../api/AuthApi";
import { path } from "../../ultils/constant";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";
import icons from "../../ultils/icons";
import { Button, Space } from "antd";
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import writeUserData, { getPostIdOnClick, removeLikePostData, writeLikePostToData } from "../../api/addUserToFirebase";
import { useEffect } from "react";
const { HiOutlineLocationMarker } = icons;
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
    //  handleLike
  } = post;
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
          <div className="title font-bold text-lg mb-2">{title}</div>
          <div className="attribute-container flex justify-between mb-2">
            <div className="acreage">{acreage} m2</div>
            <div className="price">{price} tr/tháng</div>
          </div>
          <div className="contact-container flex justify-between">
            <div className="address flex items-center">
              <HiOutlineLocationMarker className="mr-2" />
              {address}
            </div>

          </div>
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

