import React from "react";
import "./style.css";
import { path } from "../../ultils/constant";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";
const Item = (props) => {
  const {
    title,
    rating,
    image,
    description,
    price,
    acreage,
    address,
    status,
    avt,
    id,
    phone,
  } = props.post;
  return (
    <div className="item-container">
      <div className="img-container">
        <img src={image} />
      </div>
      <div className="detail-item-container">
        <Link
          to={`${path.DETAIL}/${formatVietnameseToString(
            title?.replaceAll("/", "")
          )}/${id}`}
        >
          <div className="title">{title}</div>
        </Link>
        <div className="rating">{rating}</div>
        <div className="attribute-container">
          <div className="price">{price}</div>
          <div className="acreage">{acreage}</div>
          <div className="address">{address}</div>
        </div>
        <div className="description">{description}</div>
        <div className="contact-container">
          <div className="user">
            <img src={avt} />
          </div>
          <div className="phone-container">
            <div className="phone">{phone}</div>
            <div className="status">{status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Item;
