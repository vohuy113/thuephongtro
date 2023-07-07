import React from 'react'
import { AiOutlineMessage } from 'react-icons/ai'
import { Link } from 'react-router-dom'
const Message = () => {
    return (
        <Link to={'he-thong/tin-nhan'}>
            <div className='fixed bottom-10 right-10 w-16 h-16 rounded-full bg-[#019594] flex items-center justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-sky-600 hover:shadow-lg duration-300'>
                <AiOutlineMessage className='w-3/4 h-3/4 text-slate-50' />
            </div>
        </Link>

    )
}

export default Message