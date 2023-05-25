
import React, { useEffect, useState, useRef } from 'react'
import { Carousel, Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { getListPost } from '../api/PostApi';
const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',

    background: '#364d79',
};
const FooterSlider = () => {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };
    const carouselRef = useRef(null);

    const handleGoToSlideNext = () => {
        // Chuyển đến slide có chỉ số là 2
        carouselRef.current.next();
    };
    const handleGoToSlidePrev = () => {
        // Chuyển đến slide có chỉ số là 2
        carouselRef.current.prev();
    };
    const [similarPosts, setSimilarPosts] = useState([])
    useEffect(() => {
        const getSimilarPosts = async () => {
            const response = await getListPost();
            console.log(response)
            setSimilarPosts(response);
        }
        getSimilarPosts();
    }, [])
    console.log(similarPosts)
    return (
        <div className='w-[1100px] h-[240px] shadow-lg bg-white relative'>
            <Button className='absolute left-[-18px] z-10 top-24 rounded-full w-10 h-10 bg-white shadow-md flex justify-center items-center'
                onClick={handleGoToSlidePrev}><LeftOutlined className='leading-10' /></Button>

            <Carousel ref={carouselRef} infinite afterChange={onChange} className='min-w-0 h-full' slidesToShow={5} arrows>
                {similarPosts &&
                    similarPosts.map((item, index) => (
                        <div key={index} className='h-[240px] p-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:shadow-lg duration-300'>
                            <div className='w-full h-40 rounded-lg p-2 flex justify-center items-center'>
                                <img className='w-full h-full object-cover' src={item.image[0]} />
                            </div>
                            <h1 className='font-bold text-xs text-gray-400' >{item.title}</h1>
                            <h2 className='text-red-600 font-bold' >{item.price}</h2>
                        </div>
                    )
                    )
                }
            </Carousel>
            <Button className='absolute right-[-18px] z-10 top-24 rounded-full w-10 h-10 bg-white shadow-md flex justify-center items-center'
                onClick={handleGoToSlideNext}><RightOutlined /></Button>
        </div>
    );
}

export default FooterSlider


