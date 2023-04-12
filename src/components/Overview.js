import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../api/AuthApi";
import InputFormV2 from "./InputFormV2";
import InputReadOnly from "./InputReadOnly";
import SelectAddress from "./SelectAddress";
import { InputNumber } from 'antd';

const Overview = ({ payload, setPayload }) => {
  const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [acreage, setAcreage] = useState("");
  // useEffect(() => {
  //   setPayload((prev) => ({ ...prev, title: title ? title : "" }));
  // }, [title]);
  //console.log(title);
  return (
    <div>
      {" "}
      <h2 className="font-semibold text-xl py-4">Thông tin mô tả</h2>
      <div className="w-full flex flex-col gap-4">
        <InputFormV2
          value={payload.title}
          setValue={setPayload}
          name="title"
          label="Tiêu đề"
        // onChange={(e) => {
        //   //console.log(e.target.value);
        //   setTitle(e.target.value);
        // }}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="desc">Nội dung mô tả</label>
          <textarea
            id="desc"
            cols="30"
            rows="10"
            className="w-full rounded-md outline-none border border-gray-300 p-2"
            //value={payload.description}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, description: e.target.value }))
            }
          // onChange={(e) => {
          //   console.log(e.target.value);
          // }}
          ></textarea>
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <InputReadOnly
            label="Thông tin liên hệ"
            value={currentUser?.email || "ten"}
          />
          <InputReadOnly label="Điện thoại" value={currentUser?.phone} />
          <div className="flex flex-col gap-2">
            <label htmlFor="price">Giá cho thuê (đồng)</label>
            <InputNumber
              id="price"
              className="w-full rounded-md outline-none border border-gray-300 p-2"
              value={payload.price}
              onChange={(value) => setPayload((prev) => ({ ...prev, price: value }))}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đồng'}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              placeholder="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
            />
          </div>
          <InputFormV2
            value={payload.acreage}
            setValue={setPayload}
            name="acreage"
            label="Diện tích"
            unit="m2"
          />
          <SelectAddress
            //value={payload.target}
            //setValue={setPayload}
            name="target"
            //options={targets}
            label="Đối tượng cho thuê"
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;

