import React, { useState, useEffect, memo } from "react";
import { Input, Button } from "antd";
import SearchItem from "../../components/SearchItem/SearchItem";
import icons from "../../ultils/icons";
import '../../assets/css/responsive.css'
import { Modal, Slider, List, Cascader, Form } from "antd";
import { apiGetAllVietNasm, apiGetPublicDistrict, apiGetPublicProvince } from "../../api/getApiProvince";
import { RightOutlined } from "@ant-design/icons"
import { prettyDOM } from "@testing-library/react";
import { Link, useSearchParams } from "react-router-dom";
import { BsX } from "react-icons/bs";
import { getDocs, collection, query, where, getDoc, and } from "firebase/firestore";
import { db } from "../../firebase";
import { getListPost } from "../../api/PostApi";
import { AiFillAccountBook } from "react-icons/ai";
const {
  BsChevronRight,
  HiOutlineLocationMarker,
  TbReportMoney,
  RiCrop2Line,
  MdOutlineHouseSiding,
  FiSearch,
} = icons;
const Search = (props) => {
  // const [content, setContent] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [queries, setQueries] = useState({});
  const showModal = (type) => {
    setIsModalOpen(true);
    setModalType(type);
  };
  const [searchParams, setSearchParams] = useSearchParams()
  const [inputValue, setInputValue] = useState([0, 30])
  const [inputValueDt, setInputValueDt] = useState([0, 90])
  // send data:
  const sendData = (q) => {
    props.parentCallback(q);
  }
  const handleSearch = () => {
    const q = inputValue.concat(inputValueDt);
    if (value) {
      q.push(value);
    }
    sendData(q);
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onAfterChange = (value) => {
    setInputValue(value)
    console.log('onAfterChange: ', value);
  };
  const onAfterChangeDt = (value) => {
    console.log('onAfterChange: ', value);
    setInputValueDt(value)

  };
  const [provinces, setProvinces] = useState([])
  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetAllVietNasm()
      console.log(response?.data)
      setProvinces(response?.data);
    };
    fetchPublicProvince();
  }, []);
  const [value, setValue] = useState("")
  const onChange = async (label) => { setValue(label) }
  console.log(value);
  const renderModalContent = () => {
    switch (modalType) {
      case "location":
        {
          //const options = provinces;
          // const onChange = async (value) => {
          //   console.log(value);
          //   // const provinceIndex = provinces.findIndex((province) => province.province_id == value);
          //   // console.log(provinceIndex);
          //   // let data = await apiGetPublicDistrict(value)
          //   // // provinces[provinceIndex].item = await data?.data?.results
          //   // provinces[provinceIndex].item = await data?.data?.results;
          //   // setProvinces((pre) => {
          //   //   const newProvinces = [...pre];
          //   //   newProvinces[provinceIndex] = provinces[provinceIndex];
          //   //   return newProvinces;
          //   // });

          //   //options[provinceIndex].item = data?.data?.results
          //   //  console.log(options[provinceIndex].item)
          //   //setOptions((prev) => [...prev, options[provinceIndex].item]);
          // };

          // return (
          //   // <Cascader fieldNames={{
          //   //   label: 'name',
          //   //   value: 'codename',
          //   //   children: 'districts',

          //   // }} options={provinces} onChange={onChange} changeOnSelect
          //   // />

          // )
        }
      case "price":
        return (
          <>
            {inputValue && (
              <div>
                Giá từ {inputValue[0]} triệu đến {inputValue[1]} triệu
              </div>
            )}
            <Slider
              range={{ draggableTrack: true }}
              step={0.5}
              defaultValue={[0, 30]}
              max={30}
              //onChange={onChange}
              onAfterChange={onAfterChange}
            />
          </>
        );
      case "area":
        return (
          <>
            {inputValueDt && (
              <div>
                Diện tích từ  {inputValueDt[0]} m2 đến {inputValueDt[1]} m2
              </div>
            )}
            <Slider
              range={{ draggableTrack: true }}
              step={5}
              defaultValue={[0, 90]}
              max={90}
              //onChange={onChangeDt}
              onAfterChange={onAfterChangeDt}
            />
          </>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <Form onFinish={handleSearch}>
        <Form.Item name="location">
          < div className="bg-[#019594] rounded-lg grid wide" >
            {/* <span
              onClick={() => showModal("location")}
              className="cursor-pointer m-1 w-1/4"
            >
              <SearchItem
                IconBefore={<HiOutlineLocationMarker />}
                IconAfter={<BsChevronRight color="rgb(156, 163, 175)" />}
                // text={`${value[1]}/${value[0]}`}
                defaultText={"Toàn quốc"}
              // style={{ index: 1 }}
              />
            </span> */}
              <div className="row p-3">
                  <span className="cursor-pointer overflow-hidden col l-3 s-12 search-item">
                  <Cascader showSearch fieldNames={{
                    label: 'name',
                    value: 'codename',
                    children: 'districts',

                  }} options={provinces} onChange={onChange} changeOnSelect
                    style={{ height: '100%' }}
                    placeholder="Toàn quốc"
                  />
                  </span>
                  <span
                  onClick={() => showModal("price")}
                  className="cursor-pointer col l-3 s-12 search-item"
                >
                  <SearchItem
                    IconBefore={<TbReportMoney />}
                    IconAfter={<BsChevronRight color="rgb(156, 163, 175)" />}
                    // IconAfter={<div onClick={() => setInputValue([])}><BsX color="rgb(156, 163, 175)" /></div>}
                    text={`${inputValue?.[0]} tr - ${inputValue?.[1]} tr`}
                    defaultText={"Chọn giá"}
                  />
    
                  </span>     
                  <span
                  onClick={() => showModal("area")}
                  className="cursor-pointer col l-3 s-12 search-item"
                >
                  <SearchItem
                    IconBefore={<RiCrop2Line />}
                    IconAfter={<BsChevronRight color="rgb(156, 163, 175)" />}
                    //   text={queries.area}
                    text={`${inputValueDt?.[0]} m2 - ${inputValueDt?.[1]} m2`}
                    defaultText={"Chọn diện tích"}
                  />
                  </span>
                  <span className="col l-3 s-12 search-item">
                  {/* <Link to={"/ket-qua-tim-kiem"} > */}
                  <Button
                    // type="primary"
                    htmlType="submit"
                    className="w-full py-4 px-2 outline-none bg-[#d05031] text-[13.3px] flex items-center justify-center text-white font-medium"
                  >
                    <FiSearch />
                    Tìm kiếm
                  </Button>
                  {/* </Link> */}
    
                  </span>
              </div>
            {/* <Input placeholder="Nhập từ khóa" className="flex-1 m-1" /> */} 
          </div >
        </Form.Item>
      </Form>

      <Modal
        title={modalType === "location" ? "Chọn khu vực" : modalType === "price" ? "Chọn giá" : modalType === "area" ? "Chọn diện tích" : ""}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: "#225acd" } }}
      >
        {renderModalContent()}
      </Modal>
    </>

  );
};

export default memo(Search);

