// import { async } from "@firebase/util";
import { doc } from "firebase/firestore";
import { useContext, createContext, useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import readDb from "../read_db_firebase";
import { database } from "../firebase";

export const listPostContext = createContext();

export const getListPost = async () => {
  let mockPost1 = [];
  await readDb().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      mockPost1.push(doc.data());
    });
  });
  // console.log(mockPost1);
  return mockPost1;
};
export const ListPostedProvider = ({ children }) => {
  const [list, setList] = useState(null);
  useEffect(() => {
    const fetchList = async () => {
      const postList = await getListPost(); // Lấy danh sách bài viết từ getListPost
      setList(postList); // Gán danh sách bài viết cho state
    };
    fetchList();
  }, [])
  return (
    <listPostContext.Provider value={{ list }}>
      {children}
    </listPostContext.Provider>
  )
}
export const getTenRecentPosts = () => {

}
export const getItemPost = async (postId) => {
  let itemPost;
  await readDb().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().postId === postId) {
        itemPost = doc.data();
      }
    });
  });
  // console.log(itemPost)
  return itemPost;
};
export const getItemId = async (postIDLike) => {
  let itemLike;
  await readDb().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().postID === postIDLike) {
        // console.log(doc.id)
        itemLike = doc.data().postIDLike;
        // console.log(itemPost);
      }
    });
  });
  // console.log(itemPost)
  return itemLike;
}
export const getListPostLike = (uid) => {
  let data;
  const starCountRef = ref(database, `Users/${uid}/listLike`);
  console.log(starCountRef)
  onValue(starCountRef, (snapshot) => {
    data = snapshot.val();
    // updateStarCount(postElement, data);
    console.log(data);
  });
  return data
}
//console.log(mockPost);
// export const getListPost = () => {
//   return new Promise((resolve, reject) => {
//     resolve(mockPost1);
//   });
// };
