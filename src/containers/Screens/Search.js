import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import SearchItem from "../../components/SearchItem/SearchItem";
import icons from "../../ultils/icons";
import { Modal, Slider, List } from "antd";
import { apiGetPublicProvince } from "../../api/getApiProvince";
import { RightOutlined } from "@ant-design/icons"
const {
  BsChevronRight,
  HiOutlineLocationMarker,
  TbReportMoney,
  RiCrop2Line,
  MdOutlineHouseSiding,
  FiSearch,
} = icons;
const Search = () => {
  // const [content, setContent] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [rangeValue, setRangeValue] = useState(50)
  const showModal = (type) => {
    setIsModalOpen(true);
    setModalType(type);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [inputValue, setInputValue] = useState([0, 100])
  const [inputValueDt, setInputValueDt] = useState([0, 100])
  const onChange = (value) => {
    console.log('onChange: ', value);
    setInputValue(value)
  };
  const onChangeDt = (value) => {
    console.log('onChange: ', value);
    setInputValueDt(value)
  };
  console.log(inputValue)
  console.log(inputValueDt)
  const onAfterChange = (value) => {
    console.log('onAfterChange: ', value);
  };
  const onAfterChangeDt = (value) => {
    console.log('onAfterChange: ', value);
  };
  const [provinces, setProvinces] = useState([])
  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvince();
      setProvinces(response?.data.results);
      console.log(1)
    };
    fetchPublicProvince();
  }, []);
  console.log(provinces)
  const renderModalContent = () => {
    switch (modalType) {
      case "location":
        {
          return (
            <List style={{ maxHeight: '400px', overflowY: 'scroll' }}
              size="small"
              dataSource={[{ province_name: "Tất cả" }, ...provinces]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.province_name}</span>
                  <RightOutlined />
                </List.Item>
              )}
            />
          );
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
              // range
              step={0.5}
              defaultValue={[0, 30]}
              onChange={onChange}
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
              defaultValue={[0, 100]}
              onChange={onChangeDt}
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
      < div className="grid grid-flow-col auto-cols-auto bg-sky-400 p-1 w-full my-2 rounded-lg" >
        <span
          onClick={() => showModal("location")}
          className="cursor-pointer m-1"
        >
          <SearchItem
            IconBefore={<HiOutlineLocationMarker />}
            IconAfter={<BsChevronRight color="rgb(156, 163, 175)" />}
            text={"Địa chỉ"}
            defaultText={"Toàn quốc"}
          // style={{ index: 1 }}
          />
        </span>
        <span
          onClick={() => showModal("price")}
          className="cursor-pointer m-1"
        >
          <SearchItem
            IconBefore={<TbReportMoney />}
            IconAfter={<BsChevronRight color="rgb(156, 163, 175)" />}
            text={`${inputValue?.[0]} tr - ${inputValue?.[1]} tr`}
            defaultText={"Chọn giá"}
          />
        </span>
        <span
          onClick={() => showModal("area")}
          className="cursor-pointer m-1"
        >
          <SearchItem
            IconBefore={<RiCrop2Line />}
            IconAfter={<BsChevronRight color="rgb(156, 163, 175)" />}
            //   text={queries.area}
            text={`${inputValueDt?.[0]} m2 - ${inputValueDt?.[1]} m2`}
            defaultText={"Chọn diện tích"}
          />
        </span>
        {/* <Input placeholder="Nhập từ khóa" className="flex-1 m-1" /> */}
        <span className="m-1">
          <Button
            // type="primary"
            //onClick={handleSearch}
            className="w-full py-4 px-2 outline-none bg-secondary1 text-[13.3px] flex items-center justify-center text-white font-medium"
          >
            <FiSearch />
            Tìm kiếm
          </Button>
        </span>

      </div >
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

export default Search;

