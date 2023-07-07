import React, { useState } from "react";
import { Navigation } from "../Screens";
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom";
import { Button } from "../../components";
import icons from "../../ultils/icons";
import menuManage from "../../ultils/menuManage";
import { User } from "../../components/User/User"
import app from "../../firebase";
import { signOut, getAuth } from "firebase/auth";
const HeaderSystem = () => {
  const auth = getAuth(app);
  const [isShowManage, setIsShowManage] = useState(false);
  const LogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // setIsLogin(false);
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className={`fixed z-10 bg-[#019594] w-full shadow-lg px-4 `}>
      <div className=" flex items-center justify-between">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="w-[240]px h-[70px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-1">
          <>
            <User />
            <div className="flex flex-row px-2">
              <div className="mx-2">
                <Link to={"/he-thong/tin-da-luu"}>
                  <Button
                    text={"Yêu thích"}
                    textColor="text-red-600"
                    bgColor="bg-red-50"
                    IcAfter={icons.AiFillHeart}
                  />
                </Link>

              </div>
              <div className="user_name">
                <Button
                  text={"Quản lý tài khoản"}
                  textColor="text-white"
                  bgColor="bg-[#d05031]"

                  IcAfter={icons.AiOutlineMenu} // changed IcAfter to icon
                  onClick={() => setIsShowManage((pre) => !pre)}
                />
                {isShowManage && (
                  <div className="modal_user">
                    {menuManage.map((item) => (
                      <Link
                        className="hover:text-orange-500 flex items-center gap-2 text-blue-500 border-b border-gray-300 py-2"
                        key={item.id}
                        to={item?.path}
                      >
                        {item?.icon}
                        {item.text}
                      </Link>
                    ))}
                    <span
                      className="cursor-pointer hover:text-orange-500 text-blue-500 border-gray-200 py-2"
                      onClick={() => {
                        LogOut();
                        setIsShowManage(false);
                      }}
                    >
                      Đăng xuất
                    </span>
                  </div>
                )}
              </div>

            </div>
          </>
          <Link to={"/he-thong/tao-moi-bai-dang"}>
            <Button
              text={"Đăng tin mới"}
              textColor="text-white"
              bgColor="bg-secondary2"
              IcAfter={icons.AiOutlinePlusCircle}
            />
          </Link>
        </div>
      </div>
      {/* <Navigation /> */}
    </div>
  );
};

export default HeaderSystem;
