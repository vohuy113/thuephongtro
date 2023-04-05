import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemPost } from "../../../api/PostApi";
import { useLayoutEffect } from "react";
import Item from "../../../components/Item/Item";
import "./style.css";
const DetailPost = () => {
  const { id } = useParams();
  const [item, setItem] = useState(() => {
    return getItemPost(id).then();
  });
  useEffect(() => {
    id && getItemPost(id).then(setItem);
  }, [id]);
  //console.log(item);
  return (
    <div>
      {item && (
        <div>
          <img src={item.image}></img>
          <div className="title">{item.title}</div>
          <div className="item-container-post">
            <div className="address">{item.address}</div>
            <div className="price">{item.price}</div>
            <div className="acreage">{item.acreage}</div>
          </div>
          <div className="description-container">
            <div className="header-description">Thông tin mô tả</div>
            <div className="description">{item.description}</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DetailPost;
