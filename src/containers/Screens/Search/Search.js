import React from "react";
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
          text={"Ho Chi Minh"}
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
          text={"3000000"}
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
          text={"30m2"}
          defaultText={"Chọn diện tích"}
        />
      </span>
      <button
        type="button"
        //onClick={handleSearch}
        className="outline-none py-2 px-4 flex-1 bg-secondary1 text-[13.3px] flex items-center justify-center gap-2 text-white font-medium"
      >
        <FiSearch />
        Tìm kiếm
      </button>
    </div>
  );
};

export default Search;
