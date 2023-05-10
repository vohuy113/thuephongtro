import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import SearchItem from "../../components/SearchItem/SearchItem";
import icons from "../../ultils/icons";
import { Modal, Slider, List, Cascader, Form } from "antd";
import { apiGetAllVietNasm, apiGetPublicDistrict, apiGetPublicProvince } from "../../api/getApiProvince";
import { RightOutlined } from "@ant-design/icons"
import { prettyDOM } from "@testing-library/react";
import { useSearchParams } from "react-router-dom";
import { BsX } from "react-icons/bs";
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
  // const [rangeValue, setRangeValue] = useState(50)
  const [queries, setQueries] = useState({});
  const showModal = (type) => {
    setIsModalOpen(true);
    setModalType(type);
  };
  const [searchParams, setSearchParams] = useSearchParams()
  const handleSearch = () => {
    setSearchParams({ ...searchParams, price: `${inputValue[0]}-${inputValue[1]}` })
    // if (inputValueDt) setSearchParams({ ...searchParams, dt: `${inputValueDt[0]}-${inputValueDt[1]}` })
  }

  const [inputValue, setInputValue] = useState([0, 30])
  const [inputValueDt, setInputValueDt] = useState([0, 90])
  // useEffect(() => {
  //   setSearchParams({ ...searchParams, price: `${inputValue[0]}-${inputValue[1]}`, dt: `${inputValueDt[0]}-${inputValueDt[1]}` })
  // }, [inputValue, inputValueDt])

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(inputValue)
  console.log(inputValueDt)
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
      setProvinces(response?.data);
    };
    fetchPublicProvince();
    console.log('alo')
  }, []);
  //const [options, setOptions] = useState(provinces);
  //console.log(options)
  const renderModalContent = () => {
    switch (modalType) {
      case "location":
        {
          // return (
          //   <List style={{ maxHeight: '400px', overflowY: 'scroll' }}
          //     size="small"
          //     dataSource={[{ province_name: "Tất cả" }, ...provinces]}
          //     renderItem={(item) => (
          //       <List.Item>
          //         <span>{item.province_name}</span>
          //         <RightOutlined />
          //       </List.Item>
          //     )}
          //   />
          // );
          //const options = provinces;
          //console.log(options)
          // const options = [
          //   {
          //     value: 'zhejiang',
          //     label: 'Zhejiang',
          //     children: [
          //       {
          //         value: 'hangzhou',
          //         label: 'Hanzhou',
          //         children: [
          //           {
          //             value: 'xihu',
          //             label: 'West Lake',
          //           },
          //         ],
          //       },
          //     ],
          //   },
          //   {
          //     value: 'jiangsu',
          //     label: 'Jiangsu',
          //     children: [
          //       {
          //         value: 'nanjing',
          //         label: 'Nanjing',
          //         children: [
          //           {
          //             value: 'zhonghuamen',
          //             label: 'Zhong Hua Men',
          //           },
          //         ],
          //       },
          //     ],
          //   },
          // ];
          const onChange = async (value) => {
            console.log(value);
            // const provinceIndex = provinces.findIndex((province) => province.province_id == value);
            // console.log(provinceIndex);
            // let data = await apiGetPublicDistrict(value)
            // // provinces[provinceIndex].item = await data?.data?.results
            // provinces[provinceIndex].item = await data?.data?.results;
            // setProvinces((pre) => {
            //   const newProvinces = [...pre];
            //   newProvinces[provinceIndex] = provinces[provinceIndex];
            //   return newProvinces;
            // });

            //options[provinceIndex].item = data?.data?.results
            //  console.log(options[provinceIndex].item)
            //setOptions((prev) => [...prev, options[provinceIndex].item]);
          };

          return (
            <Cascader fieldNames={{
              label: 'name',
              value: 'codename',
              children: 'districts',

            }} options={provinces} onChange={onChange} changeOnSelect
            />

          )
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
                // IconAfter={<div onClick={() => setInputValue([])}><BsX color="rgb(156, 163, 175)" /></div>}
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
                htmlType="submit"
                className="w-full py-4 px-2 outline-none bg-secondary1 text-[13.3px] flex items-center justify-center text-white font-medium"
              >
                <FiSearch />
                Tìm kiếm
              </Button>
            </span>
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

export default Search;

