import React, { useContext, useEffect, useId, useState } from "react";
import { path } from "../../ultils/constant";
import { Navigate, Outlet } from "react-router";
import { getAuth } from "firebase/auth";
import app from "../../firebase";
import { AuthContext } from "../../api/AuthApi";
import { useLocation } from "react-router";
import Header from "./HeaderSystem";
import Slidebar from "./Slidebar/Slidebar";
import HeaderSystem from "./HeaderSystem";
// import Header from "../../components/Header";
// import { checkLogin } from "../../store/reducers/checkLogin";
const System = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  if (!currentUser) return <Navigate to={`/${path.LOGIN}`} replace={true} />;

  function HeaderView() {
    const location = useLocation();
    console.log(location.pathname);
    return <span>Path : {location.pathname}</span>;
  }
  HeaderView();
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <HeaderSystem />
      <div className="w-1100 flex flex-row mt-20">
        <Slidebar />
        <Outlet />
      </div>
    </div>
  );
};
export default System;
