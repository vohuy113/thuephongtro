import React, { memo, useState } from "react";

const inputForm = ({ label, ...inputProps }) => {
  //   const [val, setVal] = useState("");
  return (
    <div className="w-full">
      <label htmlFor="phone" className="text-xs">
        {label}
      </label>
      <input
        type="text"
        id="phone"
        className="outline-none bg-[#e8f0fe] p-2 rounded-md"
        style={{ width: "100%" }}
        {...inputProps}
        // onChange={(e) => setVal(e.target.value)}
      />
    </div>
  );
};
export default memo(inputForm);
