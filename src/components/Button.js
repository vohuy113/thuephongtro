// import React from "react";
// import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
// const Button = ({ text, textColor, bgColor, IcAfter, onClick, fullWidth }) => {
//   return (
import React from "react";
import { Button } from 'antd';
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
const CustomButton = ({ text, textColor, bgColor, IcAfter, onClick, fullWidth }) => {
  return (
    <Button
      type="button"
      className={`${textColor} ${bgColor}`}
      style={fullWidth && { width: "100%" }}
      onClick={onClick}
    >
      <span>{text}</span>
      <span>{IcAfter && <IcAfter />}</span>
    </Button>


  );
};
export default CustomButton;


//   );
// };
// export default Button;
