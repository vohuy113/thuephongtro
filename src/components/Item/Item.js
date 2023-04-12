import React from "react";
import "./style.css";
import { path } from "../../ultils/constant";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";
import icons from "../../ultils/icons";
import { Button, Space } from "antd";
const { HiOutlineLocationMarker } = icons;
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
    <div className="item-container bg-white rounded-lg shadow-md overflow-hidden">
      <Link
        className="item-link"
        to={`${path.DETAIL}/${formatVietnameseToString(
          title?.replaceAll("/", "")
        )}/${id}`}
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
            <div className="phone-container">
              <div className="phone">
                <Space wrap>
                  <Button>{phone}</Button>
                </Space>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default Item;

