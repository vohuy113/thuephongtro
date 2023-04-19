import React from "react";
import { Input, Button } from "antd";
import SearchItem from "../../../components/SearchItem/SearchItem";
import icons from "../../../ultils/icons";
import "./style.css";
const {
  BsChevronRight,
  HiOutlineLocationMarker,
  TbReportMoney,
  RiCrop2Line,
  MdOutlineHouseSiding,
  FiSearch,
} = icons;
const Search = () => {
  //const handleShowModal = () => {};
  return (
    <div className="search-container">
      <span
        //onClick={() => handleShowModal(provinces, "province", "Toàn quốc")}
        className="cursor-pointer flex-1"
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
        //onClick={() => handleShowModal(prices, "price", "Chọn giá")}
        className="cursor-pointer flex-1"
      >
        <SearchItem
          IconBefore={<TbReportMoney />}
          IconAfter={<BsChevronRight color="rgb(156, 163, 175)" />}
          //text={queries.price}
          text={"Giá cả"}
          defaultText={"Chọn giá"}
        />
      </span>
      <span
        //onClick={() => handleShowModal(areas, "area", "Chọn diện tích")}
        className="cursor-pointer flex-1"
      >
        <SearchItem
          IconBefore={<RiCrop2Line />}
          IconAfter={<BsChevronRight color="rgb(156, 163, 175)" />}
          //   text={queries.area}
          text={"Diện tích"}
          defaultText={"Chọn diện tích"}
        />
      </span>
      <Input placeholder="Nhập từ khóa" className="flex-1" />
      <Button
        type="primary"
        //onClick={handleSearch}
        className="outline-none py-2 px-4 flex-1 bg-secondary1 text-[13.3px] flex items-center justify-center gap-2 text-white font-medium"
      >
        <FiSearch />
        Tìm kiếm
      </Button>
    </div>
  );
};

export default Search;

