import { Avatar, Button, Divider, Form, Input, List, Skeleton } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { database } from '../../firebase';
import { onValue, ref, get, child } from 'firebase/database';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AiOutlineUser } from 'react-icons/ai';
import { AuthContext } from '../../api/AuthApi';
import { listPostContext } from '../../api/PostApi';
import GPT from '../../components/GPT';
const ChatManager = () => {
  // const { currentUser } = useContext(AuthContext);
  // const { list } = useContext(listPostContext);
  // console.log(list);
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);
  // const loadMoreData = () => {

  //   const dbRef = ref(database);
  //   get(child(dbRef, 'Users')).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //       // setListPosted(Object.keys(snapshot.val()));
  //     } else {
  //       console.log("No data available");
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   })
  //   const messagesRef = ref(database, `messages`);
  //   onValue(messagesRef, (snapshot) => {
  //     //const data = snapshot.val();
  //     //console.log(data)
  //     const messageList = snapshot.val();
  //     if (messageList) {
  //       console.log(messageList)
  //       const messages = Object.values(messageList);
  //       setData(messages)
  //       console.log(messages)
  //       // messages.map((message) => {
  //       //   if (message[0]?.sendId == currentUser.uid) {
  //       //     console.log(message)
  //       //     setData(...data, ...message)
  //       //   }
  //       // })
  //     } else {
  //     }
  //   });
  // };
  // console.log(data)
  // // console.log(dataFilter);
  // const [dataRender, setDataRender] = useState([]);
  // useEffect(() => {
  //   const dataFilter = data.filter((item) => item[Object.keys(item)[0]].senderId == currentUser.uid)
  //   const data2Keys = dataFilter.reduce(
  //     (keys, item) => keys.concat(item),
  //     []
  //   );
  //   console.log(Object.keys(dataFilter))
  //   const listFilter = list.filter((item) =>
  //     data2Keys.some((key) => key === item.postId))
  //   console.log(listFilter)
  //   setDataRender(dataFilter);
  // }, [data])
  // useEffect(() => {
  //   loadMoreData();
  //   const dataFilter = data.filter((item) => item[Object.keys(item)[0]].senderId == currentUser.uid)
  //   setDataRender(dataFilter);
  // }, []);
  // console.log(dataRender)

  return (
    <div >
      <GPT />
    </div>

  )
}

export default ChatManager