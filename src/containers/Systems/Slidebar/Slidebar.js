import React from "react";
import menuManage from "../../../ultils/menuManage";
import "./style.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../api/AuthApi";
import { Button } from "../../../components";
import { BiBorderRadius } from "react-icons/bi";

const Slidebar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div
      style={{
        width: 200,
        backgroundColor: "#DBECE3",
        height: "100%",
        marginTop: "8px",
      }}
    >
      <div
        style={{
          backgroundColor: "#F6EBBE",
          padding: "4px",
          BorderRadius: "4px",
        }}
      >
        {currentUser.email}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button text={"Nạp tiền"} bgColor={"bg-secondary1"} />
        <Button text={"Đăng tin"} bgColor={"bg-secondary2"} />
      </div>
      <div className="slidebar-container">
        {menuManage.map((item) => (
          <Link className="slidebar-system-item" key={item.id} to={item?.path}>
            {item.text}
          </Link>
        ))}
        <div className="slidebar-system-item">Bảng giá dịch vụ</div>
        <div className="slidebar-system-item">Liên hệ</div>
        <div className="slidebar-system-item">Thoát</div>
      </div>
    </div>
  );
};

export default Slidebar;
