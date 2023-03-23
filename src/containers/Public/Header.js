import React from "react";
import logo from "../../assets/logo.png";
import { Button } from "../../components";
import icons from "../../ultils/icons";
import { useNavigate, Link } from "react-router-dom";
import { useCallback } from "react";
import { path } from "../../ultils/constant";
const Header = () => {
  const navigate = useNavigate();
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

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
        <small>Phongtro.com xin chào</small>
        <Button
          text={"Đăng nhập"}
          textColor="text-white"
          bgColor="bg-[#3961fb]"
          onClick={() => goLogin(false)}
        />
        <Button
          text={"Đăng ký"}
          textColor="text-white"
          bgColor="bg-[#3961fb]"
          onClick={() => goLogin(true)}
        />
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
