import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemPost } from "../../../api/PostApi";
import Map from "../../../components/Map";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import "./style.css";
import { getDocId } from "../../../api/addUserToFirebase";
import { Card, Carousel, Breadcrumb } from 'antd';
const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
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
  // getDocId()
  console.log(item?.image?.length ?? 0);
  //  het han api
  useEffect(() => {
    const getCoords = async () => {
      const results = await geocodeByAddress(item?.address);
      const latlng = await getLatLng(results[0]);
      // console.log(latlng);
      setCoord(latlng);
    };
    item && getCoords();
  }, [item]);
  return (
    <div className="w-[1108px]">
      <div className="py-2">
        <Breadcrumb
          items={[
            {
              title: 'Home',
            },
            {
              title: <a href="">Application Center</a>,
            },
            {
              title: <a href="">Application List</a>,
            },
            {
              title: 'An Application',
            },
          ]}
        />
      </div>
      {item && (
        <div className="flex flex-row w-full justify-between">
          <div className="mt-2 w-2/3">
            <Card className="flex flex-col px-1 bg-white h-[600px] rounded">
              <div className="">
                <Carousel className="h-[412px]" effect="fade">
                  {item?.image?.map((it, id) => (
                    <div key={id}>
                      <img
                        className="w-full p-1 rounded-2xl h-[412px]"
                        src={it}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div>
                <div className="p-1 text-lg font-semibold">{item.title}</div>
                <div className="p-1">
                  <div className="text-red-700 font-medium">{item.price}</div>
                  <div className="text-gray-500 font-medium">{item.acreage}</div>
                </div>
                <div className="p-1 text-gray-500 font-medium">{item.address}</div>
              </div>

            </Card>

            <Card className="bg-white my-2 rounded-md">
              <div className="font-extrabold py-1">Thông tin mô tả</div>
              <div className="px-1">{item.description}</div>
            </Card>
            <div className="w-full h-[560px] bg-slate-200 p-2 rounded-md">
              <Map className="h-full object-cover" coord={coord} />
            </div>
          </div>
          <div className="flex flex-col">
            <Card className="w-[316px] h-[120px] bg-white m-2 rounded-md">
              <div className="flex flex-row">
                <img className="w-10 h-10" src="https://phongtro123.com/images/default-user.png" />
                <div className="flex flex-col mx-3 text-slate-700	">
                  <div className="text-lg font-bold" >Tên</div>
                  <div>Trạng thái</div>
                  <div>Hoạt động bao nhiêu phút trước</div>
                </div>
              </div>
            </Card>
            <Card className="w-[316px] h-[220px] bg-white mx-2 rounded-md">
              <div className="text-xl font-bold mx-3 text-slate-700	">
                Liên hệ với người bán
              </div>

            </Card>
          </div>

        </div>
      )}
    </div>
  );
};
export default DetailPost;


