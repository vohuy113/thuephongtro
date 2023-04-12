import React from "react";
import menuManage from "../../../ultils/menuManage";
import "./style.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../api/AuthApi";
import { Button } from "../../../components";
import { AiOutlineUser } from "react-icons/ai";
import { Avatar } from 'antd';

const Slidebar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div
      style={{
        width: 200,
        backgroundColor: "#F0F2F5",
        height: "100%",
        marginTop: "8px",
        borderRadius: "10px",
        padding: "10px"
      }}
    >
      <div
        style={{
          backgroundColor: "#E6E6FA",
          padding: "4px",
          borderRadius: "4px",
          marginBottom: "10px",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "20px"
        }}
      >
        <Avatar style={{ backgroundColor: '#8A2BE2', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={<AiOutlineUser style={{ color: 'white' }} />} />
        {currentUser.email}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        {/* <Button text={"Nạp tiền"} bgColor={"bg-secondary1"} /> */}
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

