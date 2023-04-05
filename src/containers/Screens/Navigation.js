import React from "react";
import readDb from "../../read_db_firebase";
import { Button } from "../../components";
import { useNavigate } from "react-router";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex justify-center items-center h-[40px] bg-secondary1 text-white drop-shadow-2xl"
      style={{ width: "100%" }}
    >
      <div
        className="w-1100 hover:cursor-pointer"
        onClick={() => navigate("/", { replace: true })}
      >
        Trang chủ
      </div>
    </div>
  );
};
export default Navigation;
