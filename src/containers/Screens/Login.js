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
  updateProfile,
} from "firebase/auth";
import app from "../../firebase";
import { login } from "../../api/AuthApi";

const Login = () => {
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  //const [isLogin, setIsogin] = useState("");
  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);

  // authentication firebase

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const auth = getAuth(app);

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        updateProfile(user, { displayName: userName })
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

  // quản lý User
  const showUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
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
    login(auth, email, password)
      .then(handleSignInSuccess)
      .catch(handleSignInError);
  };

  const handleSignInSuccess = (userCredential) => {
    const user = userCredential.user;
    console.log("signIn success", user);
    showUser();
  };

  const handleSignInError = (error) => {
    console.log(error);
  };

  return (
    <div className="bg-[#fff] w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm">
      <h3 className="font-semibold text-2xl mb-3 text-[#019594]">
        {isRegister ? "Đăng ký" : "Đăng nhập"}
      </h3>
      <div className="w-full flex flex-col gap-5">
        {isRegister && <InputForm label={"Họ Tên"} onChange={(e) => setUserName(e.target.value)} />}

        <InputForm label={"Email"} onChange={(e) => setEmail(e.target.value)} />
        <InputForm
          label={"Mật khẩu"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={isRegister ? signUp : signIn}
          text={isRegister ? "Đăng ký" : "Đăng nhập"}
          bgColor={"bg-[#019594]"}
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
