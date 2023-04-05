import { async } from "@firebase/util";
import { doc } from "firebase/firestore";
import { useState } from "react";
import readDb from "../read_db_firebase";

const mockPost = [
  {
    title: "cực phẩm ktx",
    rating: "50",
    img: "https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2022/07/03/f6480ee4-11fc-453b-882b-25f03a2bd77e_1656803279.jpg",
    description:
      "Giá trọn gói, không phát sinh bất cứ khoản phí nào nữa.*** Miễn phí :- Để xe máy ( Để xe trong sân cực rộng và thoáng)- Điện, nước.- Wifi, rác,…",
    price: "1.2 triệu/tháng",
    acreage: "30m²",
    address: "quận Thủ Đức",
    status: "hết",
    avt: "https://phongtro123.com/images/default-user.png",
    phone: "0909505051",
  },
  {
    title: "cực phẩm ktx",
    rating: "50",
    img: "https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2022/07/03/f6480ee4-11fc-453b-882b-25f03a2bd77e_1656803279.jpg",
    description:
      "Giá trọn gói, không phát sinh bất cứ khoản phí nào nữa.*** Miễn phí :- Để xe máy ( Để xe trong sân cực rộng và thoáng)- Điện, nước.- Wifi, rác,…",
    price: "1.2 triệu/tháng",
    acreage: "30m²",
    address: "quận Thủ Đức",
    status: "còn",
    avt: "https://phongtro123.com/images/default-user.png",
    phone: "0909505051",
  },
  {
    title: "cực phẩm ktx",
    rating: "50",
    img: "https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2022/07/03/f6480ee4-11fc-453b-882b-25f03a2bd77e_1656803279.jpg",
    description:
      "Giá trọn gói, không phát sinh bất cứ khoản phí nào nữa.*** Miễn phí :- Để xe máy ( Để xe trong sân cực rộng và thoáng)- Điện, nước.- Wifi, rác,…",
    price: "1.2 triệu/tháng",
    acreage: "30m²",
    address: "quận Thủ Đức",
    status: "hết",
    avt: "https://phongtro123.com/images/default-user.png",
    phone: "0909505051",
  },
];
export const getListPost = async () => {
  let mockPost1 = [];
  await readDb().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      mockPost1.push(doc.data());
    });
  });
  console.log(mockPost1);
  return mockPost1;
};
export const getItemPost = async (postID) => {
  let itemPost;
  await readDb().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().id === postID) {
        itemPost = doc.data();
        // console.log(itemPost);
      }
    });
  });
  return itemPost;
};
//console.log(mockPost);
// export const getListPost = () => {
//   return new Promise((resolve, reject) => {
//     resolve(mockPost1);
//   });
// };
