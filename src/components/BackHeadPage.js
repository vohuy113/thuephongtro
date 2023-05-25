import React, { useEffect, useState } from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai'
import Button from './Button'

const BackHeadPage = () => {
    const [backToTopButton, setBackToTopButton] = useState(false)
    useEffect(() => {
        window.addEventListener('scroll', () => {

            if (window.scrollY > 200) {
                setBackToTopButton(true)
                console.log(window.scrollY)
            } else {
                setBackToTopButton(false);
            }

        })
    }, [])
    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        // setBackToTopButton(false)
    }
    return (
        <div>
            {backToTopButton && (

                <div onClick={scrollUp} className='fixed bottom-1/2 right-10 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-sky-600 hover:shadow-lg duration-300'>
                    <AiOutlineArrowUp />
                </div>

            )
            }
        </div>
    )
}

export default BackHeadPage