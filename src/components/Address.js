import React, { useEffect, useState } from "react";
import SelectAddress from "./SelectAddress";
import {
  apiGetPublicDistrict,
  apiGetPublicProvince,
} from "../api/getApiProvince";
import { Form, InputNumber, Input, Button, Select } from "antd";

import InputReadOnly from "./InputReadOnly";
const Address = ({ form }) => {
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvince();
      //console.log(response?.data.results);
      setProvinces(response?.data.results);

    };
    fetchPublicProvince();
  }, []);
  // useEffect(() => {
  //   const fetchPublicDistrict = async () => {
  //     const response = await apiGetPublicDistrict(province);
  //     //console.log(response);
  //     //  setDistricts(response?.data?.results);
  //   };
  //   province && fetchPublicDistrict();
  // }, [province]);
  const itemsProvince = provinces.map((result, index) => ({
    value: result.province_id,
    label: result.province_name
  }));
  const itemsDictrict = districts.map((result, index) => ({
    value: result.district_id,
    label: result.district_name
  }));

  const handleChange = async (value, item) => {
    setProvince(item.label)
    const response = await apiGetPublicDistrict(value);
    setDistricts(response?.data?.results);
  };

  const handleChangeDic = async (value, item) => {
    console.log(province + item.label)
    form.setFieldValue("address", province + " " + item.label)
  };

  return (
    <div>
      <Form.Item name="province" label="Địa chỉ cho thuê">
        <Select
          defaultValue="Chọn tỉnh"
          style={{ width: 250 }}
          onChange={handleChange}
          options={itemsProvince}
        />
      </Form.Item>
      <Form.Item name="dictrict">
        <Select
          defaultValue="Chọn huyện"
          style={{ width: 250 }}
          onChange={handleChangeDic}
          options={itemsDictrict}
        />
      </Form.Item>
      <Form.Item name="address" label="Địa chỉ chính xác">
        <Input
          disabled
        />
      </Form.Item>

    </div>
  );
};

export default Address;
