import React, { useEffect } from "react";
import logo from "../../assets/logo.png";
import { Button } from "../../components";
import icons from "../../ultils/icons";
import { useNavigate, Link } from "react-router-dom";
import { useHref } from "react-router";
import { useCallback, useState } from "react";
import { path } from "../../ultils/constant";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

import app from "../../firebase";
const Header = () => {
  const navigate = useNavigate();
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

  const [isLogin, setIsLogin] = useState(false);

  const auth = getAuth(app);

  //const history = useNavigate();

  const showUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setIsLogin(true);
        navigate("/", { replace: true });
        //window.location.replace("/");
        // ...
      } else {
        setIsLogin(false);
      }
    });
  };
  useEffect(() => {
    showUser();
  }, []);
  //showUser();
  // // set persist User
  // const UserPersist = () => {
  //   setPersistence(auth, browserSessionPersistence)
  //     .then(() => {
  //       // Existing and future Auth states are now persisted in the current
  //       // session only. Closing the window would clear any existing state even
  //       // if a user forgets to sign out.
  //       // ...
  //       // New sign-in will be persisted with session persistence.
  //       return signInWithEmailAndPassword(auth, email, password);
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //     });
  // };

  return (
    <div className="w-1100 flex items-center justify-between">
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
          <Button
            text={"Đăng xuất"}
            textColor="text-white"
            bgColor="bg-[#33ffff]"
            //onClick={() => goLogin(true)}
          />
        )}
        <Button
          text={"Đăng tin mới"}
          textColor="text-white"
          bgColor="bg-secondary2"
          IcAfter={icons.AiOutlinePlusCircle}
        />
      </div>
    </div>
  );
};
export default Header;
