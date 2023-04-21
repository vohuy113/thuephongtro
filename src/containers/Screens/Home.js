import React from "react";
import Header from "../../components/Header";
import Navigation from "./Navigation";
import { Outlet } from "react-router";
import Footer from "../../components/Footer";
const Home = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
