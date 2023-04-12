import React, { useEffect, useState, useTransition, useContext } from "react";
import Address from "../../../components/Address";
import Overview from "../../../components/Overview";
import { storage, db } from "../../../firebase";
import InputReadOnly from "../../../components/InputReadOnly";
import SelectAddress from "../../../components/SelectAddress";
import InputFormV2 from "../../../components/InputFormV2";
import { AuthContext } from "../../../api/AuthApi";
import { Form, InputNumber, Input, Button, Space } from "antd";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  upload,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import icons from "../../../ultils/icons";
const { TextArea } = Input;
const { BsCameraFill, ImBin } = icons;

const CreatePost = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  // const [payload, setPayload] = useState({
  //   title: "",
  //   description: "",
  //   acreage: "",
  //   address: "",
  //   image: "",
  //   price: "",
  //   phone: "",
  //   status: "",
  //   rating: "",
  // });

  const writeDocument = async (payload) => {
    await addDoc(collection(db, "roomify"), {
      ...payload,
    });
    alert("success");
  };
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [list, setList] = useState([]);

  const previewImage = () => {
    if (imageUpload == null) return;
  };
  console.log(imageUpload)
  const uploadImage = async (payload) => {
    if (imageUpload == null) return;
    const folder = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    const uploadPromises = list.map(async (item) => {
      const imageRef = ref(storage, `images/user${folder}/${item.name + v4()}`);
      await uploadBytes(imageRef, item);
      const url = await getDownloadURL(imageRef);
      return url;
    });
    const res = await Promise.all(uploadPromises);
    console.log(res);
    let req = {
      title: payload.title,
      description: payload.description,
      acreage: payload.acreage,
      address: payload.address,
      image: res,
      price: payload.price,
      phone: payload.email,
      id: `${Math.floor(Math.random() * (100 - 1 + 1) + 1)}`,
      status: "",
      rating: "",
    };
    writeDocument(req);
    setImageList([]);
    setIsSubmit(false);
  };

  useEffect(() => {
    const objectUrl = imageUpload && URL.createObjectURL(imageUpload);
    setImageList((prev) => (imageUpload ? [...prev, objectUrl] : [...prev]));
    setList((prev) => (imageUpload ? [...prev, imageUpload] : [...prev]));
    console.log(objectUrl);
  }, [imageUpload]);
  const handleSubmit = () => { };
  const { currentUser } = useContext(AuthContext);

  const onFinish = (values) => {
    console.log('Success:', values);
    uploadImage(values);
    setIsSubmit(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const [form] = Form.useForm();

  // console.log(currentUser.email)
  return (
    <div className="w-full">
      <Form
        form={form}
        layout="vertical"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxwidth: 1100 }}

        initialValues={{
          title: "",
          description: "",
          acreage: "",
          image: [],
          price: "",
          phone: '',
          status: "",
          rating: "",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="px-6"
      >
        <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
          Đăng tin mới
        </h1>
        <div className="py-4 flex flex-col">
          <Address form={form} />
          <div>
            {" "}
            <h2 className="font-semibold text-xl py-4">Thông tin mô tả</h2>
            <div className="w-full flex flex-col gap-4">
              <Form.Item label="Tiêu đề" name="title">
                <Input

                />
              </Form.Item>


              <div className="flex flex-col gap-2">
                <Form.Item label="Nội dung mô tả" name="description">
                  <TextArea
                    // id="desc"
                    className="w-full rounded-md outline-none border border-gray-300 p-2"
                    rows={10}
                  />
                </Form.Item>


              </div>
              <div className="flex flex-col gap-4">
                <Form.Item label="Thông tin liên hệ" name="address">
                  <Input
                    disabled
                  />
                </Form.Item>
                <Form.Item label="Điện thoại" name="email">
                  <Input
                    // name="email"
                    disabled
                  // value={currentUser.email}
                  />
                </Form.Item>

                <div className="">
                  <Form.Item label="Giá cho thuê" name="price">
                    <InputNumber
                      // id="price"
                      className="w-full rounded-md outline-none border border-gray-300 p-2"
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      placeholder="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
                    />
                  </Form.Item>

                </div>
                <Form.Item label="Diện tích" name="acreage">
                  <Input
                  />
                </Form.Item>

              </div>
            </div>
          </div>
          <div className="w-full mb-6">
            <h2 className="font-semibold text-xl py-4">Hình ảnh</h2>
            <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            <div className="w-full">
              <label
                className="w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md"
                htmlFor="file"
              >
                <div className="flex flex-col items-center justify-center">
                  Thêm ảnh
                </div>
              </label>
              <input
                onChange={(e) => {
                  setImageUpload(e.target.files[0]);
                  previewImage();
                }}
                hidden
                type="file"
                id="file"
                multiple
              />
              <div className="w-full">
                <h3 className="font-medium py-4">Ảnh đã chọn</h3>
                <div className="flex gap-4 items-center">
                  {imageList?.map((item) => {
                    return (
                      <div key={item} className="relative w-1/3 h-1/3 ">
                        <img
                          style={{ width: "100px" }}
                          src={item}
                          alt="preview"
                          className="w-full h-full object-cover rounded-md"
                        />
                        <span
                          title="Xóa"
                          // onClick={() => handleDeleteImage(item)}
                          className="absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full"
                        >
                          <ImBin />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <Form.Item>
            <Button
              type="primary" ghost
              htmlType="submit"
              loading={isSubmit}
              disabled={isSubmit}
            >Tạo Mới</Button>

          </Form.Item>

          {/* <div className="h-[500px]"></div> */}
        </div>
        {/* <div className="w-[30%] flex-none">maps</div> */}

      </Form>
    </div>

  );
};

export default CreatePost;
