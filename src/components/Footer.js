import React from 'react'
import { QRCode } from 'antd'
import google_play from '../../src/assets/google_play.png'
const Footer = () => {
    return (
        <div className='flex flex-row justify-between'>
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
                    <div>icon1</div>
                    <div>icon2</div>
                    <div>icon3</div>
                </div>
            </div>
        </div>
    )
}

export default Footer
