import React, { useState, useEffect } from "react";
import { InputForm, Button } from "../../components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import app from "../../firebase";
//import { getAuth } from "firebase/auth";

const Login = () => {
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [isLogin, setIsogin] = useState("");
  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);

  // authentication firebase

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        alert("success");
        // về trang đăng nhập
        setIsRegister(false);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        alert("fail");
        // ..
      });
  };

  // set persist User
  // const UserPersist = () => {
  //   setPersistence(auth, browserSessionPersistence)
  //     .then(() => {
  //       // Existing and future Auth states are now persisted in the current
  //       // session only. Closing the window would clear any existing state even
  //       // if a user forgets to sign out.
  //       // ...
  //       // New sign-in will be persisted with session persistence.
  //       return signInWithEmailAndPassword(auth, email, password);
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //     });
  // };

  // quản lý User
  const showUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        const email = user.email;
        //setIsogin(uid);

        console.log(email);
        console.log(browserSessionPersistence);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  };

  const signIn = () => {
    console.log("hello");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("signIn success");
        showUser();
        //UserPersist();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="bg-[#fff] w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm">
      <h3 className="font-semibold text-2xl mb-3">
        {isRegister ? "Đăng ký" : "Đăng nhập"}
      </h3>
      <div className="w-full flex flex-col gap-5">
        {isRegister && <InputForm label={"Họ Tên"} />}

        <InputForm label={"Email"} onChange={(e) => setEmail(e.target.value)} />
        <InputForm
          label={"Mật khẩu"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={isRegister ? signUp : signIn}
          //onClick={signUp}
          text={isRegister ? "Đăng ký" : "Đăng nhập"}
          bgColor={"bg-secondary1"}
          textColor={"text-black"}
          fullWidth
        />
      </div>
      <div className="mt-6 flex items-center justify-between">
        {isRegister ? (
          <small>
            Bạn đã có tài khoản{" "}
            <span
              onClick={() => {
                setIsRegister(false);
              }}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {" "}
              Đăng nhập ngay
            </span>
          </small>
        ) : (
          <>
            <small className="text-[blue] hover:text-[red] cursor-pointer">
              Bạn quên mật khẩu
            </small>
            <small
              className="text-[blue] hover:text-[red] cursor-pointer"
              onClick={() => {
                setIsRegister(true);
              }}
            >
              Tạo tài khoản mới
            </small>
          </>
        )}
      </div>
    </div>
  );
};
export default Login;
