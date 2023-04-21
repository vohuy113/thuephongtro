import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemPost } from "../../../api/PostApi";
import Map from "../../../components/Map";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import "./style.css";
import { getDocId } from "../../../api/addUserToFirebase";
const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};
const DetailPost = () => {
  const { postId } = useParams();

  const [coord, setCoord] = useState(null);

  const [item, setItem] = useState(() => {
    return getItemPost(postId).then();
  });
  //console.log(item);
  // useEffect(() => {
  //   id && getItemPost(id).then(setItem);
  // // }, [id]);
  useEffect(() => {
    postId && getItemPost(postId).then(setItem);
  }, [postId]);
  //console.log(getItemPost(postId).then())
  console.log(item)
  // getDocId()
  //  het han api
  // useEffect(() => {
  //   const getCoords = async () => {
  //     const results = await geocodeByAddress(item?.address);
  //     const latlng = await getLatLng(results[0]);
  //     // console.log(latlng);
  //     setCoord(latlng);
  //   };
  //   item && getCoords();
  // }, [id, item]);
  return (
    <div>
      {item && (
        <div className="flex flex-row">
          <div className="w-[600px] mt-2">
            <div className="flex flex-col px-1 bg-slate-200 h-[600px] rounded ">
              <div className="h-[440px]">
                <img
                  className="w-full p-1 object-cover rounded-2xl h-full"
                  src={item.image}
                ></img>
              </div>

              <div className="p-1 text-lg font-semibold">{item.title}</div>
              <div className="p-1">
                <div className="text-red-700 font-medium">{item.price}</div>
                <div className="text-gray-500 font-medium">{item.acreage}</div>
              </div>
              <div className="p-1 text-gray-500 font-medium">{item.address}</div>
            </div>

            <div className="bg-slate-200 my-2 rounded-md">
              <div className="font-extrabold py-1">Thông tin mô tả</div>
              <div className="px-1">{item.description}</div>
            </div>
            {/* <div className="w-full h-[560px] bg-slate-200 p-2 rounded-md">
            <Map className="h-full object-cover" coord={coord} />
          </div> */}
          </div>
          <div className="flex flex-col">
            <div className="w-[316px] h-[120px] bg-slate-200 m-2 rounded-md">
              <div className="flex flex-row">
                <img className="w-10 h-10" src="https://phongtro123.com/images/default-user.png" />
                <div className="flex flex-col mx-3 text-slate-700	">
                  <div className="text-lg font-bold" >Tên</div>
                  <div>Trạng thái</div>
                  <div>Hoạt động bao nhiêu phút trước</div>
                </div>
              </div>
            </div>
            <div className="w-[316px] h-[220px] bg-slate-200 mx-2 rounded-md">
              <div className="text-xl font-bold mx-3 text-slate-700	">
                Liên hệ với người bán
              </div>

            </div>
          </div>

        </div>
      )}
    </div>
  );
};
export default DetailPost;
