import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Select, Upload } from "antd";
import { AuthContext } from "../../api/AuthApi";
import { storage, db, database } from "../../firebase";
import { onValue, ref as nref, get, child, getDatabase } from "firebase/database";
import { UploadOutlined } from "@ant-design/icons";
import writeUserData from "../../api/addUserToFirebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const UserDetail = () => {
  const { currentUser } = useContext(AuthContext);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    console.log(values.avatar.file.originFileObj);
    const upload = async () => {
      const imageRef = ref(
        storage,
        `AvatarUser/user${currentUser.uid}/${values.avatar?.file.name + v4()}`
      );
      await uploadBytes(imageRef, values.avatar.file.originFileObj);
      const url = await getDownloadURL(imageRef);
      return url;
    };

    upload().then((res) => {
      // console.log(res),
      writeUserData(
        currentUser.uid,
        values.name,
        "",
        res,
        values.dob,
        values.address,
        values.phone,
        values.gender,
      );
    }).then(() => {
      // setIsEditing(true)
      alert('upload success')
    });
  };
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // db = nref(database);
    const dbRef = nref(getDatabase());
    // const starCountRef = nref(database, `Users/${currentUser.uid}`);
    //console.log(starCountRef);
    get(child(dbRef, `Users/${currentUser.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          setUserData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const [form] = Form.useForm();
  console.log(userData)
  useEffect(() => {
    console.log(userData?.address)
    form.setFieldsValue({
      address: userData?.address,
      name: userData?.fullname,
      phone: userData?.phone,
      dob: userData?.birthday,
      gender: userData?.gender
    });
  }, [userData])
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="w-1/2">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#1890ff" }}>Hồ sơ cá nhân</h2>
      </div>
      <Form
        // disabled
        form={form}
        name="basic"
        // initialValues={userData}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input disabled={!isEditing} />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input disabled={!isEditing} />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input disabled={!isEditing} />
        </Form.Item>

        <Form.Item
          label="Ngày tháng năm sinh"
          name="dob"
          rules={[
            { required: true, message: "Please input your date of birth!" },
          ]}
        >
          <Input disabled={!isEditing} />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: "Please input your gender!" }]}
        >
          <Select>
            <Select.Option value="male">Nam</Select.Option>
            <Select.Option value="female">Nữ</Select.Option>
            <Select.Option value="other">Khác</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Avatar"
          name="avatar"
          rules={[{ required: true, message: "Please upload your avatar!" }]}
        >
          <Upload maxCount={1}>
            <Button
              type="dashed"
              icon={<UploadOutlined />}
              style={{ width: "100%" }}
            >
              Click to upload
            </Button>
          </Upload>
          {/* <div>
                        {values.avatar?.file.name && (
                            <>
                                <img src={URL.createObjectURL(values.avatar?.file)} alt="avatar preview" />
                                <p>{values.avatar?.file.name}</p>
                            </>
                        )}
                    </div> */}
        </Form.Item>
        {!isEditing && ( // Hiển thị nút "Cập nhật" khi không ở chế độ chỉnh sửa
          <Form.Item>
            <Button onClick={() => setIsEditing(true)} className="relative">
              {/* <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span> */}
              <span className="absolute top-0 right-0 inline-flex rounded-full h-3 w-3 bg-sky-500 animate-ping"></span>
              Cập nhật
            </Button>
          </Form.Item>
        )}
        {isEditing && ( // Hiển thị nút "Submit" khi ở chế độ chỉnh sửa
          <Form.Item>
            <Button type="primary" ghost htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        )}

        {/* <Form.Item>
                    <Button type="primary" ghost htmlType="submit">
                        Submit
                    </Button>
                </Form.Item> */}
      </Form>
    </div>
  );
};

export default UserDetail;
