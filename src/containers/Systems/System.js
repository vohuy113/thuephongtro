import React, { useContext, useEffect, useId, useState } from "react";
import { path } from "../../ultils/constant";
import { Navigate, Outlet } from "react-router";
import { getAuth } from "firebase/auth";
import app from "../../firebase";
import { AuthContext } from "../../api/AuthApi";
import { useLocation } from "react-router";
import Header from "./Header";
import Slidebar from "./Slidebar/Slidebar";
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
    <div className="w-1100 h-screen flex flex-col">
      <Header />
      <div style={{ height: "100%" }} className="flex flex-row">
        <Slidebar />
        <Outlet />
      </div>
    </div>
  );
};
export default System;
