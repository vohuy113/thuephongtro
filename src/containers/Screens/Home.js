
import React from "react";
import Header from "../../components/Header";
import Navigation from "./Navigation";
import { Outlet } from "react-router";
import Footer from "../../components/Footer";
import FooterSlider from "../../components/FooterSlider";
import BackHeadPage from "../../components/BackHeadPage";
const Home = () => {
  return (
    <div className="w-full" >
      <Header />
      <div className="pt-28 flex items-center justify-center">
        <Outlet />
      </div>
      {/* <div className="flex flex-col"> */}
      {/* <FooterSlider /> */}
      <div className="flex justify-center items-center px-10">
        <Footer />
      </div>
      {/* </div> */}
    </div>
  );
};

export default Home;


