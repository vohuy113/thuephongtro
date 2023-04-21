import React, { memo } from "react";
// import { Button } from 'antd';
const Button = ({ text, textColor, bgColor, IcAfter, onClick, fullWidth }) => {
  return (
    <button
      type="button"
      className={`${textColor} ${bgColor} h-7 outline-none rounded-lg hover:underline flex items-center justify-center gap-1 p-2 `}
      style={fullWidth && { width: "100%" }}
      onClick={onClick}
    >
      <span>{text}</span>
      <span>{IcAfter && <IcAfter />}</span>
    </button>


  );
};
export default memo(Button);

