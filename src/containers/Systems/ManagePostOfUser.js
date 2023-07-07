import React, { useState, useEffect, useContext } from 'react'
import { getListPost } from '../../api/PostApi';
import { AuthContext } from '../../api/AuthApi';
import { Table, Button, Popconfirm, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { ref, set, update } from 'firebase/database';
import { database } from '../../firebase';
// import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from "dayjs";


const ManagePostOfUser = () => {
    const { currentUser } = useContext(AuthContext);
    const handleDelete = () => {

    }
    const [listPost, setListPost] = useState([]);
    useEffect(() => {
        const listPostedRef = ref(database, `Users/${currentUser.uid}/listPosted`)
        getListPost().then((res) => {
            res.forEach((item) => {
                if (item.userID == currentUser.uid) {
                    update(listPostedRef, {
                        [item.postId]: 'true'
                    })
                    setListPost((prev) => [...prev, item])
                }
            })
        });

        //   listP
    }, []);
    const columns = [
        {
            title: 'Mã tin',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Ảnh đại diện',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <Image src={image[0]} width={70} height={70} />
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Ngày đăng',
            dataIndex: 'postingTime',
            key: 'postingTime',
            render: (postingTime) => dayjs(postingTime?.toDate()).fromNow(),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button type="primary" ghost shape="round" icon={<EditOutlined />} size="small" style={{ marginRight: '5px' }}>
                        Update
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa bài đăng này?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Đồng ý"
                        cancelText="Hủy"
                    >
                        <Button type="primary" danger shape="round" icon={<DeleteOutlined />} size="small">
                            Delete
                        </Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];
    console.log(listPost)
    return (
        <div>
            <h1>
                Danh sách bài đăng của bạn
            </h1 >
            <Table columns={columns} dataSource={listPost} />
        </div>
    )
}

{/* 
            {listPost && listPost.map((it, id) => (<div>{it.address}</div>))
            } */}


export default ManagePostOfUser