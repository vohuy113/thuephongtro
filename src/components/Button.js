import React from "react";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
const Button = ({ text, textColor, bgColor, IcAfter, onClick, fullWidth }) => {
  return (
    <button
      type="button"
      className={`py-2 px-2 ${textColor} ${bgColor} outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
      style={fullWidth && { width: "100%" }}
      onClick={onClick}
    >
      <span>{text}</span>
      <span>{IcAfter && <IcAfter />}</span>
    </button>
  );
};
export default Button;
