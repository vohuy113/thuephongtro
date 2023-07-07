import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getItemPost } from "../../../api/PostApi";
import Map from "../../../components/Map";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { MessageOutlined, PhoneOutlined } from "@ant-design/icons"
import "./style.css";
import { getDocId } from "../../../api/addUserToFirebase";
import { Card, Carousel, Breadcrumb, Button } from 'antd';
import app, { database } from "../../../firebase";
import { get, ref, child } from "firebase/database"
import { async } from "@firebase/util";
import FooterSlider from "../../../components/FooterSlider";
import Chat from "../../../components/Chat";
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
  const navigate = useNavigate();

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
  const [userPost, setUserPost] = useState('')
  useEffect(() => {
    const getUserPosted = async () => {
      const dbRef = ref(database);
      await console.log(item)
      await get(child(dbRef, `Users/${item.userID}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setUserPost(snapshot.val())
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    getUserPosted();
  }, [item])
  console.log(userPost)
  const navigateChat = () => {
    navigate(`/he-thong/tin-nhan/${item.postId}`, { replace: true })
  }
  const [showChat, setShowChat] = useState(false);
  const handleClick = () => {
    setShowChat(true);
  }
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
            <Card className="w-[316px] h-[180px] bg-white m-2 rounded-md">
              <div className="font-bold text-xl mb-3 text-slate-700">Người đăng</div>
              <div className="flex flex-row">
                <img className="w-10 h-10 rounded-md" src={userPost.avatar} />
                <div className="flex flex-col mx-3 text-slate-700	">
                  <div className="text-lg font-bold" >{userPost.fullName || userPost.fullname}</div>
                  <div>Trạng thái</div>
                  <div>Hoạt động bao nhiêu phút trước</div>
                </div>
              </div>
            </Card>
            <Card className="w-[316px] h-[200px] bg-white mx-2 rounded-md">
              <div className="text-xl font-bold mx-3 text-slate-700	">
                Liên hệ chủ trọ
              </div>
              <div className="mt-3 flex flex-col justify-center gap-y-3.5">
                <Button icon={<MessageOutlined />} onClick={handleClick}> Chat với người bán </Button>
                <Button icon={<PhoneOutlined />} onClick={navigateChat}>0977636945</Button>
              </div>
            </Card>
            {showChat && <Chat />}
          </div>
        </div>
      )}
      <FooterSlider />
    </div>
  );
};
export default DetailPost;


