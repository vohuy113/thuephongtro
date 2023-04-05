import React, { useEffect, useState } from "react";
import SelectAddress from "./SelectAdress";
import {
  apiGetPublicDistrict,
  apiGetPublicProvince,
} from "../api/getApiProvince";

const Address = () => {
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState();
  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvince();
      console.log(response?.data.results);
      setProvinces(response?.data.results);
    };
    fetchPublicProvince();
  }, []);
  useEffect(() => {
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      console.log(response);
      setDistricts(response?.data?.results);
    };
    province && fetchPublicDistrict();
  }, [province]);
  return (
    <div>
      <h2 className="font-semibold text-xl py-4">Địa chỉ cho thuê</h2>
      <div className="flex flex-colum gap-4">
        <div className="flex items-center gap-4">
          <SelectAddress
            value={province}
            setValue={setProvince}
            label="Tỉnh/TP"
            option={provinces}
            type="province"
          />
          <SelectAddress
            value={district}
            setValue={setDistrict}
            type="district"
            label="Quận/Huyện"
            option={districts}
          />
        </div>
        <div>Địa chỉ chính xác</div>
      </div>
    </div>
  );
};

export default Address;
