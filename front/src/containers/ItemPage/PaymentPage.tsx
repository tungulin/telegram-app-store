import React, { FC, useEffect, useRef, useState } from 'react'
import { Typography, Layout, Card, Avatar, Space, Watermark } from 'antd';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { createPayment } from 'API/payment';
import { getProduct } from 'API/product';

import { IItemPage } from './IItemPage';

import { ReactComponent as YMoneyLogo } from 'img/payment/YMoney.svg';

const { Content } = Layout;
const { Meta } = Card
const { Title } = Typography

const contentStyle: React.CSSProperties = {
    padding: "0 10px 30px 10px",
    minHeight: 'calc(100vh - 60px)'
};

const cardMetaStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center'
}


const dataCards: { avatar: any, title: string, description: string }[] = [
    {
        avatar: <YMoneyLogo style={{ width: 45, height: 45 }} />,
        title: 'ЮMoney',
        description: 'Кошелек или привязанная карта'
    }
]

export const PaymentPage: FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IItemPage | undefined>();
    const [link, setLink] = useState<string>('');

    useEffect(() => {
        getProduct({ id, brandId: process.env.REACT_APP_BRAND_ID })
            .then((data) => {
                setProduct(data)
                // createPayment({ productId: data?.id }).then((data) => setLink(data.confirmation.confirmation_url))
            })
            .catch(err => console.log('err', err))

    }, [])


    return (
        <Content style={contentStyle}>
            {product && <Space direction="vertical" align='center' style={{ display: 'flex', textAlign: 'center', marginBottom: 30 }}>
                <Avatar size={128} icon={<img src={product.images[0]} />} />
                <Title level={2}>{product.name}</Title>
                <Title level={4}>{product.price} ₽</Title>
            </Space>}

            {product && <Space direction="vertical" style={{ display: 'flex' }}>
                {dataCards.map((data, key) => {
                    return <Card bodyStyle={{ padding: 0 }} key={key}>
                        <Watermark zIndex={0} font={{ fontSize: 30, color: 'rgba(0, 0, 0, 0.5)', }} style={{ padding: 20, height: '100%' }} gap={[0, 0]} content='Soon'>
                            <Meta
                                avatar={data.avatar}
                                title={data.title}
                                description={data.description}
                                style={cardMetaStyle}
                            />
                        </Watermark>
                    </Card>

                })}
            </Space>}
        </Content >
    )
}
