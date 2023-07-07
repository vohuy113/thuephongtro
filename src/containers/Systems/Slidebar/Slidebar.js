import React from "react";
import menuManage from "../../../ultils/menuManage";
import "./style.css";
import app, { database } from "../../../firebase";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../api/AuthApi";
import { } from "../../../components";
import { AiOutlineUser } from "react-icons/ai";
import { Avatar, Menu, Button } from 'antd';
import { ref, child, get, off } from "firebase/database"
import { getAuth } from "firebase/auth";
const auth = getAuth(app);
const Slidebar = () => {

  const { currentUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState('')
  useEffect(() => {
    const dbRef = ref(database);
    const getAvatar = async () => {
      // console.log(database)
      console.log(dbRef)
      await get(child(dbRef, `Users/${auth.currentUser.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val().avatar);
          setAvatar(snapshot.val().avatar)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    getAvatar();
    // return () => {
    console.log(dbRef);
    // }
  }, [])
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
        <Avatar src={avatar}
          className="w-20 h-20 border-solid"
          icon={<AiOutlineUser style={{ color: 'white' }} />} />
        <div>{currentUser.displayName} </div>
      </div>
      {/* <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <Button text={"Nạp tiền"} bgColor={"bg-secondary1"} />
        <Button className="bg-secondary2" style={{ borderRadius: "5px" }}>Đăng tin</Button>
      </div> */}
      <div className="slidebar-container">
        <Menu mode="inline" theme="light">
          {menuManage.map((item) => (
            <Menu.Item key={item.id}>
              <Link to={item?.path}>
                {item.text}
              </Link>
            </Menu.Item>
          ))}
          <Menu.Item><Link to={'tin-da-luu'}></Link>Tin đã lưu</Menu.Item>
          <Menu.Item>Bảng giá dịch vụ</Menu.Item>
          <Menu.Item>Thoát</Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Slidebar;

