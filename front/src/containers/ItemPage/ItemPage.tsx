import React, { FC, useEffect, useState } from 'react'
import { Typography, Layout, Divider, Button, Drawer, Collapse, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct } from 'API/product';

import Images from './components/Images';
import Information from './components/Information';


import type { CollapseProps } from 'antd';
import { IItemPage } from './IItemPage';
import { useTranslation } from 'react-i18next';


const { Content } = Layout;
const { Title, Text } = Typography;


const contentStyle: React.CSSProperties = {
    padding: "0 10px 30px 10px",
    minHeight: 'calc(100vh - 60px)',
    position: 'relative'
};

const bottomButtonStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 45,
    left: 10,
    right: 10
};

export const ItemPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<IItemPage | undefined>();
    const { t } = useTranslation();

    const items: CollapseProps['items'] | [] = product && [
        {
            key: '1',
            label: <Title level={4}>{t('itemPage.description')}</Title>,
            children: product.description
        }
    ]

    useEffect(() => {
        getProduct({ id, brandId: process.env.REACT_APP_BRAND_ID })
            .then((data) => setProduct(data))
    }, [])

    // const onClickVideo = () => swiper.slideTo()
    const onClickPay = () => navigate(`/paymentItem/${id}`)

    return (
        <Content style={contentStyle}>
            {product && <Space direction='vertical' style={{ marginBottom: 40, width: '100%' }}>
                <Images images={product.images} reviewVideo={product.reviewVideo} />
                <Divider orientation="left" >
                    <Title level={5}>{product.name}</Title>
                </Divider>
                <Information product={product} />
                <Collapse items={items} defaultActiveKey={['1']} />
                <div style={bottomButtonStyle}>
                    <Button type='primary' onClick={onClickPay} style={{ zIndex: 1000, width: '100%' }}>Купить</Button>
                </div>
            </Space>}
        </Content >
    )
}
