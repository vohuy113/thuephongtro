import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { UserOutlined } from '@ant-design/icons';
import app, { database } from "../../firebase";
import { Button, Space, Avatar } from "antd";
import { ref, child, get, set } from "firebase/database";
const auth = getAuth(app);
console.log(".....++", auth.currentUser?.email);
export const User = () => {
  const [avatar, setAvatar] = useState('')
  useEffect(() => {
    const getAvatar = async () => {
      // console.log(database)
      const dbRef = ref(database);
      await get(child(dbRef, `Users/${auth.currentUser.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val().avatar);
          setAvatar(snapshot.val().avatar)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

    }
    getAvatar();
  }, [])
  return (
    <Space wrap>
      <Avatar src={avatar} size="large" icon={<UserOutlined />} />
      <Button type="dashed">{auth.currentUser?.displayName}</Button>
    </Space>
  )
};
