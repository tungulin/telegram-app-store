import React, { FC, useEffect, useState } from 'react'
import { Typography, Layout, Card, theme } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { getProduct } from 'API/product';

import { IItemPage } from './IItemPage';

const { Content } = Layout
const { Meta } = Card
const { Title } = Typography
const { useToken } = theme

const contentStyle: React.CSSProperties = {
    padding: "0 10px 30px 10px",
    minHeight: 'calc(100vh - 60px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

export const ProcessingPaymentPage: FC = () => {
    const { token } = useToken();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IItemPage | undefined>();

    useEffect(() => {
        getProduct({ id, brandId: process.env.REACT_APP_BRAND_ID })
            .then((data) => setProduct(data))
    }, [])

    return (
        <Content style={contentStyle}>
            {product && <Title level={3}>Ожидание покупки: {product.name}</Title>}
        </Content >
    )
}
