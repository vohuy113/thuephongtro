import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import app from "../../firebase";
import { Button, Space } from "antd";
const auth = getAuth(app);
console.log(".....++", auth.currentUser?.email);
export const User = () => {
  return (
    <Space wrap>
      <Button type="dashed">{auth.currentUser?.displayName}</Button>;
    </Space>
  );
};
