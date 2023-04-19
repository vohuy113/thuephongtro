import React, { useContext, useState, useEffect } from 'react';
import { getListPostLike } from '../../api/PostApi';
import { AuthContext } from '../../api/AuthApi';
import ItemLikePost from '../../components/ItemLikePost';
import { LikePostContext } from '../../api/likePostContext';
import Item from '../../components/Item/Item';
const LikePostManager = () => {
    const { currentUser } = useContext(AuthContext);
    const [listLikeRender, setListLikeRender] = useState([]);
    // const likedPosts = useContext(LikePostContext);

    // console.log(likedPosts)
    useEffect(() => {
        const fetchListLikeRender = async () => {
            const list = await getListPostLike(currentUser.uid);
            setListLikeRender(list);
        };
        fetchListLikeRender();
    }, [currentUser.uid]);
    const likedPosts = useContext(LikePostContext)
    console.log(likedPosts[0])
    return (
        // <LikePostContext.Consumer>
        //     {likedPosts => (console.log(likedPosts))}
        // </LikePostContext.Consumer>
        <div>
            {likedPosts && likedPosts[0].map((item, index) => (
                <Item key={index} post={item} />
                // console.log(item)
            ))}
        </div>

    );
};

export default LikePostManager;

