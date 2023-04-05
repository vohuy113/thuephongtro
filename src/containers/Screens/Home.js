import React from "react";
import Header from "../../components/Header";
import Navigation from "./Navigation";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
