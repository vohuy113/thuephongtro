import React, { useEffect, useState } from 'react'
import { List } from 'antd';
import Item from '../../components/Item/Item';
import Search from './Search';
import MySlider from '../../components/MySlider';
import { Outlet } from 'react-router';
import RecentPosts from '../../components/RecentPosts';
import { getListPost } from '../../api/PostApi';
const SearchResult = () => {

    const [listPost, setListPost] = useState([]);
    const handleLike = () => {

    }
    return (
        <div className="w-[1108px] items-center justify-between">
            <div className="w-full flex flex-col items-center justify-start">
                <Outlet />
            </div>
            < Search />
            <div className="w-full p-2">
                <MySlider></MySlider>
            </div>
            <div className="w-full flex flex-row justify-around">
                <div className="w-3/4">
                    <span> Kết quả tìm kiếm</span>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 4,
                        }}
                        dataSource={listPost}
                        renderItem={item => (
                            <Item key={item.postId} post={item} handleLike={handleLike} />
                        )}
                        footer={<div>Antd List footer part</div>}
                    />
                </div>
                <div className="w-1/4 m-5 rounded-md overflow-hidden">
                    <div className="bg-slate-100 h-10 mb-1  w-full ">
                        <h2 className="text-center text-slate-800 font-bold text-lg">Tin mới đăng</h2>
                    </div>

                    <RecentPosts />
                </div>
            </div>

        </div>
    )
}

export default SearchResult