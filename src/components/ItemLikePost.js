import React from 'react'
import { Button } from 'antd'

const ItemLikePost = (props) => {
    const { image, title, acreage, price } = props.likePost;
    return (
        <div className='hover:drop-shadow-xl mt-4' style={{ borderRadius: '16px', height: '160px', width: '100%', display: 'flex', flexDirection: 'row', padding: '10px', backgroundColor: '#F5F5F5' }}>
            {/* <img className='rounded-xl h-full w-40 object-cover mr-4' src={'https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2022/07/03/f6480ee4-11fc-453b-882b-25f03a2bd77e_1656803279.jpg'} alt="item image" /> */}
            <div className='flex flex-col w-full'>
                <h2 style={{ color: '#333333' }}>Phòng đẹp giá tốt:{title}</h2>
                <p style={{ color: '#666666' }}>25m2: {acreage}</p>
                <p style={{ color: '#666666' }}>2: {price}</p>
            </div>
            <Button style={{ marginTop: '90px', marginRight: '12px', backgroundColor: '#1890FF', color: '#FFFFFF' }}>Chat</Button>
        </div>
    )
}

export default ItemLikePost

