import React, { memo } from "react";
const SelectAdress = ({ label, option, value, setValue, type }) => {
  console.log(option);
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium " htmlFor="select-address">
        {label}
      </label>
      <select
        value={value}
        id="select-address"
        onChange={(e) => setValue(e.target.value)}
      >
        <option>{`--Chọn ${label}--`}</option>
        {option?.map((item) => {
          return (
            <option
              key={type === "province" ? item?.province_id : item?.district_id}
              value={
                type === "province" ? item?.province_id : item?.district_id
              }
            >
              {type === "province" ? item?.province_name : item?.district_name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default memo(SelectAdress);
