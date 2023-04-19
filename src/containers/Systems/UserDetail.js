import React, { useContext, useEffect, useState } from 'react'
import { Form, Input, Button, Select, Upload } from 'antd'
import { AuthContext } from '../../api/AuthApi';
import { storage, db } from "../../firebase";
import { onValue } from 'firebase/database'
import { UploadOutlined } from '@ant-design/icons'
import writeUserData from '../../api/addUserToFirebase';
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";

const UserDetail = () => {
    const { currentUser } = useContext(AuthContext);

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        console.log(values.avatar.file.originFileObj);
        const upload = async () => {
            const imageRef = ref(storage, `AvatarUser/user${currentUser.uid}/${values.avatar?.file.name + v4()}`);
            await uploadBytes(imageRef, values.avatar.file.originFileObj);
            const url = await getDownloadURL(imageRef);
            return url;
        }

        upload().then((res) => {
            // console.log(res),
            writeUserData(currentUser.uid, values.name, "", res, values.dob, values.address, values.phone)
        })
    };
    // const starCountRef = ref(db, `Users/${currentUser.uid}`);
    // onValue(starCountRef, (snapshot) => {
    //     const data = snapshot.val();
    //     console.log(data)
    //     // updateStarCount(postElement, data);
    // });
    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: '#1890ff' }}>Hồ sơ cá nhân</h2>
            </div>
            <Form
                // disabled
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Họ và tên"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Ngày tháng năm sinh"
                    name="dob"
                    rules={[{ required: true, message: 'Please input your date of birth!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giới tính"
                    name="gender"
                    rules={[{ required: true, message: 'Please input your gender!' }]}
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
                    rules={[{ required: true, message: 'Please upload your avatar!' }]}
                >
                    <Upload maxCount={1}>
                        <Button type="dashed" icon={<UploadOutlined />} style={{ width: '100%' }}>
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


                <Form.Item>
                    <Button type="primary" ghost htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default UserDetail

