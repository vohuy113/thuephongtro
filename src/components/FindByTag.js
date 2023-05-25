import React from 'react'
import { Card, Space } from 'antd';
const FindByTag = () => {
    return (
        <Space style={{
            width: '100%',
        }} direction="vertical" size={16}>
            <Card
                title="Lọc theo giá"
                // extra={<a href="#">More</a>}
                style={{
                    width: '100%',
                }}

            >
                <p>Dưới 1 triệu</p>
                <p>1-3 triệu</p>
                <p>3-5 triệu</p>
                <p>5-7 triệu</p>
                <p>7-10 triệu</p>
                <p>10-15 triệu</p>
                <p>Trên 15 triệu</p>
            </Card>
            <Card
                size="small"
                title="Lọc theo diện tích"
                // extra={<a href="#">More</a>}
                style={{
                    width: '100%',
                }}
            >
                <p>Dưới 20 m²</p>
                <p>20-30 m²</p>
                <p>30-50 m²</p>
                <p>50-70 m²</p>
                <p>70-90 m²</p>
                <p>Trên 90 m²</p>
            </Card>
        </Space>
    )
}

export default FindByTag