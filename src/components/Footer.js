import React from 'react'
import { QRCode } from 'antd'
import google_play from '../../src/assets/google_play.png'
const Footer = () => {
    return (
        <div className='flex flex-row justify-between mt-10 w-[1280px]'>
            <div>
                <div className='font-bold'>TÌM PHÒNG TRỌ GIÁ TỐT TRÊN ROOMIFY</div>
                <QRCode value="https://example.com" />
                <img src={google_play} className='w-32 h-fit' />
            </div>
            <div>
                <div className='font-bold'>VỀ ROOMIFY</div>
                <div>Về chúng tôi</div>
                <div>Chính sách bảo mật</div>
                <div>Điều khoản sử dụng</div>
            </div>
            <div>
                <div className='font-bold'>LIỀN KẾT</div>
                <div>
                    <img src='https://www.hcmus.edu.vn/attachments/article/4049/logo%20KHTN_REMAKE%20(1).png'
                        className='w-32 h-fit'
                    />
                </div>
            </div>
        </div>
    )
}

export default Footer
