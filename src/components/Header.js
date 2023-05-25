import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import { Button } from ".";
import icons from "../ultils/icons";
import { useNavigate, Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { path } from "../ultils/constant";
import "./styleBtn.css";
import menuManage from "../ultils/menuManage";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../firebase";
import { User } from "./User/User";
import CustomButton from "./Button";
import { Navigation } from "../containers/Screens";
import { MenuOutlined } from '@ant-design/icons';
const Header = () => {
  const navigate = useNavigate();

  const [isShowManage, setIsShowManage] = useState(false);
  const [user, setUser] = useState("");
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

  const [isLogin, setIsLogin] = useState(false);

  const auth = getAuth(app);
  const showUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setIsLogin(true);
        navigate("/", { replace: true });
      } else {
        setIsLogin(false);
      }
    });
  };
  // show menu User
  const [isShowMenu, setIsShowMenu] = useState(false);
  const LogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIsLogin(false);
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useEffect(() => {
    showUser();
  }, []);
  const [showHeader, setShowHeader] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setShowHeader(true)
        console.log(window.scrollY)
      } else {
        setShowHeader(false)
      }
    })
  }, [])
  console.log(showHeader)
  let toggleClass = showHeader ? 'fixed' : '';
  return (
    <div className={`fixed z-10 bg-slate-50 w-full shadow-lg px-4 `}>
      <div className=" flex items-center justify-between">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="w-[240]px h-[70px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-1">
          {!isLogin && (
            <div className="flex items-center gap-1">
              <small>Phongtro.com xin chào</small>
              <Button
                text={"Đăng nhập"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => {
                  goLogin(false);
                }}
              />
              <Button
                text={"Đăng ký"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(true)}
              />
            </div>
          )}
          {isLogin && (
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
                    bgColor="bg-blue-500"

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
          )}
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
export default Header;
