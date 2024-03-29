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
import ".././assets/css/grid.css"
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
        // console.log(window.scrollY)
      } else {
        setShowHeader(false)
      }
    })
  }, [])
  // console.log(showHeader)
  let toggleClass = showHeader ? '' : '';
  let toggleClass1 = showHeader ? 'scale-75 transition duration-500 ease-in-out' : 'transition duration-500 ease-in-out';
  return (
    <div className={`${toggleClass} transition duration-700 hover:pb-4 fixed z-10 bg-[#019594] w-full shadow-lg px-4`}>
      <div className={`${showHeader ? '-translate-y-2 transition duration-500 ease-in-out' : 'transition duration-500 ease-in-out'} flex items-center justify-between`}>
        <div  className="grid wide">
            <div className="row">
             <div className="col l-5 s-5">
                <Link to={"/"}>
                <img
                  src={logo}
                  alt="logo"
                  className={`${toggleClass1} h-[85px] object-contain ml-5`}
                />
                </Link>
             </div>
             <div className="col l-7 s-7 mt-5">
              <div className="grid">
                {!isLogin && (
                  <div className="row">
                    <small className="col l-4">Phongtro.com xin chào</small>
                    <Button
                      className='col l-4'
                      text={"Đăng nhập"}
                      textColor="text-white"
                      bgColor="bg-[#3961fb]"
                      onClick={() => {
                        goLogin(false);
                      }}
                    />
                    <Button
                      className='col l-4'
                      text={"Đăng ký"}
                      textColor="text-white"
                      bgColor="bg-[#3961fb]"
                      onClick={() => goLogin(true)}
                    />
                  </div>
                )}
                {isLogin && (
                  <>
                    <div className="row"> 
                      <div className="col l-4 s-0">
                        <User/>                     
                      </div>
                      <div className="col l-8 s-0">
                        <div className="grid">
                          <div className="row">
                              <div className="col l-4">
                                <Link to={"/he-thong/tin-da-luu"}>
                                  <Button
                                  fullWidth={'100%'}
                                  text={"Yêu thích"}
                                  textColor="text-red-600"
                                  bgColor="bg-red-50"
                                  IcAfter={icons.AiFillHeart}
                                />
                                </Link>
                              </div>
                              <div className="user_name col l-4">
                                  <Button
                                    fullWidth={'100%'}
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
                        }}>
                        Đăng xuất
                      </span>
                                    </div>
                                             )}
                              </div>
                              <div className="col l-4">
                                  <Link to={"/he-thong/tao-moi-bai-dang"}>
                                  <Button
                                    text={"Đăng tin mới"}
                                    textColor="text-white"
                                    fullWidth={'100%'}
                                    bgColor="bg-secondary2"
                                    IcAfter={icons.AiOutlinePlusCircle}
                                  />
                                  </Link>
                              </div>
                          </div>
                        </div>
                      </div>
                      <div className="col l-0 s-12 s-o-10">
                          <Button
                            IcAfter={icons.AiOutlineMenu}
                            onClick={()=>setIsShowManage((pre) => !pre)}
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
            }}>
            Đăng xuất
          </span>
                        </div>
                                 )}
                  
                      </div>
                    </div>
                  </>
                )}
              </div>
             </div>
            </div>
        </div>
      </div>
    </div>

  );
};
export default Header;
