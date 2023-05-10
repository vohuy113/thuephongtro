import { Avatar, Divider, List, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import { getListPost } from '../api/PostApi';
const RecentPosts
    = () => {
        const [loading, setLoading] = useState(false);
        const [data, setData] = useState([]);
        const loadMoreData = () => {
            if (loading) {
                return;
            }
            setLoading(true);
            // fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            //     .then((res) => res.json())
            //     .then((body) => {
            //         setData([...data, ...body.results]);
            //         setLoading(false);
            //     })
            //     .catch(() => {
            //         setLoading(false);
            //     });
            getListPost().then((res) => setData(res))
        };
        console.log(data)
        useEffect(() => {
            loadMoreData();
        }, []);
        return (
            <div
                id="scrollableDiv"
                style={{
                    height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
            >
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < 50}
                    loader={
                        <Skeleton
                            avatar
                            paragraph={{
                                rows: 1,
                            }}
                            active
                        />
                    }
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key={item.postId}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.image[0]} />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description={item.price}
                                />
                                <div></div>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        );
    };
export default RecentPosts
    ;